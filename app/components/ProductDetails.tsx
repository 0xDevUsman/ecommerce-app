"use client";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { jwtDecode } from "jwt-decode";

interface Product {
  _id: string;
  image : string;
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
  // const [productDetail , setProductDetail] = useState("")

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

  if (!product) {
    return <p>Product not found.</p>;
  }
  const addToCart = async () => {
    try {
      // Assuming quantity is 1 by default
      if (user) {
        const res = await axios.post(
          "http://localhost:3000/api/cart",
          { productId: product._id, quantity: 1},
          { withCredentials: true } // Ensure cookies are sent
        );
        if (res.status === 200) {
          alert("Product added to cart successfully!");
        }
        // console.log(res)
      }
      else {
        alert("Please login to add products to the cart.");
        window.location.href = '/login';
      }
    } catch (error: unknown) {
      console.error("Add to cart error:", error);
    }
  };
  // const fetchProductDetailes = async ()=>{
  //   try {
  //     const response = await axios.get<Product>(`http://localhost:3000/api/products/${productId}`);
  //     setProduct(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch product details:", error);
  //   }
  // }
  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto mt-10 flex gap-10">
        <div className="w-1/2">
          <div className="flex justify-center items-center">
            <Image
              className="rounded-t-lg object-cover bg-black"
              src={product.image }
              width={1000}
              height={1000}
              alt={product.name}
            />
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-4xl font-bold pb-4">{product.name}</h1>
          <h1 className="pb-4">
            {product.category} |{" "}
            <span className="text-green-500">In Stock</span>
          </h1>
          <h1 className="pb-8 font-bold">${product.price}.00</h1>
          <h1 className="pb-2 font-bold">Description</h1>
          <p className="pb-10">{product.description}</p>
          <button
            onClick={addToCart}
            className="bg-black text-white px-6 py-2 rounded-lg mt-4 hover:opacity-85 w-full"
          >
            Add to cart
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    // Use an absolute URL if needed, e.g.:
    const res = await axios.get(`http://localhost:3000/api/products/${id}`);
    // console.log(res)
    const product = res.data;
    return { props: { product } };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { props: { product: null } };
  }
};
