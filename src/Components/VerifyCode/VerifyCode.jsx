import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("code is required"),
  });

  const initialValues = { resetCode: "" };

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  async function onSubmit() {
    setErrMsg("");
    console.log(values);

    setIsLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then(({ data }) => {
        setIsLoading(false);
        navigate("/resetPassword");
        console.log(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  return (
    <>
      <div className="min-h-screen flex items-center">
        <div className="w-f lg:w-1/3 md:w-1/2 px-10 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md  py-10 flex flex-col items-center">
          <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
            Enter the code you received in your email
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="resetCode"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                resetCode:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.resetCode}
                type="text"
                id="resetCode"
                name="resetCode"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.resetCode && errors.resetCode && (
                <p className="text-red-500">{errors.resetCode}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500">
              verify{" "}
              {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
            </button>
            {errMsg && <p className="text-red-500 text-center">{errMsg}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
