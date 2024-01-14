import NextAuth from "next-auth";

import { authOptions } from "@/libs/auth";

// Create an authentication handler with security options
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
