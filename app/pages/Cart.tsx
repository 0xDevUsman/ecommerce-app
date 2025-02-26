/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import deleteIcon from "../../public/assets/icons/delete.svg";
import Link from "next/link";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loadStripe } from "@stripe/stripe-js";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartData {
  message: string;
  cart: CartItem[];
}

interface User {
  userId: string;
  email: string;
  isAdmin: boolean;
}

const CartPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const tokenCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="));
    const token = tokenCookie?.split("=")[1];
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const deliveryCharge = 0;
  const grandTotal = subtotal + deliveryCharge;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get<CartData>(
          "/api/cart",
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        if (data && data.cart) {
          setCartItems(data.cart);
        } else {
          setCartItems([]);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleDeleteItem = async (productId: string) => {
    try {
      await axios.delete("/api/cart", {
        withCredentials: true,
        data: { productId },
      });
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete item");
    }
  };

  interface Product {
    name: string;
    amount: number;
  }

  const makePayment = async ({ amount, name }: Product) => {
    const response = await axios.post("/api/payment", {
      amount: amount,
      name: name,
    });
    console.log(response.data?.message?.url);
    window.location.href = response.data?.message?.url;
  };

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {!cartItems || cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Cart Items Table */}
            <div className="lg:w-2/3 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">Product</th>
                    <th className="border px-4 py-2 text-center">Quantity</th>
                    <th className="border px-4 py-2 text-right">Subtotal</th>
                    <th className="border px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 flex items-center gap-2">
                        <Image
                          src={item.image || ""}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-16 h-16"
                        />
                        <span>{item.name}</span>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <input
                            type="text"
                            value={item.quantity}
                            className="w-12 text-center border rounded"
                            readOnly
                          />
                        </div>
                      </td>
                      <td className="border px-4 py-2 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div
                          className="flex justify-center cursor-pointer"
                          onClick={() => handleDeleteItem(item.productId)}
                        >
                          <Image
                            src={deleteIcon}
                            alt="Delete Icon"
                            width={24}
                            height={24}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="lg:w-1/3">
              <div className="border p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-2">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Charge:</span>
                  <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Grand Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() =>
                    makePayment({
                      amount: Number(grandTotal.toFixed(2)),
                      name: cartItems.map((item) => item.name).join(", "),
                    })
                  }
                  className="bg-black hover:opacity-90 text-white font-bold py-2 px-4 rounded mt-4 w-full transition duration-200"
                >
                  {user ? "Checkout" : "Login to checkout"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Continue Shopping Banner */}
        <div className="fixed bottom-10 left-0 w-full flex justify-center">
          <div className="mt-8 bg-gray-200 rounded-lg w-full max-w-4xl mx-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Continue shopping
                </h2>
                <p className="text-gray-700">
                  Discover more products that are perfect for gift, for your
                  wardrobe, or a unique addition to your collection.
                </p>
              </div>
              <Link href="/products">
                <div className="bg-black hover:opacity-90 text-white flex items-center font-bold h-12 w-52 text-center justify-center px-4 py-1 rounded-lg transition duration-200">
                  Continue shopping
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
