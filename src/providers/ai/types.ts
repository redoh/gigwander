export interface AIProvider {
  generateTripExplanation(params: {
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
  }): Promise<string>;
}
