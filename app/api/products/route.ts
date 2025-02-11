import { connectDB } from "@/app/lib/mongo";
import Products from "@/app/models/products";
import { NextResponse, type NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
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

  
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { isAdmin: boolean };
    
    if (!decoded.isAdmin) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const { name, price, description } = await req.json();
    const newProduct = new Products({ name, price, description });
    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

