"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Support from "../components/Support";
import Footer from "../components/Footer";
import profile from "../../public/assets/icons/profile.svg";
import order from "../../public/assets/icons/orders.svg";
import logout from "../../public/assets/icons/logout.svg";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface User {
  userId: string;
  email: string;
  name: string;
}
const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(user?.name);
  useEffect(() => {
    // Option A: Get user details directly from token
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("/api/profile")
        const data = res.data;
        if (res.status === 200) {
          setUser(data.user);
        } else {
          console.log(data.message || "Failed to fetch user details");
        }
      } catch (err: unknown) {
      
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const logoutHandler = async () =>{
    try {
      const response = await axios.post("/api/auth/logout");
      if (response.status === 200) {
        window.location.href = "/";
      } else {
        console.log("Failed to log out");
      }
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }
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
                <h1>{user?.name}</h1>
                <h1>{user?.email}</h1>
              </div>
            </div>
            <Link
              href={"/"}
              className="flex rounded-lg  gap-4 mt-4 w-full justiry-between p-4 bg-gray-100 hover:bg-gray-300 transition-all duration-150"
            >
              <Image width={30} height={30} src={order} alt="" />
              <h1>My Orders</h1>
            </Link>
            <div
             onClick={logoutHandler}
              className="flex rounded-lg cursor-pointer  gap-4 mt-4 w-full justiry-between p-4 bg-gray-100 hover:bg-gray-300 transition-all duration-150"
            >
              <Image width={30} height={30} src={logout} alt="" />
              <h1>Logout</h1>
            </div>
          </div>
          <div className="ml-10 w-2/3">
            <h1 className="text-2xl font-bold">Personal Information</h1>
            <label className="text-sm" htmlFor="">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="w-full p-4 border border-gray-300 rounded-lg">
              {user?.email}
            </div>
            <label className="text-sm" htmlFor="">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="w-full p-4 border border-gray-300 rounded-lg">
              {user?.name}
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

export default Profile;
