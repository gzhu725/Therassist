import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json(); // parse JSON body
    const { text } = body;

    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "gloriazhu66@gmail.com",  //HARD CODED MY EMAIL
      subject: "This Week's Therapy Update",
      html: `<p>${text}</p>`, 
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
