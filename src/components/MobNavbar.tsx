"use client";
import React, { useEffect, useState } from "react";

import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";
import Link from "next/link";

const MobNavbar = () => {

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    // Calculate the number of unique product objects in the cart
    const uniqueProductsCount = new Set(cartItems.map((item: any) => item.title)).size;

    // Set the cart count
    setCartCount(uniqueProductsCount);
  }, [cartCount]);


  return (
    <div className="lg:hidden fixed bottom-0 w-full bg-white left-[50%] -translate-x-[50%] max-w-[500px] mob_navbar px-8">
      <div className="flex justify-between text-[28px] py-2">
        <IoMenuOutline />
        <div className="relative">
          <Link href="/cart">
            <HiOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              {cartCount}
            </div>

          </Link>
        </div>

        <AiOutlineHome />
        <FiHeart />
        <AiOutlineAppstore />
      </div>
    </div>
  );
};

export default MobNavbar;
