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
      <div className="flex flex-col items-center justify-center mt-20 mb-[174px]">
        <h1 className="text-5xl font-bold pb-6">Thank you for your order!</h1>
        <h1 className="text-gray-600 foint-bold text-lg">
          Your order has been confirmed. You will recieve an email confiramtion
          shortly. Your Id is jhbvd64v6s46vs.
        </h1>

        <div className="flex justify-center gap-4 w-full mt-4">
          <button className="border border-black text-black px-6 py-3 rounded-lg mt-4 hover:bg-black hover:text-white transition-all duration-200  ">
            View all orders
          </button>
          <Link href="/">
            <button className="bg-black text-white px-6 py-3 rounded-lg mt-4 hover:opacity-85">
              Back to home
            </button>
          </Link>
        </div>
      </div>
      <Support />

      <Footer />
    </>
  );
};

export default Page;
