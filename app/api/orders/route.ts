/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongo";
import Cart from "@/app/models/cart";
import Order from "@/app/models/order";
// If you have a Product model, ensure it's imported somewhere so it's registered
// import Product from "@/app/models/products"
import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// POST: Create an order from the user's cart
export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    // 🔹 Extract token from cookies
    const token = req.headers.get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 🔹 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { userId: string };

    // 🔹 Find the user's cart and populate product details (ensure the ref in Cart model matches your product model name)
    const cart = await Cart.findOne({ user: new mongoose.Types.ObjectId(decoded.userId) }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    // 🔹 Calculate total price from cart items
    const totalPrice = cart.items.reduce((sum: number, item: any) => {
      // Ensure that each item.product contains a price property
      return sum + item.product.price * item.quantity;
    }, 0);

    // 🔹 Create the order document
    const order = new Order({
      user: new mongoose.Types.ObjectId(decoded.userId),
      items: cart.items.map((item: any) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice,
      status: "pending",
    });

    await order.save();

    // 🔹 Clear the user's cart after order placement
    await Cart.findOneAndUpdate(
      { user: new mongoose.Types.ObjectId(decoded.userId) },
      { items: [] }
    );

    return NextResponse.json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error in POST /api/orders:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

// GET: Retrieve all orders for the authenticated user
export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    // 🔹 Extract token from cookies
    const token = req.headers.get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 🔹 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { userId: string };

    // 🔹 Fetch user's orders and populate product details
    const orders = await Order.find({ user: new mongoose.Types.ObjectId(decoded.userId) })
      .populate("items.product")
      .sort({ createdAt: -1 });

    // 🔹 Map the orders to the desired response format
    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      items: order.items.map((item: any) => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    }));

    return NextResponse.json({ message: "Orders retrieved successfully", orders: formattedOrders });
  } catch (error) {
    console.error("Error in GET /api/orders:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
