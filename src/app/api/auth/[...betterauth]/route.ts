// import { auth } from "@/lib/auth";

// export const { handler } = auth;

// export { handler as GET, handler as POST };

import { auth } from "@/lib/auth";

export const GET = auth.handler;
export const POST = auth.handler;
