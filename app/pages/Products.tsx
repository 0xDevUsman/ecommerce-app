"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";
import axios from "axios";
import Link from "next/link";

interface Product {
  _id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const Products = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        if (response.status === 200) {
          setProduct(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle sorting selection
  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  // Apply filtering & sorting
  const filteredProducts = product
    .filter((p) =>
      selectedCategories.length > 0 ? selectedCategories.includes(p.category) : true
    )
    .sort((a, b) => {
      if (sortOrder === "low-to-high") return a.price - b.price;
      if (sortOrder === "high-to-low") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Navbar />
      <section className="p-6 mt-10">
        <main className="w-[90%] mx-auto flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 p-4 bg-gray-100 rounded-lg">
            <h1 className="text-xl font-bold mb-4">Product Categories</h1>
            <div className="space-y-2">
              {[
                "Gaming Accessories",
                "Computer Accessories",
                "Storage Devices",
                "Audio",
                "Wearable Tech",
                "Mobile Accessories",
                "Smart Home",
                "Creative Tools",
                "Office Setup",
                "Stationery",
                "Photography",
              ].map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label className="px-2">{category}</label>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold mt-6">Sort By</h2>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sort"
                  className="h-4 w-4"
                  checked={sortOrder === "low-to-high"}
                  onChange={() => handleSortChange("low-to-high")}
                />
                <label>Low to High</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sort"
                  className="h-4 w-4"
                  checked={sortOrder === "high-to-low"}
                  onChange={() => handleSortChange("high-to-low")}
                />
                <label>High to Low</label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="w-full lg:w-3/4 flex flex-wrap justify-center lg:justify-start gap-6">
            {filteredProducts.map((data, index) => (
              <Link
                href={`/products/${data._id}`}
                key={index}
                className="border w-[300px] p-4 rounded-lg flex flex-col bg-white shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              >
                <Image
                  className="rounded-t-lg object-cover"
                  width={250}
                  height={250}
                  src={data.image}
                  alt={data.name}
                />
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{data.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {data.description}
                  </p>
                  <p className="text-lg font-bold mt-2">${data.price}.00</p>
                </div>
              </Link>
            ))}
          </section>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default Products;
