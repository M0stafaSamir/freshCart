import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound/NotFound";
import Brands from "./Components/Brands/Brands";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectAuthRoutes from "./Components/ProtectAuthRoutes/ProtectAuthRoutes";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import ShippingAddress from "./Components/ShippingAddress/ShippingAddress";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import WishList from "./Components/WishList/WishList";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectAuthRoutes>
              {" "}
              <Login />
            </ProtectAuthRoutes>
          ),
        },
        {
          path: "forgetPassword",
          element: (
            <ProtectAuthRoutes>
              {" "}
              <ForgetPassword />
            </ProtectAuthRoutes>
          ),
        },
        {
          path: "verifyCode",
          element: (
            <ProtectAuthRoutes>
              {" "}
              <VerifyCode />
            </ProtectAuthRoutes>
          ),
        },
        {
          path: "resetPassword",
          element: (
            <ProtectAuthRoutes>
              {" "}
              <ResetPassword />
            </ProtectAuthRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectAuthRoutes>
              <Register />{" "}
            </ProtectAuthRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoute>
              {" "}
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "shippingAddress/:cartId",
          element: (
            <ProtectedRoute>
              <ShippingAddress />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}

export default App;
