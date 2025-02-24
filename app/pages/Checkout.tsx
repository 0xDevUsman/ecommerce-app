"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";

const Checkout = () => {
  const checkouts = [
    {
      id: 1,
      image:
        "https://imgs.search.brave.com/Z5aRJ5abTpH1UVrG0AeIUOATuQQA3xS3gVrL4LnrfGs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXpt/b2RvLmNvbS9hcHAv/dXBsb2Fkcy8yMDI0/LzA5L21iYS1tMi5q/cGc",
      name: "Product 1",
      price: 10,
      quantity: 2,
    },
  ];
  return (
    <>
      <Navbar />
      <main className="w-[90%] mx-auto my-10 space-y-10">
        <h1 className="text-3xl font-bold text-center">Checkout</h1>
        <div className="flex flex-col md:flex-row justify-between items-center border-b-2 pb-2">
          <div>
            <h1 className="text-lg font-bold">Products</h1>
          </div>
          <div className="flex justify-between w-full md:w-1/3">
            <h1 className="text-lg font-bold">Quantity</h1>
            <h1 className="text-lg font-bold">Subtotal</h1>
          </div>
        </div>
        {checkouts.map((checkout) => (
          <div
            key={checkout.id}
            className="flex flex-col md:flex-row justify-between items-center border-b-2 py-4 gap-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={checkout.image}
                alt={checkout.name}
                className="w-20 h-20 object-contain"
                width={80}
                height={80}
              />
              <div>
                <h1 className="text-lg font-bold">{checkout.name}</h1>
                <h1 className="text-lg">${checkout.price}</h1>
              </div>
            </div>
            <div className="flex justify-between items-center w-full md:w-1/3">
              <h1 className="text-lg">x{checkout.quantity}</h1>
              <h1 className="text-lg">
                ${checkout.price * checkout.quantity}
              </h1>
            </div>
          </div>
        ))}
        <div className="flex flex-col sm:flex-row bg-gray-100 p-6 rounded-lg justify-between items-center">
          <h1 className="text-xl font-bold">Order Total :</h1>
          <h1 className="text-lg font-bold">
            $
            {checkouts.reduce(
              (acc, curr) => acc + curr.price * curr.quantity,
              0
            )}
          </h1>
        </div>
        <h1 className="text-3xl font-bold">Payment Details</h1>
        <form>
          <div className="flex flex-col gap-4 mt-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="" className="font-bold">
                  Card Number
                </label>
                <input
                  className="px-6 py-2 border rounded-lg border-gray-300 outline-none text-lg w-full"
                  placeholder="1222 2333 3444 4555"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/4">
                <label htmlFor="" className="font-bold">
                  Expiration
                </label>
                <input
                  className="px-6 py-2 border rounded-lg border-gray-300 outline-none text-lg w-full"
                  placeholder="MM / YY"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/4">
                <label htmlFor="" className="font-bold">
                  CVC
                </label>
                <input
                  className="px-6 py-2 border rounded-lg border-gray-300 outline-none text-lg w-full"
                  placeholder="CVC"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="font-bold">
                Country
              </label>
              <select className="p-2 border rounded w-full outline-none text-lg">
                <option>India</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-4 w-full mt-6">
            <Link href="/cart">
              <div className="border border-black text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-200 text-center">
                Back to cart
              </div>
            </Link>
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-200">
              Checkout
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Checkout;
