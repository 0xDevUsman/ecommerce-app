import React from "react";
import Navbar from "./components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
      <section
        className="h-[90vh] w-[90%] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596795131676-69996a99d172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxpcGhvbmV8ZW58MHwwfDB8fHww')",
        }}
      >
        <div className="relative h-full w-full flex items-center justify-center text-black">
          <h1 className="absolute top-20 left-10 text-4xl font-bold">Unleash you r Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae excepturi deleniti quae.</h1>
        </div>
      </section>
      </div>
    </>
  );
};

export default page;
