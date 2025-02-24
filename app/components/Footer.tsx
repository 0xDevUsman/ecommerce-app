import React from "react";
import Image from "next/image";
import logo from "../../public/logo-white.svg";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-around items-center px-6 md:px-10 bg-black text-white py-4">
      <div className="flex justify-center items-center">
        <Image src={logo} alt="Logo" className="w-24 md:w-32" />
      </div>
      <h1 className="text-center mt-4 md:mt-0 text-sm md:text-base">
        ©2024 Tech Haven. All rights are reserved
      </h1>
    </footer>
  );
};

export default Footer;
