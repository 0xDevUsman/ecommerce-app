import React from 'react'
import Image from "next/image";
import logo from "../../public/logo-white.svg";
const Footer = () => {
  return (
    <>
    <footer className='flex justify-between items-center px-10 bg-black text-white h-20'>
        <Image src={logo} alt=''/>
        <h1 className='text-center'> ©2024 Tech Haven. All rights are reserved</h1>
    </footer>
    </>
  )
}

export default Footer