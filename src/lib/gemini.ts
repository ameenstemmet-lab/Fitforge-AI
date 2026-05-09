/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateWorkout = async (userProfile: any) => {
  const prompt = `Generate a personalized workout plan for the following user:
    ${JSON.stringify(userProfile, null, 2)}
    
    Return a JSON object with:
    - title: string
    - description: string
    - exercises: Array<{ name: string, sets: number, reps: string, rest: string, notes: string }>
    - coachTip: string`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.NUMBER },
                reps: { type: Type.STRING },
                rest: { type: Type.STRING },
                notes: { type: Type.STRING }
              },
              required: ["name", "sets", "reps", "rest"]
            }
          },
          coachTip: { type: Type.STRING }
        },
        required: ["title", "description", "exercises", "coachTip"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const chatWithCoach = async (history: any[], message: string) => {
  const contents = [...history, { role: 'user', parts: [{ text: message }] }];
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents as any,
    config: {
      systemInstruction: "You are an energetic, elite-level AI fitness coach for FitForge AI. You are supportive, intelligent, and highly motivating. Use fitness-focused language and provide science-backed advice. Keep responses concise and focused on the user goals.",
    }
  });

  return response.text;
};

export const analyzeHealthData = async (healthData: any) => {
  const prompt = `Analyze this health data (sleep, HRV, steps, fatigue) and provide a recovery score (0-100) and 3 short actionable coaching insights:
    ${JSON.stringify(healthData, null, 2)}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          insights: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendation: { type: Type.STRING }
        },
        required: ["score", "insights", "recommendation"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
