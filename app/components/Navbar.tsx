"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/logo-black.svg";
import cart from "../../public/assets/icons/cart.svg";
import profile from "../../public/assets/icons/profile.svg";
import { jwtDecode } from "jwt-decode";

interface User {
  userId: string;
  email: string;
  isAdmin: boolean;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get token from cookies.
    // This is a simple cookie parser, assuming your cookie format is "token=..."
    const tokenCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="));
    const token = tokenCookie?.split("=")[1];
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div>
      <nav className="flex justify-between items-center px-6 md:px-20 pt-6 pb-2">
        <Link className="text-lg" href={"/"}>
          <Image width={200} src={logo} alt="logo" />
        </Link>
        <div className="flex gap-10 items-center font-bold text-sm md:text-lg">
          <Link className="text-lg" href={"/"}>
            Home
          </Link>
          <Link className="text-lg" href={"/products"}>
            Shop
          </Link>
          {user ? (
            <>
              <Link href={"/cart"}>
                <Image src={cart} alt="Cart" />
              </Link>
            </>
          ) : (
            ""
          )}
          {user ? (
            <>
              <Link href={"/profile"}>
                <Image height={30} width={30} src={profile} alt="Profile" />
              </Link>
            </>
          ) : (
            <Link
              className="text-lg px-6 flex items-center py-2 bg-black text-white text-center rounded-lg font-bold hover:opacity-85"
              href={"/login"}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <div className="flex justify-center items-center">
        <div className="h-0.5 w-[95%] bg-[#242323] rounded-full"></div>
      </div>
    </div>
  );
};

export default Navbar;
