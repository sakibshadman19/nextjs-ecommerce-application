"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { BsSearch } from "react-icons/bs";



const NewProducts = () => {
  // State to store the fetched product data
  const [productsData, setProductsData] =  useState<any[]>([]);

   // State to store the search input value
  const [search, setSearch] = useState('')
 


  useEffect(() => {
    // Fetch product data from the API
    axios.get("https://alternative-heroku.vercel.app/products")
      .then((response) => {
        setProductsData(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

 
  }, []);

  return (
    <div>


      <div className="container pt-16">

        <div className="mb-10 w-full sm:w-[400px] md:w-[400px] relative">
          <input onChange={(e) => setSearch(e.target.value)}
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Enter any product name..."
          />

          <BsSearch
            className="absolute right-0 top-0 mr-3 mt-3 text-gray-400"
            size={20}
          />
        </div>


        <div className="grid grid-cols-1 place-items-center sm:place-items-start  md:grid-cols-3  sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
           {/* Mapping through filtered products and rendering ProductCard component */}
          {productsData.filter((item) => {
           
            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
          }).map((item, index) => (
            <ProductCard
              key={item['_id']}
              img={item['image']}
              title={item['name']}
              desc={item['description']}
              rating={item['reviews']}
              price={item['price']}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProducts;


