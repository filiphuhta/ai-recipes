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

  if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      // Using `responseMimeType` requires either a Gemini 1.5 Pro or 1.5 Flash model
      model: "gemini-1.5-flash",
      // Set the `responseMimeType` to output JSON
      // Pass the schema object to the `responseSchema` field
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
            properties: {
              recipe_name: {
                type: SchemaType.STRING,
              },
              recipe_content: {
                type: SchemaType.STRING,
              }
          },
        },
      },
    });

    const preCondition = 'I want you to come up with 1 recipe of the users input. If the user does not dont provide you any input here I wish you to come up with 1 random recipe. response content should contains all full recipie with all the steps and html code included in the string. Users input here is provided here for ingridiens that should be included:';
    const prompt = `${preCondition} ${req.body}`;

    // Ensure prompt is not null and is of the expected type
    if (prompt) {
      const result = await model.generateContent(prompt);
      const resultText = await result.response.text();
      console.log(resultText);
      res.status(200).json({ message: resultText });
    } else {
      res.status(400).json({ message: "Invalid prompt" });
    }
  } else {
    res.status(500).json({ message: "API key is missing" });
  }
}
