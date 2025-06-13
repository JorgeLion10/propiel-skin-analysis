import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SkinAnalysisData, Language } from '../types';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });
export const aiInstance = ai;

const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

// Function to get the correct analyze skin prompt based on language
const getAnalyzeSkinPrompt = (language: Language, t: (key: string, params?: Record<string, string | number>) => string): string => {
  if (language === 'en') {
    return t('geminiAnalyzeSkinPrompt', { lang: 'English' }); // Assuming your en.json has this key
  }
  // Default to Spanish
  return t('geminiAnalyzeSkinPrompt', { lang: 'Spanish' }); // Assuming your es.json has this key
};

export const analyzeSkin = async (
  imageDataBase64: string, 
  language: Language,
  t: (key: string, params?: Record<string, string | number>) => string // Pass t function
): Promise<SkinAnalysisData> => {
  if (!apiKey) {
    throw new Error(t("error.apiKeyInvalid")); 
  }

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: imageDataBase64.split(',')[1],
    },
  };

  const dynamicPrompt = getAnalyzeSkinPrompt(language, t);

  const textPart = {
    text: dynamicPrompt,
  };

  try {
    const response: GenerateContentResponse = await aiInstance.models.generateContent({
      model: MODEL_NAME,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
      },
    });
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData: SkinAnalysisData = JSON.parse(jsonStr);
    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API for skin analysis:", error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
             throw new Error(t("error.apiKeyInvalid"));
        }
        if (error.message.toLowerCase().includes("json") || error instanceof SyntaxError) { 
            throw new Error(t("error.jsonParse", { message: error.message }));
        }
        throw new Error(t("error.analysisFailed", { message: error.message }));
    }
    throw new Error(t("error.unknown"));
  }
};

export const detectFaceInImage = async (
  imageDataBase64: string,
  t: (key: string, params?: Record<string, string | number>) => string
): Promise<boolean> => {
  if (!apiKey) {
    console.error("API_KEY is not set for face detection.");
    throw new Error(t("error.apiKeyInvalid"));
  }

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg', // Assuming JPEG, adjust if other types are common for upload
      data: imageDataBase64.split(',')[1],
    },
  };

  const textPart = {
    text: t('geminiDetectFacePrompt'), // Use the specific prompt for face detection
  };

  try {
    const response: GenerateContentResponse = await aiInstance.models.generateContent({
      model: MODEL_NAME,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json", // Expecting JSON for face detection result
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedResult = JSON.parse(jsonStr);
    // Ensure the response structure matches what geminiDetectFacePrompt asks for, e.g., { "faceDetected": true/false }
    if (typeof parsedResult.faceDetected === 'boolean') {
      return parsedResult.faceDetected;
    } else {
      console.warn("Face detection response did not have a boolean 'faceDetected' field. Response:", parsedResult);
      // Fallback or throw specific error based on requirements.
      // For now, assume if not explicitly true, then false, or throw error.
      // throw new Error("Invalid response format from face detection AI.");
      return false; // Safest default if response format is unexpected
    }
  } catch (error) {
    console.error("Error calling Gemini API for face detection:", error);
     if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
             throw new Error(t("error.apiKeyInvalid"));
        }
        // Don't use "error.jsonParse" for face detection, as it's a simpler parse.
        // A generic error is fine here, or a new specific one.
        throw new Error(t("error.analysisFailed", { message: `Face detection step failed: ${error.message}` }));
    }
    throw new Error(t("error.unknown"));
  }
};