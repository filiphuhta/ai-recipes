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
    // TODO refactor this to be an object with recipe_ingridients, recipe_title, recipe_summary etc.
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            recipe_content: {
              type: SchemaType.STRING,
            },
          },
        },
      },
    });

    const preCondition =
      "I want you to come up with 1 recipe of the users input. If the user does not dont provide you any input here I wish you to come up with 1 random recipe. response content should contains a full recipie with all the steps. It should be in working html code that can be set with dangerouslySetInnerHTML in react. Users input here is provided for ingridiens that should be included:";
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
