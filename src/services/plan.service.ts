import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { plans } from "../db/schema";
import { getConcertById } from "./concert.service";
import { MockTransportProvider } from "../providers/transport/mock.provider";
import { MockAccommodationProvider } from "../providers/accommodation/mock.provider";
import { estimateTripCost } from "../utils/cost";
import { generateExplanation } from "./ai.service";
import type { PlanAlternative } from "../types";

const transportProvider = new MockTransportProvider();
const accommodationProvider = new MockAccommodationProvider();

export async function createPlan(userId: string, concertId: string, homeCity: string, homeCountry?: string) {
  const concertData = await getConcertById(concertId);
  if (!concertData) return null;

  const { concert, artist, venue } = concertData;
  const venueCity = venue.city;

  const transports = transportProvider.search(homeCity, venueCity);
  const accommodations = accommodationProvider.search(venueCity);

  const selectedTransport = transports[0] ?? null;
  const selectedAccommodation = accommodations[0] ?? null;
  const nights = 2;

  const cost = estimateTripCost({
    ticketPriceMin: concert.ticketPriceMin ? Number(concert.ticketPriceMin) : null,
    ticketCurrency: concert.ticketCurrency ?? "EUR",
    transport: selectedTransport,
    accommodation: selectedAccommodation,
    nights,
    targetCurrency: "EUR",
  });

  // Generate AI explanation
  const { text: aiExplanation, model: aiModel } = await generateExplanation({
    artistName: artist.name,
    venueName: venue.name,
    city: venueCity,
    country: venue.country,
    concertDate: concert.date,
    homeCity,
    transportType: selectedTransport?.type ?? "unknown",
    transportPrice: selectedTransport?.price ?? 0,
    accommodationName: selectedAccommodation?.name ?? "unknown",
    accommodationPrice: selectedAccommodation?.pricePerNight ?? 0,
    totalCost: cost.total,
    currency: cost.currency,
  });

  // Generate alternatives
  const alternatives: PlanAlternative[] = [];

  // Budget alternative: cheapest everything (already the default usually)
  if (transports.length > 0 && accommodations.length > 0) {
    const budgetTransport = transports[0];
    const budgetStay = accommodations[0];
    const budgetCost = estimateTripCost({
      ticketPriceMin: concert.ticketPriceMin ? Number(concert.ticketPriceMin) : null,
      ticketCurrency: concert.ticketCurrency ?? "EUR",
      transport: budgetTransport,
      accommodation: budgetStay,
      nights,
      targetCurrency: "EUR",
    });
    alternatives.push({ label: "Budget", transport: budgetTransport, accommodation: budgetStay, cost: budgetCost });
  }

  // Comfort alternative: mid/high-range accommodation + fastest transport
  if (transports.length > 0 && accommodations.length > 1) {
    const fastestTransport = [...transports].sort((a, b) => a.durationMinutes - b.durationMinutes)[0];
    const comfortStay = accommodations[Math.min(accommodations.length - 1, 1)]; // second option (pricier)
    const comfortCost = estimateTripCost({
      ticketPriceMin: concert.ticketPriceMin ? Number(concert.ticketPriceMin) : null,
      ticketCurrency: concert.ticketCurrency ?? "EUR",
      transport: fastestTransport,
      accommodation: comfortStay,
      nights,
      targetCurrency: "EUR",
    });
    alternatives.push({ label: "Comfort", transport: fastestTransport, accommodation: comfortStay, cost: comfortCost });
  }

  // Calculate dates
  const concertDate = new Date(concert.date);
  const checkIn = new Date(concertDate);
  checkIn.setDate(checkIn.getDate() - 1);
  const checkOut = new Date(concertDate);
  checkOut.setDate(checkOut.getDate() + 1);

  const [plan] = await db
    .insert(plans)
    .values({
      userId,
      concertId,
      status: "draft",
      homeCity,
      homeCountry,
      outboundTransport: selectedTransport,
      returnTransport: selectedTransport, // same for MVP
      accommodation: selectedAccommodation,
      ticketCost: String(cost.ticket),
      transportCost: String(cost.transport),
      accommodationCost: String(cost.accommodation),
      estimatedFoodCost: String(cost.estimatedFood),
      totalCost: String(cost.total),
      currency: "EUR",
      aiExplanation,
      aiModel,
      checkIn: checkIn.toISOString().split("T")[0],
      checkOut: checkOut.toISOString().split("T")[0],
      alternatives,
    })
    .returning();

  return plan;
}

export async function getPlanById(planId: string, userId: string) {
  const [plan] = await db
    .select()
    .from(plans)
    .where(and(eq(plans.id, planId), eq(plans.userId, userId)));
  return plan ?? null;
}

export async function getUserPlans(userId: string) {
  return db.select().from(plans).where(eq(plans.userId, userId));
}

export async function updatePlan(planId: string, userId: string, updates: Partial<{ status: string; notes: string }>) {
  const [updated] = await db
    .update(plans)
    .set({ ...updates, updatedAt: new Date() })
    .where(and(eq(plans.id, planId), eq(plans.userId, userId)))
    .returning();
  return updated ?? null;
}

export async function deletePlan(planId: string, userId: string) {
  const [deleted] = await db
    .delete(plans)
    .where(and(eq(plans.id, planId), eq(plans.userId, userId)))
    .returning();
  return deleted ?? null;
}
