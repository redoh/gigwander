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
  const model = ai.model ?? "unknown";
  try {
    const text = await ai.generateTripExplanation(params);
    return { text, model };
  } catch (error) {
    console.error("AI provider failed, falling back to mock:", error);
    const fallback = new MockAIProvider();
    const text = await fallback.generateTripExplanation(params);
    return { text, model: fallback.model ?? "mock" };
  }
}
