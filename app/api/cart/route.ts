/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongo";
import Cart from "@/app/models/cart";
import Products from "@/app/models/products";
import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
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

    const { productId, quantity } = await req.json();
    if (!productId || quantity < 1) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const product = await Products.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    let cart = await Cart.findOne({
      user: new mongoose.Types.ObjectId(decoded.userId),
    });
    if (!cart) {
      cart = new Cart({
        user: new mongoose.Types.ObjectId(decoded.userId),
        items: [],
      });
    }

    const cartItem = cart.items.find(
      (item: any) => item.product.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({
        product: new mongoose.Types.ObjectId(productId),
        quantity,
      });
    }

    await cart.save();
    return NextResponse.json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
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

    const cart = await Cart.findOne({
      user: new mongoose.Types.ObjectId(decoded.userId),
    }).populate("items.product");
  
    if (!cart) {
      return NextResponse.json({ message: "Cart is empty", items: [] });
    }  

    interface cartItem {
      product: {
        _id: string;
        name: string;
        price: number;
        image : string ;
      };
      quantity: number;
    }
    return NextResponse.json({
      message: "Cart retrieved successfully",
      cart: cart.items.map((item: cartItem) => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image ,
      })),
    });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
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

    const { productId } = await req.json();
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({
      user: new mongoose.Types.ObjectId(decoded.userId),
    });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const productIndex = cart.items.findIndex(
      (item: any) => item.product.toString() === productId
    );
    if (productIndex === -1) {
      return NextResponse.json(
        { message: "Product not found in cart" },
        { status: 404 }
      );
    }

    cart.items.splice(productIndex, 1);
    await cart.save();

    return NextResponse.json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};


