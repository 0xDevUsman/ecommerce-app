import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";

interface Product {
  _id: string;
  images: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

interface ProductDetailsProps {
  product: Product | null;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  if (!product) {
    return <p>Product not found.</p>;
  }
  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto mt-10 flex gap-10">
        <div className="w-1/2">
          <div className="flex justify-center items-center">
            <Image
              className="rounded-t-lg object-cover bg-black"
              src={product.images}
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
          <button className="bg-black text-white px-6 py-2 rounded-lg mt-4 hover:opacity-85 w-full">
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
    // const res = await axios.get(`http://localhost:3000/api/products/${id}`);
    const res = await axios.get(`http://localhost:3000/api/products/${id}`);
    const product = res.data;
    return { props: { product } };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { props: { product: null } };
  }
};
