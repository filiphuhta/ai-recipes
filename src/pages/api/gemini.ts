import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ResponseData = {
  message: string;
};

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const API_KEY = process.env.API_KEY;
  console.log(API_KEY);
  console.log(req.body);

  if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.body;

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
