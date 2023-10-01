"use client";
import Image from "next/image";
import React, { useState } from "react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// Define the props for the ProductCard component
interface propsType {
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: number;
}

// Truncate a long description to a specified maximum length
const truncateDescription = (description: string, maxLength: number) => {
  if (description.length <= maxLength) {
    return description;
  }
  const truncatedDesc = description.substring(0, maxLength);
  return `${truncatedDesc}...`;
};




const ProductCard: React.FC<propsType> = ({
  img,
  title,
  desc,
  rating,
  price,
}) => {
    // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
   // Function to generate the star rating
  const generateRating = (rating: number) => {
    const filledStars = Array(rating).fill(<AiFillStar key={rating} />);
    const outlinedStars = Array(5 - rating).fill(<AiOutlineStar key={rating} />);
    return (
      <div className="flex gap-1 text-[20px] text-[#FF9529]">
        {filledStars}
        {outlinedStars}
      </div>
    );

  };

  const truncatedDesc = truncateDescription(desc, 30);


  // Function to handle adding the product to cart
  const addToCart = () => {
   
    // Check if there is an existing cart in local storage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingProductIndex = existingCart.findIndex(
      (item :any) => item.title === title
    );

    if (existingProductIndex !== -1) {
      // If the product exists, increment its quantity
      existingCart[existingProductIndex].quantity += 1;
    } else {
      // If the product does not exist, add it with a quantity of 1
      existingCart.push({ title, price, quantity: 1 });
    }

    // Store the updated cart in local storage
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

    // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="px-4 border border-gray-200 rounded-xl max-w-[400px]">
      <div>
        <Image
          className="w-full h-auto"
          src={img}
          width={200}
          height={300}
          alt={title}
        />
      </div>

      <div className="space-y-2 py-2">
        <h2 className="text-accent font-medium uppercase">{title}</h2>
        <p className="text-gray-500 max-w-[150px]">{truncatedDesc}</p>
        <div>{generateRating(rating)}</div>

        <div className="font-bold flex gap-4">
          ${price}

          <button onClick={addToCart} className="bg-accent text-white px-1 py-0.5 rounded text-sm">
            Add to Cart
          </button>
          <button
            onClick={openModal}
            className="bg-accent text-white px-1 py-0.5 rounded text-sm"
          >
            View Details
          </button>
        </div>

      </div>



      {/* Product details modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-40"></div>
          <div className="bg-white p-4 rounded-lg z-10 w-80">
            {/* <h2 className="text-xl font-semibold">{title}</h2> */}
            <div>
              <Image
                className="w-full h-auto"
                src={img}
                width={200}
                height={300}
                alt={title}
              />
            </div>
            <h2 className="text-accent font-medium uppercase">{title}</h2>
            <p>{desc}</p>

            <div>{generateRating(rating)}</div>

            <div className="font-bold flex gap-4">
              ${price}

              <button onClick={addToCart} className="mt-4 bg-accent text-white px-2 py-1 rounded">
                Add to Cart
              </button>
              <button
                onClick={closeModal}
                className="mt-4 bg-accent text-white px-2 py-1 rounded"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductCard;


