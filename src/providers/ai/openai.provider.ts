import OpenAI from "openai";
import type { AIProvider } from "./types";

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

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
    const response = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content:
            "You are GigWander, an AI concert trip advisor. Write a concise, enthusiastic 2-paragraph recommendation explaining why this concert trip is worth taking. Include practical tips about the city. Keep it under 150 words.",
        },
        {
          role: "user",
          content: `Artist: ${params.artistName}\nVenue: ${params.venueName}\nCity: ${params.city}, ${params.country}\nDate: ${params.concertDate}\nTraveling from: ${params.homeCity}\nTransport: ${params.transportType} at ${params.currency}${params.transportPrice}\nStay: ${params.accommodationName} at ${params.currency}${params.accommodationPrice}/night\nTotal estimated cost: ${params.currency}${params.totalCost}`,
        },
      ],
    });

    return response.choices[0]?.message?.content ?? "Unable to generate explanation.";
  }
}
