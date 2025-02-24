"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Support from "../components/Support";
import Footer from "../components/Footer";
import Link from "next/link";
import axios from "axios";

const Page = () => {
  useEffect(() => {
    const clearUserCart = async () => {
      try {
        const { data } = await axios.delete(
          "http://localhost:3000/api/cart/clear"
        );
        console.log("Cart cleared:", data.message);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    };

    clearUserCart();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20 mb-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold pb-6 text-center">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 font-bold text-base sm:text-lg text-center max-w-2xl">
          Your order has been confirmed. You will receive an email confirmation
          shortly. Your Id is jhbvd64v6s46vs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full mt-8">
          <button className="border border-black text-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-all duration-200">
            View all orders
          </button>
          <Link href="/">
            <div>
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200">
                Back to home
              </button>
            </div>
          </Link>
        </div>
      </div>
      <Support />
      <Footer />
    </>
  );
};

export default Page;
