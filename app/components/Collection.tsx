"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Cards from "./Cards";

interface Product {
  _id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Collection = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center px-4">
      {product.slice(0, 4).map((data) => (
        <Link key={data._id} href={`/products/${data._id}`}>
          <div className="flex justify-center">
            <Cards name={data.name} price={data.price} image={data.image} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Collection;
