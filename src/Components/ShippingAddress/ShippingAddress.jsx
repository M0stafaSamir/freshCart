import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export default function ShippingAddress() {
  const { cartId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    city: Yup.string().required("city is required"),
    phone: Yup.string().required("phone is required"),
    details: Yup.string().required("details is required"),
  });

  const initialValues = { city: "", phone: "", details: "" };

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  async function onSubmit() {
    setIsLoading(true);
    console.log(values);

    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
          cartId,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: window.location.origin,
          },
        }
      )
      .then(({ data }) => {
        setIsLoading(false);
        console.log(data);
        location.href = data.session.url;
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="min-h-screen flex items-center">
        <div className="w-f lg:w-1/3 md:w-1/2 px-10 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md  py-10 flex flex-col items-center">
          <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
            Add your shipping Address
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="city"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                city:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                type="text"
                id="city"
                name="city"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.city && errors.city && (
                <p className="text-red-500">{errors.city}</p>
              )}
            </div>
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="details"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                details:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.details}
                type="text"
                id="details"
                name="details"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.details && errors.details && (
                <p className="text-red-500">{errors.details}</p>
              )}
            </div>
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="phone"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                phone:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500">{errors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500">
              CheckOut{" "}
              {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
