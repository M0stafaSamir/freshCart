import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  async function getAllCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    console.log(data.data);
    setCategories(data.data);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-28 my-8">
        {categories.map((category, index) => {
          return (
            <div key={index} className="shadow-md  ">
              <div>
                <img className="w-full h-72" src={category.image} alt="brand" />
              </div>
              <p className="text-center p-2 text-green-400 font-bold text-2xl">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
