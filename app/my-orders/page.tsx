"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Support from "../components/Support";
import axios from "axios";

// This is the interface definition
interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  createdAt: string;
  items: OrderItem[];
  status: "pending" | "shipped" | "delivered";
  totalPrice: number;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, {
          withCredentials: true,
        });
        console.log("Orders fetched:", data.orders);
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrder();
  }, []);

  useEffect(() => {
    console.log("Updated orders state:", orders);
  }, [orders]);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">
                  Items:{" "}
                  {order.items
                    .map((item) => `${item.name} (x${item.quantity})`)
                    .join(", ")}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "pending"
                      ? "text-yellow-600 bg-yellow-100"
                      : order.status === "shipped"
                      ? "text-blue-600 bg-blue-100"
                      : "text-green-600 bg-green-100"
                  }`}
                >
                  {order.status}
                </p>
                <p className="text-lg font-semibold mt-2">{order.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Support />
      <Footer />
    </>
  );
};

export default MyOrders;
