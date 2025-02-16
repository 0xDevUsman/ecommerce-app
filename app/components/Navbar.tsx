import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div>
        <nav className="flex justify-between items-center px-20 pb-2">
          <div className="bg-opacity-50 px-4 py-2 rounded-lg">
            <div className="flex items-end justify-center gap-1">
              <h1 className="text-black text-xl md:text-3xl font-extrabold">
                TECH WAVES.
              </h1>
            </div>
            <div className="w-full h-0.5 mt-0.5 bg-black"></div>
          </div>
          <div className="flex gap-10 items-center font-bold">
            <Link className="text-lg" href={'/'}>Home</Link>
            <Link className="text-lg" href={'/shop'}>Shop</Link>
            <Link className="text-lg px-6 flex items-center py-2 bg-black text-white text-center rounded-lg font-bold" href={'/login'}>Login</Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
