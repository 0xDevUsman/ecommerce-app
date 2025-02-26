"use client";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

interface User {
  userId: string;
  email: string;
  isAdmin: boolean;
}

interface ProductDetailsProps {
  product: Product | null;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get token from cookies.
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

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  const addToCart = async () => {
    try {
      // Assuming quantity is 1 by default
      if (user) {
        const res = await axios.post(
          "/api/cart",
          { productId: product._id, quantity: 1 },
          { withCredentials: true } // Ensure cookies are sent
        );
        if (res.status === 200) {
          toast.success("Product added to cart successfully!");
        }
      } else {
        toast.error("Please login to add products to cart.");
        {
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }
      }
    } catch (error: unknown) {
      console.error("Add to cart error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto mt-10 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center items-center">
            <Image
              className="rounded-t-lg object-cover bg-black"
              src={product.image}
              width={1000}
              height={1000}
              alt={product.name}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl lg:text-4xl font-bold pb-4">
            {product.name}
          </h1>
          <h2 className="pb-4 text-lg lg:text-xl">
            {product.category} |{" "}
            <span className="text-green-500">In Stock</span>
          </h2>
          <h2 className="pb-8 text-2xl lg:text-3xl font-bold">
            ${product.price}.00
          </h2>
          <h3 className="pb-2 text-lg font-bold">Description</h3>
          <p className="pb-10 text-base">{product.description}</p>
          <button
            onClick={addToCart}
            className="bg-black text-white px-6 py-2 rounded-lg mt-4 hover:opacity-90 w-full transition duration-200"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="mt-10">
        <div className="mt-10">
        <Footer />
      </div>
      </div>
    </>
  );
};

export default ProductDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    // Use an absolute URL if needed, e.g.:
    const res = await axios.get(`/api/products/${id}`);
    const product = res.data;
    return { props: { product } };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { props: { product: null } };
  }
};
