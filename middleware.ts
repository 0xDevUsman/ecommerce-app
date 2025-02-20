import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req: NextRequest) {
  const protectedRoutes = ["/api/cart", "/api/orders"];
  const adminRoutes = ["/api/products", "/api/orders/:id"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }

  if (adminRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
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
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*", "/profile/:profile*"]
};
