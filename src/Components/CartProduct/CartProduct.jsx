import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function CartProduct({ product, setCart, cart }) {
  const [isIncreasingLoading, setIsIncreasingLoading] = useState(false);
  const [isDecreasingLoading, setIsDecreasingLoading] = useState(false);
  const [productCount, setproductCount] = useState(product.count);

  async function removeProductFromCart(productId) {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCart(data);
    toast.success("product has been removed", {
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

  async function updateProductCount(productId, count) {
    if (count > product.count) {
      setIsIncreasingLoading(true);
    } else {
      setIsDecreasingLoading(true);
    }

    let { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        count,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCart(data);

    setIsIncreasingLoading(false);
    setIsDecreasingLoading(false);
  }

  useEffect(() => {
    setproductCount(product.count);
  }, [cart]);

  return (
    <>
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img
          src={product.product.imageCover}
          alt="product-image"
          className="w-full rounded-lg sm:w-40"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">
              {product.product.title}
            </h2>
            <p className="mt-1 text-xs text-gray-700">
              {product.price.toLocaleString()} EGP
            </p>
          </div>
          <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <button
                disabled={product.count == 1 || isDecreasingLoading}
                onClick={() =>
                  updateProductCount(product.product._id, product.count - 1)
                }
                className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 disabled:bg-gray-500 disabled:hover:text-black disabled:cursor-not-allowed">
                {" "}
                {isDecreasingLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "-"
                )}{" "}
              </button>
              <input
                onBlur={() =>
                  product.count != productCount &&
                  updateProductCount(product.product._id, productCount)
                }
                onChange={(e) => setproductCount(e.target.value)}
                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                type="number"
                value={productCount}
                min="1"
              />
              <button
                disabled={isIncreasingLoading}
                onClick={() =>
                  updateProductCount(product.product._id, product.count + 1)
                }
                className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {" "}
                {isIncreasingLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "+"
                )}{" "}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">
                Total: <br />
                {(product.price * product.count).toLocaleString()} EGP
              </p>
              <svg
                onClick={() => removeProductFromCart(product.product._id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
