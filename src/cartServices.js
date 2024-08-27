import axios from "axios";
import { Bounce, toast } from "react-toastify";

export async function addProductToCart(productId) {
  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId: productId,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
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

export async function addProductToWishList(productId) {
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
export async function removeProductFromWishList(productId) {
  let { data } = await axios.delete(
    "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
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
