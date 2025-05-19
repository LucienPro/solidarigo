import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const result = await resend.emails.send({
      from: `SolidariGo <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    return result;
  } catch (error) {
    console.error("Erreur envoi email :", error);
    throw error;
  }
}
