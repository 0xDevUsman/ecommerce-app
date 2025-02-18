import Link from "next/link";
import React from "react";
import logo from "../../public/logo-black.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
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
            <Link
              className="text-lg px-6 flex items-center py-2 bg-black text-white text-center rounded-lg font-bold hover:opacity-85"
              href={"/login"}
            >
              Login
            </Link>
          </div>
        </nav>
        <div className="flex justify-center items-center">
          <div className="h-0.5 w-[95%] bg-[#242323] rounded-full"></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
