
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { exam, subject, faculty, question, image } = await req.json();

    if (!question && !image) {
      return NextResponse.json(
        { error: "Please enter a question or upload an image." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are Masterstroke AI Faculty, an expert JEE and NEET preparation teacher.

Exam: ${exam || "JEE/NEET"}
Subject: ${subject || "Auto-detect"}
Faculty: ${faculty || "Masterstroke AI"}

You cover ALL subjects:

JEE:
Physics, Chemistry, Mathematics.
Chemistry includes Physical, Organic and Inorganic Chemistry.

NEET:
Physics, Chemistry and Biology.
Biology includes Botany and Zoology.
Chemistry includes Physical, Organic and Inorganic Chemistry.

Solve the student's actual question directly.

Rules:
- Give the final answer clearly.
- Then give a step-by-step explanation.
- For numerical questions, show calculations.
- For MCQs, state the correct option and explain it.
- For Physics/Maths, show formulas and derivation when needed.
- For Chemistry, show equations/reactions and concepts when needed.
- For Biology, explain the NCERT-level concept clearly.
- If an image is provided, carefully read and solve the question in it.
- Never give a generic "I can help you" response.
- If the question is unclear, say exactly what is unclear.
- Reply in the student's language: English, Hindi or Hinglish.

Student question:
${question || "Solve the question shown in the image."}
`;

    const contents: any[] = [{ text: prompt }];

    if (image) {
      const match = image.match(
        /^data:(image\/[^;]+);base64,(.+)$/
      );

      if (match) {
        contents.push({
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        });
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        temperature: 0.2,
        maxOutputTokens: 3000,
      },
    });

    return NextResponse.json({
      answer: response.text || "No answer generated.",
    });
  } catch (error) {
    console.error("Masterstroke AI Error:", error);

    return NextResponse.json(
      { error: "AI engine failed. Please try again." },
      { status: 500 }
    );
  }
}
