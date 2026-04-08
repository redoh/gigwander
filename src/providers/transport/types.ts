import type { TransportSnapshot } from "../../types";

export interface TransportProvider {
  search(fromCity: string, toCity: string, date?: string): TransportSnapshot[];
}
