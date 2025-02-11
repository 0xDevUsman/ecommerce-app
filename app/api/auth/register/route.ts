import { connectDB } from "@/app/lib/mongo";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";
import { registerUser } from "@/app/types/user";
export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();
    const data = registerUser.safeParse(body);
    if (!data.success) {
      return NextResponse.json(
        {
          message: "Invalid inputs",
          errors: data.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }
    const existingUser = await User.findOne({ email: data.data.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.data.password, 12);

    const newUser = new User({
      name: data.data.name,
      email: data.data.email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({
      message: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
