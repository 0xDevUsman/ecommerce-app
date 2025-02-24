import { connectDB } from "@/app/lib/mongo";
import Cart from "@/app/models/cart";
import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    
    const cookies = req.headers.get("cookie") || "";
    const token = cookies
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];
      
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload & { userId: string };
    
    // Find the user's cart and delete all items.
    const cart = await Cart.findOne({
      user: new mongoose.Types.ObjectId(decoded.userId),
    });
    
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }
    
    // Clear all items
    cart.items = [];
    await cart.save();
    
    return NextResponse.json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
