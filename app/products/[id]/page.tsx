import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import React from "react";
const page = () => {
  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto mt-10 flex gap-10">
        <div className="w-1/2">
          <div className="flex justify-center items-center">
            <Image
              className="rounded-t-lg object-cover bg-black"
              src={
                "https://imgs.search.brave.com/Z5aRJ5abTpH1UVrG0AeIUOATuQQA3xS3gVrL4LnrfGs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXpt/b2RvLmNvbS9hcHAv/dXBsb2Fkcy8yMDI0/LzA5L21iYS1tMi5q/cGc"
              }
              width={1000}
              height={1000}
              alt=""
            />
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-4xl font-bold pb-4">
            15-inch MacBook Air (2TB) - Midnight
          </h1>
          <h1 className="pb-4">
            Laptops | <span className="text-green-500">In Stock</span>
          </h1>
          <h1 className="pb-8 font-bold">$5999.00</h1>
          <h1 className="pb-2 font-bold">Description</h1>
          <p className="pb-10">
            Experience peak performance with the 15-inch MacBook Air featuring
            the revolutionary Apple M2 chip.stunning 15.3-inch Liquid Retina
            display, and versatile MagSafe charging. Elevate productivity with
            Touch ID and more.{" "}
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-lg mt-4 hover:opacity-85 w-full">
            Add to cart
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
