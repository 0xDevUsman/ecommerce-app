import React from "react";
import Navbar from "../components/Navbar";
import Support from "../components/Support";
import Footer from "../components/Footer";
import profile from "../../public/assets/icons/profile.svg";
import order from "../../public/assets/icons/orders.svg";
import logout from "../../public/assets/icons/logout.svg";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto mt-10 mb-[71px]">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex items-center mt-10">
          <div className="flex w-1/3 justify-center flex-col items-start">
            <div className="flex gap-4 mt-4 w-full rounded-lg justiry-between p-4 bg-gray-100">
              <Image width={40} height={40} src={profile} alt="" />
              <div>
                <h1>Faizan</h1>
                <h1>faizan@gmail.com</h1>
              </div>
            </div>
            <Link
              href={"/"}
              className="flex rounded-lg  gap-4 mt-4 w-full justiry-between p-4 bg-gray-100 hover:bg-gray-300 transition-all duration-150"
            >
              <Image width={30} height={30} src={order} alt="" />
              <h1>My Orders</h1>
            </Link>
            <Link
              href={"/"}
              className="flex rounded-lg  gap-4 mt-4 w-full justiry-between p-4 bg-gray-100 hover:bg-gray-300 transition-all duration-150"
            >
              <Image width={30} height={30} src={logout} alt="" />
              <h1>Logout</h1>
            </Link>
          </div>
          <div className="ml-10 w-2/3">
            <h1 className="text-2xl font-bold">Personal Information</h1>
            <label className="text-sm" htmlFor="">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="w-full p-4 border border-gray-300 rounded-lg">
              faizan@gmail.com
            </div>
            <label className="text-sm" htmlFor="">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="w-full p-4 border border-gray-300 rounded-lg">
              Faizan
            </div>
            <Link href="/products">
              <button className="bg-black font-bold text-white px-6 py-3 rounded-lg mt-4 hover:opacity-85">
                Shop now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Support />
      <Footer />
    </>
  );
};

export default page;
