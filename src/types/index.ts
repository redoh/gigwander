// API response wrappers
export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// Opportunity types
export interface Opportunity {
  concertId: string;
  artist: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    genres: string[];
  };
  venue: {
    id: string;
    name: string;
    city: string;
    country: string;
    type: string;
  };
  concert: {
    date: string;
    tourName: string | null;
    status: string;
    ticketPriceMin: number | null;
    ticketPriceMax: number | null;
    ticketCurrency: string | null;
  };
  cheapestTransport: TransportSnapshot | null;
  cheapestAccommodation: AccommodationSnapshot | null;
  estimatedTotalCost: number;
  currency: string;
  distanceKm: number;
  score: number;
}

// Provider types (also used as JSONB snapshots in plans)
export interface TransportSnapshot {
  type: "flight" | "train" | "bus" | "ferry";
  provider: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  price: number;
  currency: string;
  stops: number;
  cabinClass: string;
  departureStation: string;
  arrivalStation: string;
  co2EmissionKg?: number;
}

export interface AccommodationSnapshot {
  name: string;
  type: "apartment" | "hotel" | "hostel" | "room" | "house" | "boutique_hotel";
  address: string;
  city: string;
  distanceFromVenueKm: number;
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  provider: string;
}

// Trip cost breakdown
export interface TripCostBreakdown {
  ticket: number;
  transport: number;
  accommodation: number;
  estimatedFood: number;
  total: number;
  currency: string;
}

// Plan alternatives
export interface PlanAlternative {
  label: string;
  transport: TransportSnapshot;
  accommodation: AccommodationSnapshot;
  cost: TripCostBreakdown;
}
