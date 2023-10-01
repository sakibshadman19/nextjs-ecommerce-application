"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Link from "next/link";

const HeaderMain = () => {


  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    // Calculate the number of unique product objects in the cart
    const uniqueProductsCount = new Set(cartItems.map((item : any) => item.title)).size;

    // Set the cart count
    setCartCount(uniqueProductsCount);
  }, [cartCount]);

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="container sm:flex justify-between items-center">
        <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
          <Link href="/">
            Qwik IT
          </Link>
        </div>


        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">


          <Link href="/cart" className="relative">
            <HiOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              {cartCount}
            </div>
          </Link>







        </div>

      </div>

    </div>
  );
};

export default HeaderMain;
