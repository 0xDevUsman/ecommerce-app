import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import hero from "../public/admin ui/hero/hero-1.png";
import Cards from "./components/Cards";
import deals from "../public/assets/images/image-4.svg";
import shipping from "../public/assets/icons/shipping.svg";
import dollar from "../public/assets/icons/dollar.svg";
import support from "../public/assets/icons/support.svg";
import payment from "../public/assets/icons/payment.svg";
const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <section>
          <main className="mx-auto w-[90%] mt-6 mb-10 relative bg-white">
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
            <h1 className="text-3xl font-semibold text-center pb-6">
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
                image="https://imgs.search.brave.com/uRuNtJ7PcOz8NgCuAVgC2jaEL4FuCK2gQIDy8_gdIPQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L0R5/U0ttTVM0RVJUWmlw/WGV0Z3hybi0zMjAt/ODAucG5n"
              />
              <Cards
                name="Bluetooth Speaker"
                price={599}
                image="https://imgs.search.brave.com/94_dWRW0Pxs21ZgVAhlorC5mBH9yAK1FoztzS8RTFhc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z3JhdmFzdGFyLmNv/bS9jZG4vc2hvcC9m/aWxlcy8xX2E2MjVh/NGM5LTM4ZDItNDNj/Mi04MzVhLWU1YjQ3/ODIwNzE3Yy53ZWJw/P3Y9MTcxNjQ2OTgz/OSZ3aWR0aD0xNTAw"
              />
              <Cards
                name="Macbook Pro 2021"
                price={599}
                image="https://imgs.search.brave.com/l3kU2ikPIP_tEx48_5ZrP7ZUyQnj9WAxee-twiMm-iU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWxnaWdhbnRlbi5k/ay9yZXNvdXJjZS9i/bG9iLzU3NzgwNDQv/ZTYyMzhkYzgyNDM0/NzUzZTdjOTk1YmI1/YWU4MTBlZjMvYXBw/bGUtbWFjYm9vay1h/aXItbTMtdGVhc2Vy/LWltYWdlLWRhdGEu/anBn"
              />
            </div>
          </main>
          <main className="mx-auto w-[90%] mt-6 mb-10 relative">
            <div className="flex justify-center items-center gap-4 p-4">
              <div>
                <h1 className="text-4xl font-bold pb-6">Deals of the Months</h1>
                <p className="text-lg font-medium">
                  Get ready for a shopping experince like never before with our
                  Deals of the Month!
                  <br />
                  Every purchase come with exclusive deals and discounts,making
                  thihs month a celebration of savvy choices and amazing deals.
                  Don&apos;t miss out!
                </p>
                <br />
                <br />
                <br />
                <button className="bg-black hover:opacity-85 text-white font-bold py-2 px-4 rounded-lg">
                  View Products
                </button>
              </div>
              <div>
                <Image src={deals} alt="" />
              </div>
            </div>
          </main>
          <main>
            <div className="flex justify-center items-center gap-4 p-4">
              <div className="flex justify-around gap-8 p-8 w-full rounded-xl">
                <div className="flex flex-col items-start w-[300px] text-start bg-white p-6 rounded hover:scale-105 transform transition-all duration-300">
                  <Image
                    src={shipping}
                    alt="Free Shipping"
                    className="w-10 h-10 mb-4"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Free Shipping
                  </h1>
                  <p className="text-base font-medium text-gray-600">
                    Get free shipping on orders over $99.00.
                  </p>
                </div>

                <div className="flex flex-col items-start w-[300px] text-start bg-white p-6 rounded-lg hover:scale-105 transform transition-all duration-300">
                  <Image
                    src={dollar}
                    alt="Best Prices"
                    className="w-10 h-10 mb-4"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Best Prices
                  </h1>
                  <p className="text-base font-medium text-gray-600">
                    Shop with confidence and get the best prices on top-quality
                    products.
                  </p>
                </div>

                <div className="flex flex-col items-start w-[300px] text-start bg-white p-6 rounded-lg hover:scale-105 transform transition-all duration-300">
                  <Image
                    src={support}
                    alt="Customer Support"
                    className="w-10 h-10 mb-4"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    24/7 Support
                  </h1>
                  <p className="text-base font-medium text-gray-600">
                    Our customer support is available 24/7 to assist you.
                  </p>
                </div>

                <div className="flex flex-col items-start w-[300px] text-start bg-white p-6 rounded-lg hover:scale-105 transform transition-all duration-300">
                  <Image
                    src={payment}
                    alt="Secure Payment"
                    className="w-10 h-10 mb-4"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Secure Payment
                  </h1>
                  <p className="text-base font-medium text-gray-600">
                    We offer secure and trusted payment methods for all
                    transactions.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default page;
