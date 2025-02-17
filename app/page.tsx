import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import hero from "../public/admin ui/hero/hero-1.png";
import Cards from "./components/Cards";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <section>
          <main className="mx-auto w-[90%] mt-6 mb-10 relative bg-gray-100">
            <Image
              src={hero}
              alt="Description of image"
              className="min-w-screen"
            />
            <div className="absolute top-[40%] left-[27%] transform -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-6xl text-black font-bold">
                Unleash Innovation <br /> in Every Byte.
              </h1>
              <h1 className="text-lg mt-2 mb-7">
                Explore a World of Cutting-Edge Tech.
              </h1>
              <button className="bg-black hover:opacity-85 text-white font-bold py-2 px-4 rounded-lg">
                Shop now
              </button>
            </div>
          </main>
          <main>
            <h1 className="text-3xl font-semibold text-center">
              New Collections
            </h1>
            <div className="flex flex-wrap justify-around gap-4 p-4">
              <Cards
                name="Beoplay M5 Bluetooth Speaker"
                price={599}
                image="https://imgs.search.brave.com/ZTCkJnEyP-lrPHibspe9-xTmmL6eTqB3V142SWOTVD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90YXJn/ZXQuc2NlbmU3LmNv/bS9pcy9pbWFnZS9U/YXJnZXQvR1VFU1Rf/YjUxMzE1NTgtMjI4/Yy00N2EyLWI5OWIt/ZGNjNDc5MTM2Yjlj/P3dpZD04MDAmaGVp/PTgwMCZxbHQ9ODAm/Zm10PXBqcGVn"
              />
              <Cards
                name="Apple Smart Watch 6 - Special Edition"
                price={599}
                image="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-2.png"
              />
              <Cards
                name="Beylob 90 Speaker"
                price={599}
                image="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-3.png"
              />
              <Cards
                name="Martino 75 Bluetooth"
                price={599}
                image="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-4.png"
              />
            </div>
          </main>
          <main>
            
          </main>
        </section>
      </div>
    </>
  );
};

export default page;
