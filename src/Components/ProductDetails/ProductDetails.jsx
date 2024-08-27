import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ProductImageSlider from "../ProductImageSlider/ProductImageSlider";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { addProductToCart } from "../../cartServices";

export default function ProductDetails() {
  const [isLoading, setisLoading] = useState(true);

  let { id } = useParams();
  const [productDetails, setproductDetails] = useState([]);
  const [relatedProducts, setrelatedProducts] = useState([]);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  async function getProductDetails() {
    setisLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setproductDetails(data.data);
    getRelatedProducts(data.data.category?._id);
    setisLoading(false);
  }

  async function getRelatedProducts(categoryId) {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/",
      {
        params: {
          category: categoryId,
        },
      }
    );
    setrelatedProducts(data.data);
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="bg-gray-100">
          <main className="py-8 ">
            <div className="container mx-auto px-6">
              <div className="md:flex md:items-center">
                <div className="w-full h-64 md:w-3/12 lg:h-96">
                  <ProductImageSlider images={productDetails?.images} />
                </div>
                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-9/12">
                  <h3 className="text-gray-700 uppercase text-lg">
                    {productDetails?.title}
                  </h3>
                  <span className="text-gray-500 mt-3 font-bold text-xl">
                    {productDetails?.price.toLocaleString()} EGP
                  </span>
                  <hr className="my-3" />

                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Rating:
                    </label>
                    <RatingStars rating={productDetails.ratingsAverage} />
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Description:
                    </label>
                    <p>{productDetails.description}</p>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Categories:
                    </label>
                    <h3>{productDetails.category?.name}</h3>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      SubCategory:
                    </label>
                    <h3>{productDetails.subcategory?.[0]?.name}</h3>
                  </div>
                  <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Brand:
                    </label>
                    <h3>{productDetails.brand?.name}</h3>
                  </div>
                  <div className="flex items-center mt-6">
                    <button
                      onClick={() => addProductToCart(productDetails?._id)}
                      className=" bg-slate-800 text-white hover:bg-green-400  flex items-center  border rounded-md p-2 focus:outline-none">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Order Now
                    </button>
                  </div>
                </div>
              </div>

              <RelatedProducts relatedProducts={relatedProducts} />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
