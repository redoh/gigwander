import type { AccommodationProvider } from "./types";
import type { AccommodationSnapshot } from "../../types";

const ACCOMMODATIONS: AccommodationSnapshot[] = [
  // Milan
  { name: "Cozy Studio near Navigli", type: "apartment", address: "Via Vigevano 18, Navigli", city: "Milan", distanceFromVenueKm: 1.2, pricePerNight: 65, currency: "EUR", rating: 4.6, reviewCount: 234, amenities: ["wifi", "kitchen", "washing_machine", "air_conditioning"], provider: "airbnb" },
  { name: "Ostello Bello Grande", type: "hostel", address: "Via Roberto Lepetit 33", city: "Milan", distanceFromVenueKm: 3.5, pricePerNight: 28, currency: "EUR", rating: 4.4, reviewCount: 1820, amenities: ["wifi", "bar", "lounge", "breakfast"], provider: "hostelworld" },
  { name: "Design Loft Porta Romana", type: "apartment", address: "Corso di Porta Romana 46", city: "Milan", distanceFromVenueKm: 2.0, pricePerNight: 95, currency: "EUR", rating: 4.8, reviewCount: 156, amenities: ["wifi", "kitchen", "air_conditioning", "balcony"], provider: "airbnb" },

  // Berlin
  { name: "Kreuzberg Artist Flat", type: "apartment", address: "Oranienstrasse 45", city: "Berlin", distanceFromVenueKm: 1.5, pricePerNight: 55, currency: "EUR", rating: 4.7, reviewCount: 312, amenities: ["wifi", "kitchen", "balcony"], provider: "airbnb" },
  { name: "Generator Berlin Mitte", type: "hostel", address: "Oranienburger Str. 65", city: "Berlin", distanceFromVenueKm: 3.8, pricePerNight: 22, currency: "EUR", rating: 4.1, reviewCount: 2450, amenities: ["wifi", "bar", "cafe", "lounge"], provider: "hostelworld" },
  { name: "Boutique Friedrichshain", type: "boutique_hotel", address: "Warschauer Str. 33", city: "Berlin", distanceFromVenueKm: 0.8, pricePerNight: 89, currency: "EUR", rating: 4.5, reviewCount: 678, amenities: ["wifi", "breakfast", "bar", "bike_rental"], provider: "booking" },

  // Barcelona
  { name: "Gothic Quarter Hideaway", type: "apartment", address: "Carrer d'Avinyó 22", city: "Barcelona", distanceFromVenueKm: 2.0, pricePerNight: 70, currency: "EUR", rating: 4.5, reviewCount: 445, amenities: ["wifi", "kitchen", "air_conditioning"], provider: "airbnb" },
  { name: "Sant Jordi Rock Palace", type: "hostel", address: "Carrer de Còrsega 373", city: "Barcelona", distanceFromVenueKm: 3.5, pricePerNight: 24, currency: "EUR", rating: 4.3, reviewCount: 1560, amenities: ["wifi", "rooftop_pool", "bar", "live_music"], provider: "hostelworld" },

  // Paris
  { name: "Marais Charming Studio", type: "room", address: "Rue de Turenne 55", city: "Paris", distanceFromVenueKm: 1.8, pricePerNight: 85, currency: "EUR", rating: 4.6, reviewCount: 289, amenities: ["wifi", "kitchen", "washer"], provider: "airbnb" },
  { name: "Generator Paris", type: "hostel", address: "9-11 Place du Colonel Fabien", city: "Paris", distanceFromVenueKm: 2.5, pricePerNight: 30, currency: "EUR", rating: 4.0, reviewCount: 3100, amenities: ["wifi", "bar", "cafe", "events"], provider: "hostelworld" },

  // Amsterdam
  { name: "Canal View Jordaan", type: "apartment", address: "Prinsengracht 280", city: "Amsterdam", distanceFromVenueKm: 1.0, pricePerNight: 120, currency: "EUR", rating: 4.9, reviewCount: 198, amenities: ["wifi", "kitchen", "canal_view", "bike_included"], provider: "airbnb" },
  { name: "ClinkNOORD Hostel", type: "hostel", address: "Badhuiskade 3", city: "Amsterdam", distanceFromVenueKm: 3.0, pricePerNight: 32, currency: "EUR", rating: 4.2, reviewCount: 2780, amenities: ["wifi", "bar", "library", "events"], provider: "hostelworld" },

  // Istanbul
  { name: "Galata Tower View Flat", type: "apartment", address: "Serdar-i Ekrem Cad., Beyoglu", city: "Istanbul", distanceFromVenueKm: 4.5, pricePerNight: 45, currency: "EUR", rating: 4.7, reviewCount: 567, amenities: ["wifi", "kitchen", "rooftop_view", "air_conditioning"], provider: "airbnb" },
  { name: "Bunk Hostel Taksim", type: "hostel", address: "Istiklal Caddesi, Beyoglu", city: "Istanbul", distanceFromVenueKm: 5.0, pricePerNight: 15, currency: "EUR", rating: 4.3, reviewCount: 1920, amenities: ["wifi", "rooftop_bar", "breakfast"], provider: "hostelworld" },

  // Prague
  { name: "Old Town Bohemian Flat", type: "apartment", address: "Dlouhá 33, Staré Město", city: "Prague", distanceFromVenueKm: 1.0, pricePerNight: 50, currency: "EUR", rating: 4.6, reviewCount: 389, amenities: ["wifi", "kitchen", "historic_building"], provider: "airbnb" },

  // Reykjavik
  { name: "Downtown Reykjavik Loft", type: "apartment", address: "Laugavegur 28", city: "Reykjavik", distanceFromVenueKm: 0.5, pricePerNight: 130, currency: "EUR", rating: 4.8, reviewCount: 145, amenities: ["wifi", "kitchen", "heating"], provider: "airbnb" },

  // Lisbon
  { name: "Alfama Terrace Apartment", type: "apartment", address: "Rua da Regueira 12", city: "Lisbon", distanceFromVenueKm: 1.5, pricePerNight: 55, currency: "EUR", rating: 4.7, reviewCount: 423, amenities: ["wifi", "kitchen", "terrace", "river_view"], provider: "airbnb" },

  // Tokyo
  { name: "Shibuya Compact Studio", type: "apartment", address: "Dogenzaka 2-chome, Shibuya", city: "Tokyo", distanceFromVenueKm: 0.5, pricePerNight: 80, currency: "EUR", rating: 4.5, reviewCount: 567, amenities: ["wifi", "kitchen", "washer"], provider: "airbnb" },
  { name: "Khaosan World Asakusa", type: "hostel", address: "3-15-1 Nishi-Asakusa", city: "Tokyo", distanceFromVenueKm: 6.0, pricePerNight: 25, currency: "EUR", rating: 4.1, reviewCount: 3200, amenities: ["wifi", "lounge", "kitchen", "bicycle_rental"], provider: "hostelworld" },

  // London
  { name: "Shoreditch Loft", type: "apartment", address: "Brick Lane E1", city: "London", distanceFromVenueKm: 5.0, pricePerNight: 90, currency: "GBP", rating: 4.4, reviewCount: 312, amenities: ["wifi", "kitchen", "washer"], provider: "airbnb" },
  { name: "Wombats City Hostel", type: "hostel", address: "7 Dock St, Tower Hill", city: "London", distanceFromVenueKm: 6.0, pricePerNight: 28, currency: "GBP", rating: 4.2, reviewCount: 4500, amenities: ["wifi", "bar", "lounge", "breakfast"], provider: "hostelworld" },
];

export class MockAccommodationProvider implements AccommodationProvider {
  search(city: string): AccommodationSnapshot[] {
    return ACCOMMODATIONS.filter(
      (a) => a.city.toLowerCase() === city.toLowerCase()
    ).sort((a, b) => a.pricePerNight - b.pricePerNight);
  }
}
