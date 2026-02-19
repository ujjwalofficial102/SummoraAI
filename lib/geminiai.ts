import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateSummaryFromGeminiAI(pdfText: string) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `${SUMMARY_SYSTEM_PROMPT}`,
        temperature: 0.5,
        maxOutputTokens: 1500,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    });

    if (!response?.text) {
      throw new Error("Empty response from Gemini API");
    }

    return response.text;
  } catch (error: any) {
    throw error;
  }
}
