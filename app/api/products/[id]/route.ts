import { connectDB } from "@/app/lib/mongo";
import Products from "@/app/models/products";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const product = await Products.findById(params.id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product", error: (error as Error).message },
      { status: 500 }
    );
  }
};
