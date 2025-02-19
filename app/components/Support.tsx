import Image from 'next/image'
import React from 'react'
import shipping from "../../public/assets/icons/shipping.svg";
import dollar from "../../public/assets/icons/dollar.svg";
import support from "../../public/assets/icons/support.svg";
import payment from "../../public/assets/icons/payment.svg"
const Support = () => {
  return (
    <>
                    <div className="flex justify-center items-center gap-4 p-4">
              <div className="flex flex-wrap justify-center gap-8 p-8 w-full rounded-xl">
                <div className="flex flex-col items-start w-full sm:w-[300px] text-start bg-white p-6 rounded-lg hover:scale-105 transform transition-all duration-300">
                  <Image
                    src={shipping}
                    alt="Free Shipping"
                    className="w-10 h-10 mb-4"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Free Shipping
                  </h1>
                  <p className="text-base font-medium text-gray-600">
                    Get free shipping on orders over $99.00.
                  </p>
                </div>
                <div className="flex flex-col items-start w-full sm:w-[300px] text-start bg-white p-6 rounded-lg hover:scale-105 transform transition-all duration-300">
                  <Image
                    src={dollar}
                    alt="Best Prices"
                    className="w-10 h-10 mb-4"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Best Prices
                  </h1>
                  <p className="text-base font-medium text-gray-600">
                    Shop with confidence and get the best prices on top-quality
                    products.
                  </p>
                </div>
                <div className="flex flex-col items-start w-full sm:w-[300px] text-start bg-white p-6 rounded-lg hover:scale-105 transform transition-all duration-300">
                  <Image
                    src={support}
                    alt="Customer Support"
                    className="w-10 h-10 mb-4"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    24/7 Support
                  </h1>
                  <p className="text-base font-medium text-gray-600">
                    Our customer support is available 24/7 to assist you.
                  </p>
                </div>
                <div className="flex flex-col items-start w-full sm:w-[300px] text-start bg-white p-6 rounded-lg hover:scale-105 transform transition-all duration-300">
                  <Image
                    src={payment}
                    alt="Secure Payment"
                    className="w-10 h-10 mb-4"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Secure Payment
                  </h1>
                  <p className="text-base font-medium text-gray-600">
                    We offer secure and trusted payment methods for all
                    transactions.
                  </p>
                </div>
              </div>
            </div>
    </>
  )
}

export default Support