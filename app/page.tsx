import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import hero from "../public/admin ui/hero/hero-1.png";
import deals from "../public/assets/images/image-4.svg";
import Footer from "./components/Footer";
import Link from "next/link";
import Support from "./components/Support";
import Collection from "./components/Collection";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <section className="w-full">
          {/* Hero Section */}
          <main className="relative mx-auto w-[90%] mt-6 mb-10 bg-white">
            <Image
              src={hero}
              alt="Description of image"
              className="min-w-screen"
              layout="responsive"
            />
            <div className="hidden sm:block absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 px-4 text-center">
              <h1 className="text-2xl md:text-6xl text-black font-bold">
                Unleash Innovation <br /> in Every Byte.
              </h1>
              <h1 className="text-lg mt-2 mb-7">
                Explore a World of Cutting-Edge Tech.
              </h1>
              <Link
                href={"/products"}
                className="bg-black hover:opacity-85 text-white font-bold py-3 px-6 rounded-lg mt-8 inline-block"
              >
                Shop now
              </Link>
            </div>
          </main>
          {/* Collections */}
          <main className="mx-auto w-[90%] mt-6 mb-10">
            <h1 className="text-3xl font-semibold text-center pb-6">
              New Collections
            </h1>
            <div className="flex flex-wrap justify-center gap-4 p-4">
              <Collection />
            </div>
          </main>
          {/* Deals Section */}
          <main className="mx-auto w-[90%] mt-6 mb-10">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4">
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl font-bold pb-6">Deals of the Months</h1>
                <p className="text-lg font-medium pb-10">
                  Get ready for a shopping experience like never before with our
                  Deals of the Month!
                  <br />
                  Every purchase comes with exclusive deals and discounts,
                  making this month a celebration of savvy choices and amazing
                  deals. Don&apos;t miss out!
                </p>
                <Link
                  href={"/products"}
                  className="bg-black hover:opacity-85 text-white font-bold py-3 px-6 rounded-lg mt-8 inline-block"
                >
                  View Products
                </Link>
              </div>
              <div className="w-full md:w-1/2">
                <Image src={deals} alt="" layout="responsive" />
              </div>
            </div>
          </main>
          {/* Support Section */}
          <main className="mx-auto w-[90%] mt-6 mb-10">
            <Support />
          </main>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default page;
