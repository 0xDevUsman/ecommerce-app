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
    // {
    //   id: 2,
    //   image:
    //     "https://imgs.search.brave.com/JjGe5y1NZNn7q3Xy10fvRZtpgu8dGUZ2sP7yovkIe1U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mZG4y/LmdzbWFyZW5hLmNv/bS92di9waWNzL2Fw/cGxlL2FwcGxlLWlw/aG9uZS0xNi0xLmpw/Zw",
    //   name: "Product 2",
    //   price: 15,
    //   quantity: 1,
    // },
    // {
    //   id: 3,
    //   image:
    //     "https://imgs.search.brave.com/uVAf-Tt8S26voKQKh9AI_Yja31yPscnqOvmf6ewwtLE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzA1LzE5LzMy/LzM2MF9GXzUwNTE5/MzI1NF8zSlFUWFJx/cXZEbndtOTRJcWc0/UllISTdybmNpNXJO/Uy5qcGc",
    //   name: "Product 3",
    //   price: 20,
    //   quantity: 3,
    // },
  ];
  return (
    <>
      <Navbar />
      <main className="w-[90%] mx-auto my-10">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="flex justify-between mt-8 border-b-2 pb-2">
          <div>
            <h1 className="text-lg font-bold">Products</h1>
          </div>
          <div className="flex justify-between w-1/3">
            <h1 className="text-lg font-bold">Quantity</h1>
            <h1 className="text-lg font-bold">Subtotal</h1>
          </div>
        </div>
        {checkouts.map((checkout) => {
          return (
            <div
              key={checkout.id}
              className="flex justify-between border-b-2 items-center mt-4"
            >
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={checkout.image}
                  alt={checkout.name}
                  className="w-20 h-20 object-contain"
                  width={80}
                  height={80}
                />
                <div className="ml-4">
                  <h1 className="text-lg font-bold">{checkout.name}</h1>
                  <h1 className="text-lg">${checkout.price}</h1>
                </div>
              </div>
              <div className="flex justify-between px-6 items-center  w-1/3">
                <h1 className="text-lg">x{checkout.quantity}</h1>
                <h1 className="text-lg">
                  ${checkout.price * checkout.quantity}
                </h1>
              </div>
            </div>
          );
        })}
        <div className="flex bg-gray-100 p-6 rounded-lg justify-between mt-4">
          <h1 className="text-xl font-bold">Order Total :</h1>
          <h1 className="text-lg font-bold">
            $
            {checkouts.reduce(
              (acc, curr) => acc + curr.price * curr.quantity,
              0
            )}
          </h1>
        </div>
        <h1 className="text-3xl font-bold mt-10">Payment Details</h1>

        <form>
          <div className="flex flex-col items-center gap-1 mt-4 w-full">
            <div className="flex justify-between gap-1 mt-4 w-full">
              <div className="flex flex-col gap-2 mt-2 w-[50%]">
                <label htmlFor="" className="font-bold">
                  Card Number
                </label>
                <input
                  className="px-6 py-2 border rounded-lg border-gray-300 outline-none text-lg"
                  placeholder="1222 2333 3444 4555"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 mt-2 w-[25%]">
                <label htmlFor="" className="font-bold">
                  Expiration
                </label>
                <input
                  className="px-6 py-2 border rounded-lg border-gray-300 outline-none text-lg"
                  placeholder="MM / YY"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 mt-2 w-[25%]">
                <label htmlFor="" className="font-bold">
                  CVC
                </label>
                <input
                  className="px-6 py-2 border rounded-lg border-gray-300 outline-none text-lg"
                  placeholder="CVC"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2 w-full">
              <label htmlFor="" className="font-bold">
                Country
              </label>
              <select className="p-2 border rounded w-full outline-none">
                <option>India</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4 w-full mt-4">
            <Link href="/cart">
              <button className="border border-black text-black px-6 py-2 rounded-lg mt-4 hover:bg-black hover:text-white transition-all duration-200  ">
                Back to cart
              </button>
            </Link>
            <button className="bg-black text-white px-6 py-2 rounded-lg mt-4 hover:opacity-85">
              Checkout
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Checkout;
