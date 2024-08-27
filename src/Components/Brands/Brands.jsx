import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllBrands() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );

    console.log(data.data);
    setBrands(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <div className="bg-gray-100 py-8">
          <h1 className="text-center font-bold text-center text-5xl capitalize text-green-400 my-8">
            all brands
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-12">
            {brands.map((brand, index) => {
              return (
                <div
                  key={index}
                  className="shadow-md bg-white p-4 hover:shadow-lg hover:shadow-green-400 duration-500">
                  <div>
                    <img src={brand.image} alt="brand" />
                  </div>
                  <p className="text-center">{brand.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
