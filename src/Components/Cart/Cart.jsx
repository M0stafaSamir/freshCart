import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "../CartProduct/CartProduct";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(null);
  useEffect(() => {
    getUserCart();
  }, []);

  async function getUserCart() {
    setIsLoading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(data);
    if (data.numOfCartItems == 0) {
      setCart(null);
    } else {
      setCart(data);
    }
  }

  async function clearCart() {
    let { data } = await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        setCart(null);
      });
  }

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <div className="min-h-screen bg-gray-100 pt-20">
          {cart ? (
            <>
              <h1 className="mb-10 text-center text-2xl font-bold">
                Cart Items : ({cart?.numOfCartItems})
              </h1>
              <div className="mx-auto text-center my-6">
                <button
                  onClick={() => clearCart()}
                  className="px-4 py-2 bg-transparent border border-red-600 hover:bg-red-600 hover:text-white rounded-md">
                  Clear Cart
                </button>
              </div>
              <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                  {cart?.data.products.map((product, index) => {
                    return (
                      <CartProduct
                        key={index}
                        product={product}
                        setCart={setCart}
                        cart={cart}
                      />
                    );
                  })}
                </div>

                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">
                      {cart?.data.totalCartPrice.toLocaleString()} EGP
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">0.00 EGP</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className="">
                      <p className="mb-1 text-lg font-bold">
                        {cart?.data.totalCartPrice.toLocaleString()} EGP
                      </p>
                      <p className="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                  <Link
                    to={"/shippingAddress/" + cart?.data._id}
                    className="mt-6 w-full block text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                    Check out
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-center font-bold text-5xl">
              your Cart is Empty
            </h1>
          )}
        </div>
      </>
    );
  }
}
