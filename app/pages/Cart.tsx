import React from 'react';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component
import Image from 'next/image';

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      image: 'https://imgs.search.brave.com/qpMmoP_iOYEkuEvHq5k7S3WCFk3r93rv-eD6UrqgP-I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kb2l0/LmlsbGlub2lzLmdv/di9jb250ZW50L2Rh/bS9zb2kvZW4vd2Vi/L2RvaXQvaW1hZ2Vz/L3Byb2R1Y3RzL3Bl/cnNvbmFsLWNvbXB1/dGVycy9wdWJsaXNo/aW5naW1hZ2VzL2Fw/cGxlLW1hYy1wcm8u/anBn', 
      name: '15-inch MacBook Air (2TB) Midnight',
      price: 2099.00,
      quantity: 1,
    },
    // Add more items as needed
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryCharge = 0; // You can make this dynamic if needed
  const grandTotal = subtotal + deliveryCharge;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3"> {/* Items Section */}
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Product</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border px-4 py-2">
                        <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16 mr-2" />
                        <span>{item.name}</span>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <button className="px-2 py-1">-</button> {/* Decrease Quantity */}
                          <input
                            type="text"
                            value={item.quantity}
                            className="w-12 text-center border rounded"
                            readOnly // Or make it editable
                          />
                          <button className="px-2 py-1">+</button> {/* Increase Quantity */}
                        </div>
                      </td>
                      <td className="border px-4 py-2 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:w-1/3"> {/* Summary Section */}
              <div className="border p-4">
                <h2 className="text-lg font-bold mb-2">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Charge:</span>
                  <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Grand Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">
                  Login to checkout
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Continue shopping</h2>
          <p className="text-gray-500 mb-4">
            Discover more products that are perfect for gift, for your wardrobe, or a unique addition to your collection.
          </p>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Continue shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;