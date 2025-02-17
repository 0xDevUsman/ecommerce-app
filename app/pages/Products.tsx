import React from "react";
import Navbar from "../components/Navbar";
import { products } from "../data";
import Image from "next/image";
const Products = () => {
  return (
    <>
      <Navbar />
      <section className="flex justify-center p-6">
        <main className="w-[90%] flex gap-6">
          {/* Sidebar */}
          <aside className="w-1/4 p-4 bg-gray-100 rounded-lg">
            <h1 className="text-xl font-bold mb-4">Product Categories</h1>
            <div className="space-y-2">
              {[
                "Watches",
                "TV & Home",
                "Ipads",
                "Accessories",
                "Laptops",
                "Phones",
              ].map((category) => (
                <div key={category} className="flex items-center">
                  <input type="checkbox" className="h-4 w-4" />
                  <label className="px-2">{category}</label>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold mt-6">Sort By</h2>
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sort"
                  className="h-4 w-4"
                  defaultChecked
                />
                <label>Latest</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="sort" className="h-4 w-4" />
                <label>Oldest</label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="w-[90%] flex flex-wrap justify-between gap-6">
            {products.map((data, index) => (
              <div
                key={index}
                className="border w-[300px] p-4 rounded-lg bg-white shadow-md"
              >
                <Image
                  className="rounded-t-lg object-cover"
                  width={250}
                  height={250}
                  src={data.images}
                  alt=""
                />
                <h3 className="font-semibold text-lg">{data.name}</h3>
                <p className="text-gray-600 text-sm">{data.description}</p>
                <p className="text-lg font-bold mt-2">${data.price}.00</p>
              </div>
            ))}
          </section>
        </main>
      </section>
    </>
  );
};

export default Products;
