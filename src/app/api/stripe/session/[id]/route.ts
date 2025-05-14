import type { NextRequest } from "next/server"; 
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const sessionId = url.pathname.split("/").pop(); 

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID manquant" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer"],
    });

    const customer = session.customer as Stripe.Customer | null;

    return NextResponse.json({
      email: customer?.email ?? session.customer_email,
      customer_name: customer?.name,
      amount_total: session.amount_total,
    });
  } catch (err) {
    console.error("❌ Erreur Stripe session :", err);
    return NextResponse.json({ error: "Erreur session Stripe" }, { status: 500 });
  }
}
