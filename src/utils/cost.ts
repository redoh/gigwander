import type { TripCostBreakdown, TransportSnapshot, AccommodationSnapshot } from "../types";
import { convertCurrency } from "./currency";

const DEFAULT_DAILY_FOOD = 25; // EUR

export function estimateTripCost(params: {
  ticketPriceMin: number | null;
  ticketCurrency: string;
  transport: TransportSnapshot | null;
  accommodation: AccommodationSnapshot | null;
  nights: number;
  targetCurrency: string;
}): TripCostBreakdown {
  const { ticketPriceMin, ticketCurrency, transport, accommodation, nights, targetCurrency } =
    params;

  const ticket = ticketPriceMin
    ? convertCurrency(ticketPriceMin, ticketCurrency, targetCurrency)
    : 0;

  const transportCost = transport
    ? convertCurrency(transport.price * 2, transport.currency, targetCurrency) // round trip
    : 0;

  const accommodationCost = accommodation
    ? convertCurrency(accommodation.pricePerNight * nights, accommodation.currency, targetCurrency)
    : 0;

  const estimatedFood = convertCurrency(DEFAULT_DAILY_FOOD * (nights + 1), "EUR", targetCurrency);

  const total = ticket + transportCost + accommodationCost + estimatedFood;

  return {
    ticket: Math.round(ticket * 100) / 100,
    transport: Math.round(transportCost * 100) / 100,
    accommodation: Math.round(accommodationCost * 100) / 100,
    estimatedFood: Math.round(estimatedFood * 100) / 100,
    total: Math.round(total * 100) / 100,
    currency: targetCurrency,
  };
}
