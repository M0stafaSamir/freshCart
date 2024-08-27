import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter a valid email"),
  });

  const initialValues = { email: "" };

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  async function onSubmit() {
    setErrMsg("");

    setIsLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then(({ data }) => {
        setIsLoading(false);
        navigate("/verifyCode");
        console.log(data);
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
            Enter your Email to reset the password
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="email"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                Email:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                type="email"
                id="email"
                name="email"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.email && errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500">
              Send Code{" "}
              {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
            </button>
            {errMsg && <p className="text-red-500 text-center">{errMsg}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
