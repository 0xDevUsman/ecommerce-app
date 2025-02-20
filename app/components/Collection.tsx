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
  images: string;
}
const Collection = () => {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
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
    <>
      {product.slice(0,4).map((data, index) => {
        return (
          <>
            <Link key={index} href={`/products/${data._id}`}>
              <Cards
                key={index}
                name={data.name}
                price={data.price}
                image={data.images}
              />
            </Link>
          </>
        );
      })}
    </>
  );
};

export default Collection;
