"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import loginImage from "../../public/assets/images/image-1.svg";
import logo from "../../public/logo-black.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (data) {
        toast.success(data.message);
        window.location.href = "/";
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        toast.error(error.response?.data.message);
      } else {
        console.log((error as Error).message);
        toast.error((error as Error).message);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Side - Image Cover */}
      <div className="relative w-full md:w-1/2 h-1/3 md:h-full">
        <Image
          src={loginImage}
          alt="Left Side Image"
          layout="fill"
          objectFit="cover"
          unoptimized
        />
      </div>

      {/* Logo overlay */}
      <div className="absolute top-5 left-5 bg-opacity-50 px-3 md:px-4 py-2 rounded-lg">
        <div className="flex items-end justify-center gap-1">
          <Image width={250} src={logo} alt="logo" />
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-50 h-2/3 md:h-full p-5">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl text-black font-bold">
            Login Now 🚀
          </h1>
          <p className="text-sm md:text-base mb-5 text-gray-600">
            Please enter details
          </p>
          <form onSubmit={submitHandler}>
            <label className="text-sm block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full p-2 md:p-3 mb-2 border border-gray-400 rounded-lg outline-none"
            />
            <label className="text-sm block">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full p-2 md:p-3 mb-2 border border-gray-400 rounded-lg outline-none"
            />
            <button
              type="submit"
              className="w-full p-3 text-lg text-white font-bold bg-black rounded-lg hover:opacity-90 transition-opacity duration-200"
            >
              Login
            </button>
            <p className="text-start text-sm md:text-lg mt-3">
              Don&apos;t have an account?{" "}
              <Link href="/register">
                <span className="text-black font-bold">Register</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
