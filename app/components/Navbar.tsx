import Link from "next/link";
import React from "react";
import logo from "../../public/logo-black.svg";
import Image from "next/image";
const Navbar = () => {
  return (
    <>
      <div>
        <nav className="flex justify-between items-center px-20 pt-6 pb-2">
          <Image width={200} src={logo} alt="logo" />
          <div className="flex gap-10 items-center font-bold">
            <Link className="text-lg" href={"/"}>
              Home
            </Link>
            <Link className="text-lg" href={"/shop"}>
              Shop
            </Link>
            <Link
              className="text-lg px-6 flex items-center py-2 bg-black text-white text-center rounded-lg font-bold"
              href={"/login"}
            >
              Login
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
