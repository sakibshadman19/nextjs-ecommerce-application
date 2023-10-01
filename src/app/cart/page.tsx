"use client";
import React, { useState, useEffect } from "react";



const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);


  const removeFromCart = (title :any) => {
    // Remove the product from the cart
    const updatedCart = cartItems.filter((item) => item.title !== title);
    setCartItems(updatedCart);

    // Update local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };



  const updateQuantity = (title:any, newQuantity:any) => {
    // Find the item in the cart
    const updatedCart = cartItems.map((item) => {
      if (item.title === title) {
        // Ensure the new quantity is at least 1
        item.quantity = Math.max(newQuantity, 1);
      }
      return item;
    });
    

    // Update state and local storage
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.title}
            className="border rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center"
          >
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">Price: ${item.price}</p>
              <div className="flex items-center mt-2">
                <p className="mr-4">Quantity:</p>
                <button
                  onClick={() => updateQuantity(item.title, item.quantity - 1)}
                  className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full"
                >
                  -
                </button>
                <p className="mx-2">{item.quantity}</p>
                <button
                  onClick={() => updateQuantity(item.title, item.quantity + 1)}
                  className="bg-accent text-white px-2 py-1 rounded-full"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.title)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;

