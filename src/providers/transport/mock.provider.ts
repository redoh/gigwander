import type { TransportProvider } from "./types";
import type { TransportSnapshot } from "../../types";

const ROUTES: TransportSnapshot[] = [
  // London -> Milan
  { type: "flight", provider: "Ryanair", departureCity: "London", arrivalCity: "Milan", departureTime: "06:30", arrivalTime: "09:45", durationMinutes: 135, price: 45, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Stansted (STN)", arrivalStation: "Milan Bergamo (BGY)", co2EmissionKg: 120 },
  { type: "flight", provider: "easyJet", departureCity: "London", arrivalCity: "Milan", departureTime: "10:15", arrivalTime: "13:20", durationMinutes: 125, price: 68, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Gatwick (LGW)", arrivalStation: "Milan Malpensa (MXP)", co2EmissionKg: 115 },
  { type: "flight", provider: "British Airways", departureCity: "London", arrivalCity: "Milan", departureTime: "14:00", arrivalTime: "17:10", durationMinutes: 130, price: 125, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Heathrow (LHR)", arrivalStation: "Milan Linate (LIN)", co2EmissionKg: 118 },
  { type: "train", provider: "Eurostar + Trenitalia", departureCity: "London", arrivalCity: "Milan", departureTime: "07:01", arrivalTime: "17:30", durationMinutes: 629, price: 89, currency: "EUR", stops: 1, cabinClass: "economy", departureStation: "London St Pancras", arrivalStation: "Milano Centrale", co2EmissionKg: 25 },
  { type: "bus", provider: "FlixBus", departureCity: "London", arrivalCity: "Milan", departureTime: "22:00", arrivalTime: "16:30", durationMinutes: 1110, price: 39, currency: "EUR", stops: 3, cabinClass: "economy", departureStation: "London Victoria Coach", arrivalStation: "Milano Lampugnano", co2EmissionKg: 45 },

  // London -> Berlin
  { type: "flight", provider: "easyJet", departureCity: "London", arrivalCity: "Berlin", departureTime: "07:00", arrivalTime: "09:50", durationMinutes: 110, price: 42, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Gatwick (LGW)", arrivalStation: "Berlin Brandenburg (BER)", co2EmissionKg: 100 },
  { type: "train", provider: "Eurostar + DB", departureCity: "London", arrivalCity: "Berlin", departureTime: "06:30", arrivalTime: "16:00", durationMinutes: 570, price: 110, currency: "EUR", stops: 1, cabinClass: "economy", departureStation: "London St Pancras", arrivalStation: "Berlin Hauptbahnhof", co2EmissionKg: 22 },

  // Milan -> Berlin
  { type: "flight", provider: "Ryanair", departureCity: "Milan", arrivalCity: "Berlin", departureTime: "08:00", arrivalTime: "10:15", durationMinutes: 135, price: 35, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "Milan Bergamo (BGY)", arrivalStation: "Berlin Brandenburg (BER)", co2EmissionKg: 105 },
  { type: "train", provider: "Trenitalia + ÖBB + DB", departureCity: "Milan", arrivalCity: "Berlin", departureTime: "08:30", arrivalTime: "19:45", durationMinutes: 675, price: 69, currency: "EUR", stops: 2, cabinClass: "economy", departureStation: "Milano Centrale", arrivalStation: "Berlin Hauptbahnhof", co2EmissionKg: 20 },

  // Berlin -> Barcelona
  { type: "flight", provider: "Vueling", departureCity: "Berlin", arrivalCity: "Barcelona", departureTime: "09:00", arrivalTime: "12:00", durationMinutes: 180, price: 55, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "Berlin Brandenburg (BER)", arrivalStation: "Barcelona El Prat (BCN)", co2EmissionKg: 145 },

  // Barcelona -> Paris
  { type: "train", provider: "SNCF TGV", departureCity: "Barcelona", arrivalCity: "Paris", departureTime: "09:30", arrivalTime: "16:10", durationMinutes: 400, price: 59, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "Barcelona Sants", arrivalStation: "Paris Gare de Lyon", co2EmissionKg: 15 },
  { type: "flight", provider: "Vueling", departureCity: "Barcelona", arrivalCity: "Paris", departureTime: "11:00", arrivalTime: "13:00", durationMinutes: 120, price: 48, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "Barcelona El Prat (BCN)", arrivalStation: "Paris Orly (ORY)", co2EmissionKg: 110 },

  // London -> Istanbul
  { type: "flight", provider: "Turkish Airlines", departureCity: "London", arrivalCity: "Istanbul", departureTime: "08:00", arrivalTime: "14:00", durationMinutes: 240, price: 120, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Heathrow (LHR)", arrivalStation: "Istanbul Airport (IST)", co2EmissionKg: 180 },
  { type: "flight", provider: "Pegasus Airlines", departureCity: "London", arrivalCity: "Istanbul", departureTime: "15:30", arrivalTime: "22:00", durationMinutes: 270, price: 75, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Stansted (STN)", arrivalStation: "Istanbul Sabiha Gökçen (SAW)", co2EmissionKg: 185 },

  // London -> Amsterdam
  { type: "train", provider: "Eurostar", departureCity: "London", arrivalCity: "Amsterdam", departureTime: "07:16", arrivalTime: "11:37", durationMinutes: 261, price: 49, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London St Pancras", arrivalStation: "Amsterdam Centraal", co2EmissionKg: 8 },
  { type: "flight", provider: "KLM", departureCity: "London", arrivalCity: "Amsterdam", departureTime: "08:00", arrivalTime: "10:20", durationMinutes: 80, price: 65, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Heathrow (LHR)", arrivalStation: "Amsterdam Schiphol (AMS)", co2EmissionKg: 75 },

  // London -> Barcelona
  { type: "flight", provider: "Ryanair", departureCity: "London", arrivalCity: "Barcelona", departureTime: "06:15", arrivalTime: "09:30", durationMinutes: 135, price: 38, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Stansted (STN)", arrivalStation: "Barcelona El Prat (BCN)", co2EmissionKg: 125 },
  { type: "flight", provider: "Vueling", departureCity: "London", arrivalCity: "Barcelona", departureTime: "12:00", arrivalTime: "15:15", durationMinutes: 135, price: 52, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Gatwick (LGW)", arrivalStation: "Barcelona El Prat (BCN)", co2EmissionKg: 125 },

  // London -> Paris
  { type: "train", provider: "Eurostar", departureCity: "London", arrivalCity: "Paris", departureTime: "07:01", arrivalTime: "10:17", durationMinutes: 136, price: 44, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London St Pancras", arrivalStation: "Paris Gare du Nord", co2EmissionKg: 6 },

  // London -> Prague
  { type: "flight", provider: "Ryanair", departureCity: "London", arrivalCity: "Prague", departureTime: "06:45", arrivalTime: "09:40", durationMinutes: 115, price: 35, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Stansted (STN)", arrivalStation: "Prague Václav Havel (PRG)", co2EmissionKg: 95 },

  // London -> Reykjavik
  { type: "flight", provider: "PLAY", departureCity: "London", arrivalCity: "Reykjavik", departureTime: "10:00", arrivalTime: "12:30", durationMinutes: 210, price: 85, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Stansted (STN)", arrivalStation: "Keflavik (KEF)", co2EmissionKg: 160 },

  // London -> Lisbon
  { type: "flight", provider: "TAP Portugal", departureCity: "London", arrivalCity: "Lisbon", departureTime: "08:30", arrivalTime: "11:00", durationMinutes: 150, price: 65, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Heathrow (LHR)", arrivalStation: "Lisbon (LIS)", co2EmissionKg: 130 },

  // London -> Tokyo
  { type: "flight", provider: "Japan Airlines", departureCity: "London", arrivalCity: "Tokyo", departureTime: "11:00", arrivalTime: "07:30", durationMinutes: 690, price: 580, currency: "EUR", stops: 0, cabinClass: "economy", departureStation: "London Heathrow (LHR)", arrivalStation: "Tokyo Haneda (HND)", co2EmissionKg: 620 },
  { type: "flight", provider: "Turkish Airlines", departureCity: "London", arrivalCity: "Tokyo", departureTime: "09:00", arrivalTime: "08:45", durationMinutes: 925, price: 420, currency: "EUR", stops: 1, cabinClass: "economy", departureStation: "London Heathrow (LHR)", arrivalStation: "Tokyo Narita (NRT)", co2EmissionKg: 750 },
];

export class MockTransportProvider implements TransportProvider {
  search(fromCity: string, toCity: string): TransportSnapshot[] {
    const from = fromCity.toLowerCase();
    const to = toCity.toLowerCase();
    return ROUTES.filter(
      (r) =>
        r.departureCity.toLowerCase() === from && r.arrivalCity.toLowerCase() === to
    ).sort((a, b) => a.price - b.price);
  }
}
