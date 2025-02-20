import { NextResponse, type NextRequest } from "next/server";
import { connectDB } from "@/app/lib/mongo";
import User from "@/app/models/user";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    // Extract token from cookies using headers
    const cookies = req.headers.get("cookie") || "";
    const token = cookies.split("; ").find((c) => c.startsWith("token="))?.split("=")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { userId: string };

    // Fetch user details from database (excluding password)
    const user = await User.findById(new mongoose.Types.ObjectId(decoded.userId)).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User details retrieved successfully", user }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/user/profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
