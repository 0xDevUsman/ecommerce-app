import { verifyToken } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongo";
import Products from "@/app/models/products";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const products = await Products.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error: (error as Error).message },
      { status: 500 }
    );
  }
};


export const POST = async (req: NextRequest) => {
    try {
      await connectDB();
  
      // Verify admin authentication
      const token = req.cookies.get("token")?.value;
      const user = verifyToken(token) as { role: string } | null; // Custom function to decode token
      if (!user || user.role !== "admin") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
      }
  
      // Parse request body
      const body = await req.json();
      const { name, price, description, image, stock, category } = body;
  
      // Validate input
      if (!name || !price || !description || !image || !stock || !category) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
      }
  
      // Create new product
      const newProduct = new Products({
        name,
        price,
        description,
        image,
        stock,
        category,
      });
  
      await newProduct.save();
  
      return NextResponse.json({ message: "Product added successfully" }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: "Error adding product", error }, { status: 500 });
    }
  };
  