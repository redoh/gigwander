import type { AIProvider } from "./types";

export class MockAIProvider implements AIProvider {
  async generateTripExplanation(params: {
    artistName: string;
    venueName: string;
    city: string;
    country: string;
    concertDate: string;
    homeCity: string;
    transportType: string;
    transportPrice: number;
    accommodationName: string;
    accommodationPrice: number;
    totalCost: number;
    currency: string;
  }): Promise<string> {
    return `Great news — ${params.artistName} is playing at ${params.venueName} in ${params.city}, ${params.country} on ${params.concertDate}. From ${params.homeCity}, the best value option is a ${params.transportType} at ${params.currency}${params.transportPrice}, paired with a stay at ${params.accommodationName} (${params.currency}${params.accommodationPrice}/night). Your estimated total trip cost is ${params.currency}${params.totalCost}. ${params.city} is a fantastic destination — make the most of it by arriving a day early and exploring the local food scene.`;
  }
}
