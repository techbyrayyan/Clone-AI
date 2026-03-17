import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // If no API key or invalid, this will catch and we can return a mock stream
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or their preferred model
      messages: messages,
      stream: true,
    });

    // Convert OpenAI stream to a ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream);

  } catch (error) {
    console.error("OpenAI Error:", error);

    // Return a mock response so the UI still works even if the API fails
    const mockResponse = "I am currently in demo mode because the API key is invalid or not connected. Your UI is working perfectly!";

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(mockResponse));
        controller.close();
      },
    });

    return new Response(stream);
  }
}