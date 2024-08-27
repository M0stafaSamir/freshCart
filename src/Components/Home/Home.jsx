import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Bounce, toast } from "react-toastify";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProduct] = useState([]);
  const [wishedIds, setwishedIds] = useState([]);
  const [roll, setRoll] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProduct(data.data);
    setIsLoading(false);
    // console.log(data);
  }

  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data.data);
    putWishedIds(data.data);
  }
  function putWishedIds(list) {
    let wishListIds = [];
    list.map((product) => {
      wishListIds.push(product.id);
    });
    console.log(wishListIds);
    setwishedIds(wishListIds);
    localStorage.setItem("wishListIds", JSON.stringify(wishListIds));
  }

  console.log(wishedIds);

  async function addProductToWishList(productId) {
    setRoll(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId: productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);

    localStorage.setItem("wishListIds", JSON.stringify(data.data));
    setwishedIds(data.data);
    setRoll(false);

    toast.success(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        {roll ? (
          <div className=" bg-[#ffffffb5]  fixed flex items-center justify-center w-full h-full ">
            <i className="fa-solid fa-heart fa-flip text-8xl text-red-400"></i>
          </div>
        ) : null}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-100 py-16 px-16">
          {products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                wishedIds={wishedIds}
                addProductToWishList={addProductToWishList}
              />
            );
          })}
        </div>
      </>
    );
  }
}
