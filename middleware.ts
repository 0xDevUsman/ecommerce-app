import { NextResponse, type NextRequest } from "next/server";

// List of routes that require authentication
const protectedRoutes = ["/api/user", "/api/orders" , "/cart" , "/profile"];

// List of routes that require admin privileges
// const adminRoutes = ["/api/productss", "/api/orders/manage"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // 1. Check if the route is protected (authentication required)
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      // If not authenticated, redirect to login page for UI routes,
      // or return a 401 for API routes.
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 2. Check for admin routes (authorization required)
  // if (adminRoutes.some((route) => pathname.startsWith(route))) {
  //   const token = req.cookies.get("token")?.value;
  //   if (!token) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }
  //   try {
  //     // Decode the token for admin information
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
  //       name: string;
  //       email: string;
  //       isAdmin: boolean;
  //     };
  //     if (!decoded.isAdmin) {
  //       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  //     }
  //   } catch (error: any) {
  //     console.error("Admin JWT error:", error.message);
  //     return NextResponse.json(
  //       { error: error.message || "Server error" },
  //       { status: 500 }
  //     );
  //   }
  // }

  // 3. Optionally, you can restrict certain HTTP methods on sensitive API routes.
  // For example, only allow GET requests on certain endpoints.
  const safeRoutes = ["/api/products", "/api/categories"];
  if (safeRoutes.some((route) => pathname.startsWith(route)) && method !== "GET") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  // 4. If no checks block the request, continue
  return NextResponse.next();
}
