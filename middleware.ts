import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/api/orders", "/api/cart", "/dashboard"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized: Please log in" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return NextResponse.next();
    } catch {
      return new NextResponse(
        JSON.stringify({ message: "Invalid token, please log in again" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

// Apply middleware to API routes and dashboard
export const config = {
  matcher: ["/api/:path*", "/dashboard"],
};
