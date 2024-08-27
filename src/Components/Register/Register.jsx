import axios from "axios";
import { useFormik, yupToFormErrors } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
      },
      onSubmit: register,
      validationSchema: Yup.object({
        name: Yup.string()
          .required("Name is required")
          .min(3, "name length must ber more than 2")
          .max(20, "name length must less  than 20"),
        email: Yup.string()
          .required("email is required")
          .email("enter a valid email"),
        password: Yup.string()
          .required("password is required")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "min 8 chras, at least 1 letter, one number and one special chars"
          ),
        rePassword: Yup.string()
          .required("rePassword is required")
          .oneOf([Yup.ref("password")], "passwords must match"),
        phone: Yup.string().required("phone is required"),
      }),
    });

  async function register() {
    setSuccessMsg("");
    setErrMsg("");
    setIsLoading(true);

    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        setIsLoading(false);
        setSuccessMsg(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg(err.response.data.message);
      });
  }

  return (
    <>
      <div className="min-h-screen flex items-center">
        <div className="w-f lg:w-1/3 md:w-1/2 px-10 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md  py-10 flex flex-col items-center">
          <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
            Welcome to My Fresh Cart
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="firstName"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                Name:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                type="text"
                id="firstName"
                name="name"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.name && errors.name && (
                <p className="text-red-500">{errors.name}</p>
              )}
            </div>

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

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                Password:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                type="password"
                id="password"
                name="password"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.password && errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                Confirm Password:
              </label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rePassword}
                type="password"
                id="confirmPassword"
                name="rePassword"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {touched.rePassword && errors.rePassword && (
                <p className="text-red-500">{errors.rePassword}</p>
              )}
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2">
                phone number:
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
              Register{" "}
              {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
            </button>
            {errMsg && <p className="text-red-500 text-center">{errMsg}</p>}
            {successMsg && (
              <p className="text-green-500 text-center">{successMsg}</p>
            )}
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
            </span>
            <Link to={"/login"} className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
