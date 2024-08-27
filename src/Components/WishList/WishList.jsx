import axios from "axios";
import React, { useEffect, useState } from "react";
import { addProductToCart } from "../../cartServices";
import { Bounce, toast } from "react-toastify";

export default function WishList() {
  const [isLoading, setisLoading] = useState(true);
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    setisLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data.data);
    setWishList(data.data);
    setisLoading(false);
  }

  async function removeProductFromWishList(productId) {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    getWishList();
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

  return (
    <>
      <div className="w-3/4 bg-slate-400 mx-auto my-16 p-5">
        <h1 className="text-center text-4xl font-bold capitalize py-8">
          my wish list
        </h1>

        <div>
          {wishList.map((product, index) => {
            return (
              <div
                key={index}
                className="flex justify-between bg-slate-200 items-center p-6 my-4 rounded-md">
                <div className="flex items-center">
                  {" "}
                  <img
                    className="w-40 rounded-md"
                    src={product.imageCover}
                    alt="product"
                  />
                  <div className="mx-3">
                    <p className="text-xl">{product.title}</p>
                    <p>{product.price.toLocaleString()} EGP</p>
                    <button
                      onClick={() => removeProductFromWishList(product.id)}
                      className="text-red-500 font-bold">
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className=" px-4 py-2 border border-green-400 rounded-md hover:bg-green-500 hover:text-white">
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
