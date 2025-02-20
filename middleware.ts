/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const adminRoutes = ["/api/products", "/api/orders/:id"];

  // Only check admin routes for non-GET requests
  if (method !== "GET" && adminRoutes.some(route => pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect("/login");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        name: string;
        email: string;
        isAdmin: boolean;
      };
      if (!decoded.isAdmin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    } catch (error: any) {
      console.error("JWT Error:", error.message);
      return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
    }
  }
  return NextResponse.next();
}
