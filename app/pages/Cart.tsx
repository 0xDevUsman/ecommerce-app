/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import deleteIcon from "../../public/assets/icons/delete.svg";
import Link from "next/link";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {loadStripe} from "@stripe/stripe-js"
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
    // Get token from cookies.
    // This is a simple cookie parser, assuming your cookie format is "token=..."
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
  const deliveryCharge = 0; // You can make this dynamic if needed
  const grandTotal = subtotal + deliveryCharge;

  useEffect(() => {
    // Function to fetch cart data using Axios
    const fetchCart = async () => {
      try {
        const response = await axios.get<CartData>(
          "http://localhost:3000/api/cart",
          {
            withCredentials: true, // send cookies
          }
        );
        // Ensure response data has cart property
        const data = response.data;
        // console.log(data);
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
      await axios.delete("http://localhost:3000/api/cart", {
        withCredentials: true,
        data: { productId }, // send cookies
      });
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete item");
    }
  };

  const makePayment = async ()=>{
    const stripeKey = process.env.STRIPE_PUBLISHED_KEY;
    if (!stripeKey) {
      console.error("Stripe publishable key is not defined");
      return;
    }
    const stripe = await loadStripe(stripeKey);

    const body = {
      products : cartItems
    }
    const headers  = {
      "Content-Type": "application/json"
    }
    const response = await axios.post('http://localhost:3000/api/payment', body , {headers});
    const session = response.data;
    const result = stripe?.redirectToCheckout({
      sessionId: session.id,
    })
  }

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {!cartItems || cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3">
              {" "}
              {/* Items Section */}
              <table className="table-auto w-full -collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Product</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Subtotal</th>
                    <th className="border px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        <Image
                          src={item.image || ""}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 mr-2"
                        />
                        <span>{item.name}</span>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <input
                            type="text"
                            value={item.quantity}
                            className="w-12 text-center border rounded"
                            readOnly // Or make it editable
                          />
                        </div>
                      </td>
                      <td className="border px-4 py-2 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-center w-20">
                        <div className="flex justify-center">
                          <Image
                            onClick={() => handleDeleteItem(item.productId)}
                            src={deleteIcon}
                            className="cursor-pointer text-center"
                            alt="Delete Icon"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:w-1/3">
              {" "}
              {/* Summary Section */}
              <div className="border p-4">
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
                <button onClick={makePayment} className="bg-black hover:opacity-85 text-white font-bold py-2 px-4 rounded mt-4 w-full">
                  {user ? "Checkout" : "Login to checkout"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-10 left-0 w-full flex items-end justify-center mt-8">
          <div className="mt-8 bg-gray-200 rounded-lg">
            <div className="flex justify-between items-center gap-4 px-10 py-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Continue shopping</h2>
                <p className="text-gray-700">
                  Discover more products that are perfect for gift, for your
                  wardrobe, or a unique addition to your collection.
                </p>
              </div>
              <Link
                href={"/products"}
                className="bg-black hover:opacity-85 text-white flex items-center font-bold h-12 px-4 py-1 rounded-lg"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
