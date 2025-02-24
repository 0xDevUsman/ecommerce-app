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
      <nav className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 pt-6 pb-2">
        <Link href={"/"}>
          <div className="flex-shrink-0">
            <Image width={200} src={logo} alt="logo" />
          </div>
        </Link>
        <div className="flex flex-wrap gap-4 md:gap-10 items-center font-bold text-sm md:text-lg mt-4 md:mt-0">
          <Link href={"/"}>
            <div className="hover:opacity-90">Home</div>
          </Link>
          <Link href={"/products"}>
            <div className="hover:opacity-90">Shop</div>
          </Link>
          {user ? (
            <>
              <Link href={"/cart"}>
                <div className="hover:opacity-90">
                  <Image src={cart} alt="Cart" />
                </div>
              </Link>
            </>
          ) : null}
          {user ? (
            <>
              <Link href={"/profile"}>
                <div className="hover:opacity-90">
                  <Image height={30} width={30} src={profile} alt="Profile" />
                </div>
              </Link>
            </>
          ) : (
            <Link href={"/login"}>
              <div className="px-6 flex items-center py-2 bg-black text-white rounded-lg font-bold hover:opacity-90">
                Login
              </div>
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
