import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailPayload = {
  email: string;
  firstName: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as EmailPayload;

  const { email, firstName } = body;

  try {
    const response = await resend.emails.send({
      from: "SolidariGo <noreply@resend.dev>",
      to: email,
      subject: "📬 Confirme ton adresse email",
      html: `
        <p>Bonjour ${firstName},</p>
        <p>Merci pour ton inscription sur SolidariGo 💚</p>
        <p>Confirme ton adresse en cliquant sur ce lien :</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/verify-success">Je confirme mon adresse</a></p>
        <p>À très vite !</p>
      `,
    });

    return NextResponse.json({ success: true, data: response });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
