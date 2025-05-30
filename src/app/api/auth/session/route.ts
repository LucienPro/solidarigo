import { auth } from "@/lib/auth";
import { headers as getHeaders } from "next/headers";

export async function GET() {
  const rawHeaders = await getHeaders();
  const session = await auth.api.getSession({
    headers: rawHeaders as unknown as Headers
,
  });

  return Response.json({ session });
}
