import type { AccommodationSnapshot } from "../../types";

export interface AccommodationProvider {
  search(city: string): AccommodationSnapshot[];
}
