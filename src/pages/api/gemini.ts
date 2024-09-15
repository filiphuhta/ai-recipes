import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const API_KEY = process.env.API_KEY;

  const schema = {
    type: SchemaType.OBJECT,
    properties: {
      recipe_title: { type: SchemaType.STRING },
      recipe_ingredients: {
        type: SchemaType.ARRAY,
        items: { type: SchemaType.STRING },
      },
      recipe_steps: {
        type: SchemaType.ARRAY,
        items: { type: SchemaType.STRING },
      },
      recipe_summary: { type: SchemaType.STRING },
    },
    required: [
      "recipe_title",
      "recipe_ingredients",
      "recipe_steps",
      "recipe_summary",
    ],
  };

  if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const preCondition = `
      I want you to come up with a recipe based on the user's input. If the user doesn't provide any input, 
      generate a random recipe. The response content should include all ingredients, steps, and a summary.  
      User's input for ingredients:`;

    const prompt = `${preCondition} ${req.body}`;

    if (prompt) {
      const result = await model.generateContent(prompt);
      const resultText = await result.response.text();
      res.status(200).json({ message: resultText });
    } else {
      res.status(400).json({ message: "Invalid prompt" });
    }
  } else {
    res.status(500).json({ message: "API key is missing" });
  }
}
