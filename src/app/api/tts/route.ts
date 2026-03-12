import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Health check - GET /api/tts
export async function GET() {
  return NextResponse.json({ 
    configured: !!OPENAI_API_KEY,
    keyPrefix: OPENAI_API_KEY ? OPENAI_API_KEY.slice(0, 10) + "..." : null
  });
}

export async function POST(request: NextRequest) {
  if (!OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not set");
    return NextResponse.json({ error: "TTS not configured - missing API key" }, { status: 500 });
  }

  try {
    const { text, voice = "nova" } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Limit text length to prevent abuse (OpenAI max is 4096 chars)
    const truncatedText = text.slice(0, 4096);

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: truncatedText,
        voice: voice, // alloy, echo, fable, onyx, nova, shimmer
        response_format: "mp3",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI TTS error:", response.status, errorText);
      return NextResponse.json({ 
        error: "TTS generation failed", 
        details: errorText,
        status: response.status 
      }, { status: 500 });
    }

    // Return the audio stream
    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
