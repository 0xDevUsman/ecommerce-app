// app/api/clear-cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";
import Cart from "@/app/models/cart";
import { jwtDecode } from "jwt-decode";

interface UserToken {
  userId: string;
  email: string;
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    // Extract token from cookies
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenCookie = cookieHeader.split("; ").find((c) => c.startsWith("token="));
    const token = tokenCookie?.split("=")[1];
    let userId: string | null = null;

    if (token) {
      try {
        const decoded = jwtDecode<UserToken>(token);
        userId = decoded.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
      }
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    // Delete all cart items for the given user.
    const deleteResult = await Cart.deleteMany({ userId });
    console.log("Delete result:", deleteResult);
    console.log(`Cart cleared for user ${userId}`);
    
    return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
