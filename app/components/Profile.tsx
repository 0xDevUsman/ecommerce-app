"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Support from "../components/Support";
import Footer from "../components/Footer";
import profileIcon from "../../public/assets/icons/profile.svg";
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

  useEffect(() => {
    // Option A: Get user details directly from token
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("/api/profile");
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
    return <p className="text-center mt-10">Loading...</p>;
  }

  const logoutHandler = async () => {
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
  };

  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto mt-10 mb-16">
        <h1 className="text-3xl font-bold text-center md:text-left">
          My Profile
        </h1>
        <div className="flex flex-col md:flex-row items-start mt-10 gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="flex gap-4 p-4 bg-gray-100 rounded-lg">
              <Image width={40} height={40} src={profileIcon} alt="Profile" />
              <div>
                <h1 className="font-bold">{user?.name}</h1>
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
            <Link href={"/my-orders"} passHref>
              <div className="flex gap-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors duration-150">
                <Image width={30} height={30} src={order} alt="Orders" />
                <span className="font-medium">My Orders</span>
              </div>
            </Link>
            <div
              onClick={logoutHandler}
              className="flex gap-4 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors duration-150"
            >
              <Image width={30} height={30} src={logout} alt="Logout" />
              <span className="font-medium">Logout</span>
            </div>
          </div>
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div className="mb-4">
              <label className="text-sm" htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div
                id="email"
                className="w-full p-4 border border-gray-300 rounded-lg mt-1"
              >
                {user?.email}
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm" htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <div
                id="name"
                className="w-full p-4 border border-gray-300 rounded-lg mt-1"
              >
                {user?.name}
              </div>
            </div>
            <Link href="/products" passHref>
              <div className="inline-block bg-black font-bold text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-200">
                Shop now
              </div>
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
