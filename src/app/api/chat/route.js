import OpenAI from "openai";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key",
});

export async function POST(req) {
  try {
    const { messages, conversationId } = await req.json();
    
    // 1. Ensure conversation exists or create one
    let conversation;
    if (conversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
      });
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          title: messages[messages.length - 1].content.substring(0, 50),
        },
      });
    }

    // 2. Save the user's latest message
    const lastUserMessage = messages[messages.length - 1];
    await prisma.message.create({
      data: {
        role: "user",
        content: lastUserMessage.content,
        conversationId: conversation.id,
      },
    });

    // 3. Get AI Response
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        stream: true,
      });

      let fullContent = "";
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of response) {
              const text = chunk.choices[0]?.delta?.content || "";
              fullContent += text;
              controller.enqueue(new TextEncoder().encode(text));
            }
            
            // 4. Save the Assistant's message to DB after stream finishes
            await prisma.message.create({
              data: {
                role: "assistant",
                content: fullContent,
                conversationId: conversation.id,
              },
            });
            
            controller.close();
          } catch (e) {
            console.error("Stream error:", e);
            controller.error(e);
          }
        },
      });

      // Include the conversation ID in the headers so the frontend can track it
      return new Response(stream, {
        headers: {
          "X-Conversation-Id": conversation.id,
        },
      });

    } catch (apiError) {
      console.error("OpenAI Error:", apiError);
      const mockResponse = "I am currently in demo mode because the API key is invalid. But I've saved your message to the database!";
      
      // Save mock response too
      await prisma.message.create({
        data: {
          role: "assistant",
          content: mockResponse,
          conversationId: conversation.id,
        },
      });

      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(mockResponse));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: { "X-Conversation-Id": conversation.id }
      });
    }

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("id");
  const type = searchParams.get("type"); // Fetch based on type (chat or project)

  if (conversationId) {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(messages);
  }

  // Determine filtering based on type
  const where = type === 'project' ? { isProject: true } : { isProject: false };

  const conversations = await prisma.conversation.findMany({
    where,
    include: {
      messages: {
        take: 1, 
      }
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(conversations);
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
        }

        // Instead of deleting, move to Project
        await prisma.conversation.update({
            where: { id },
            data: { isProject: true }
        });

        return NextResponse.json({ success: true, message: "Moved to Projects" });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}