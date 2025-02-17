import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import hero from "../public/admin ui/hero/hero-1.png";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <section>
          <main className="mx-auto mb-10 relative bg-gray-100">
            <Image
              src={hero}
              alt="Description of image"
              className="min-w-screen"
            />
            <div className="absolute top-[40%] left-[27%] transform -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-6xl text-black font-bold">
                Unleash Innovation <br /> in Every Byte.
              </h1>
              <h1 className="text-lg mt-2 mb-7">Explore a World of Cutting-Edge Tech.</h1>
              <button className="bg-black hover:opacity-85 text-white font-bold py-2 px-4 rounded-lg">
                Shop now
              </button>
            </div>
          </main>
          <main>
            <h1 className="text-3xl font-semibold text-center">New Collections</h1>
          </main>
          
        </section>
      </div>
    </>
  );
};

export default page;
