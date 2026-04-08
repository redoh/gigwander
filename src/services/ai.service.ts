import type { AIProvider } from "../providers/ai/types";
import { MockAIProvider } from "../providers/ai/mock.provider";
import { OpenAIProvider } from "../providers/ai/openai.provider";
import { env } from "../env";

let provider: AIProvider;

export function getAIProvider(): AIProvider {
  if (!provider) {
    provider = env.OPENAI_API_KEY
      ? new OpenAIProvider(env.OPENAI_API_KEY)
      : new MockAIProvider();
  }
  return provider;
}

export async function generateExplanation(params: Parameters<AIProvider["generateTripExplanation"]>[0]): Promise<{ text: string; model: string }> {
  const ai = getAIProvider();
  const text = await ai.generateTripExplanation(params);
  const model = env.OPENAI_API_KEY ? "gpt-4o-mini" : "mock";
  return { text, model };
}
