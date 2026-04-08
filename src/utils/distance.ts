// Haversine formula for distance between two coordinates
export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Known city coordinates for mock distance calculations
const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  london: { lat: 51.5074, lon: -0.1278 },
  milan: { lat: 45.4642, lon: 9.19 },
  berlin: { lat: 52.52, lon: 13.405 },
  barcelona: { lat: 41.3874, lon: 2.1686 },
  paris: { lat: 48.8566, lon: 2.3522 },
  amsterdam: { lat: 52.3676, lon: 4.9041 },
  istanbul: { lat: 41.0082, lon: 28.9784 },
  prague: { lat: 50.0755, lon: 14.4378 },
  reykjavik: { lat: 64.1466, lon: -21.9426 },
  lisbon: { lat: 38.7223, lon: -9.1393 },
  tokyo: { lat: 35.6762, lon: 139.6503 },
};

export function cityDistanceKm(from: string, to: string): number {
  const fromCoords = CITY_COORDS[from.toLowerCase()];
  const toCoords = CITY_COORDS[to.toLowerCase()];
  if (!fromCoords || !toCoords) return 9999;
  return haversineKm(fromCoords.lat, fromCoords.lon, toCoords.lat, toCoords.lon);
}

export function getCityCoords(city: string): { lat: number; lon: number } | null {
  return CITY_COORDS[city.toLowerCase()] ?? null;
}
