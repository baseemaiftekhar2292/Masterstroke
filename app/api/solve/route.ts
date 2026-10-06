import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are Dr. Vikram Varma, an expert Physics AI faculty for JEE/NEET. Answer this question step-by-step concisely: ${question}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({ answer: response.text() });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
  }
}
