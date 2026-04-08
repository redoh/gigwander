import type { Opportunity } from "../types";
import { getFollowedArtistIds } from "./following.service";
import { getUpcomingConcertsForArtists } from "./concert.service";
import { MockTransportProvider } from "../providers/transport/mock.provider";
import { MockAccommodationProvider } from "../providers/accommodation/mock.provider";
import { cityDistanceKm } from "../utils/distance";
import { convertCurrency } from "../utils/currency";
import { estimateTripCost } from "../utils/cost";

const transportProvider = new MockTransportProvider();
const accommodationProvider = new MockAccommodationProvider();

export async function getOpportunitiesForUser(
  userId: string,
  homeCity: string,
  sort: "cheapest" | "nearest" | "best" = "best",
  currency = "EUR",
  limit = 20
): Promise<Opportunity[]> {
  const artistIds = await getFollowedArtistIds(userId);
  if (artistIds.length === 0) return [];

  const concertRows = await getUpcomingConcertsForArtists(artistIds);
  return rankOpportunities(concertRows, homeCity, sort, currency, limit);
}

export async function getOpportunitiesForArtist(
  artistId: string,
  homeCity: string,
  sort: "cheapest" | "nearest" | "best" = "best",
  currency = "EUR",
  limit = 10
): Promise<Opportunity[]> {
  const fullRows = await getUpcomingConcertsForArtists([artistId]);
  return rankOpportunities(fullRows, homeCity, sort, currency, limit);
}

function rankOpportunities(
  concertRows: { concert: any; artist: any; venue: any }[],
  homeCity: string,
  sort: "cheapest" | "nearest" | "best",
  currency: string,
  limit: number
): Opportunity[] {
  const opportunities: Opportunity[] = [];

  for (const row of concertRows) {
    const { concert, artist, venue } = row;
    const venueCity = venue.city;

    let transports: ReturnType<typeof transportProvider.search> = [];
    let accommodations: ReturnType<typeof accommodationProvider.search> = [];
    try {
      transports = transportProvider.search(homeCity, venueCity);
    } catch (error) {
      console.error(`Transport search failed for ${homeCity} → ${venueCity}:`, error);
    }
    try {
      accommodations = accommodationProvider.search(venueCity);
    } catch (error) {
      console.error(`Accommodation search failed for ${venueCity}:`, error);
    }

    const cheapestTransport = transports[0] ?? null;
    const cheapestAccommodation = accommodations[0] ?? null;

    const cost = estimateTripCost({
      ticketPriceMin: concert.ticketPriceMin ? Number(concert.ticketPriceMin) : null,
      ticketCurrency: concert.ticketCurrency ?? "EUR",
      transport: cheapestTransport,
      accommodation: cheapestAccommodation,
      nights: 2,
      targetCurrency: currency,
    });

    const distanceKm = cityDistanceKm(homeCity, venueCity);

    // Score: lower is better (for sorting)
    const priceScore = cost.total > 0 ? cost.total : 9999;
    const distanceScore = distanceKm;
    const popularityScore = 100 - (artist.popularity ?? 50);
    const bestScore =
      0.4 * (priceScore / 10) +
      0.3 * (distanceScore / 100) +
      0.2 * popularityScore +
      0.1 * (100 - (cheapestAccommodation?.rating ?? 3) * 20);

    opportunities.push({
      concertId: concert.id,
      artist: {
        id: artist.id,
        name: artist.name,
        slug: artist.slug,
        imageUrl: artist.imageUrl,
        genres: artist.genres ?? [],
      },
      venue: {
        id: venue.id,
        name: venue.name,
        city: venue.city,
        country: venue.country,
        type: venue.type,
      },
      concert: {
        date: concert.date,
        tourName: concert.tourName,
        status: concert.status,
        ticketPriceMin: concert.ticketPriceMin ? Number(concert.ticketPriceMin) : null,
        ticketPriceMax: concert.ticketPriceMax ? Number(concert.ticketPriceMax) : null,
        ticketCurrency: concert.ticketCurrency,
      },
      cheapestTransport,
      cheapestAccommodation,
      estimatedTotalCost: cost.total,
      currency,
      distanceKm,
      score: Math.round(bestScore * 100) / 100,
    });
  }

  // Sort
  switch (sort) {
    case "cheapest":
      opportunities.sort((a, b) => a.estimatedTotalCost - b.estimatedTotalCost);
      break;
    case "nearest":
      opportunities.sort((a, b) => a.distanceKm - b.distanceKm);
      break;
    case "best":
    default:
      opportunities.sort((a, b) => a.score - b.score);
      break;
  }

  return opportunities.slice(0, limit);
}
