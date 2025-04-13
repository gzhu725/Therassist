import { detectText } from "../../lib/textrecognition";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request body:", body);  
    const base64 = body.image;
    if (!base64) {
      throw new Error("No base64 image data provided");
    }
    const text = await detectText(base64);
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}