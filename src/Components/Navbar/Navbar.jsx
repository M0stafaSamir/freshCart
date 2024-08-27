import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { userToken, setUserToken } = useContext(AuthContext);

  const navigate = useNavigate();

  function signOut() {
    setUserToken("");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <header className="bg-gray-800 fixed w-full">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <div className="text-white font-bold text-xl me-8">
                <a href="#">Fresh Cart</a>
              </div>
              {userToken && (
                <div className="hidden md:block">
                  <ul className="flex items-center space-x-8">
                    <li>
                      <NavLink to={"/"} className="text-white">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/products"} className="text-white">
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/categories"} className="text-white">
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/brands"} className="text-white">
                        Brands
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/cart"} className="text-white">
                        Cart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/wishList"} className="text-white">
                        WishList
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}

              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="outline-none mobile-menu-button">
                  <svg
                    className="w-6 h-6 text-white"
                    x-show="!showMenu"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-white social-media">
                <i className="fa-brands fa-facebook-f mx-1"></i>
                <i className="fa-brands fa-twitter mx-1"></i>
                <i className="fa-brands fa-linkedin mx-1"></i>
                <i className="fa-brands fa-youtube mx-1"></i>
                <i className="fa-brands fa-tiktok mx-1"></i>
              </div>
              <div>
                <ul className="flex ">
                  {!userToken && (
                    <>
                      <li>
                        <NavLink
                          to={"/login"}
                          className="block px-4 py-2 text-white">
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/Register"}
                          className="block px-4 py-2 text-white">
                          Register
                        </NavLink>
                      </li>
                    </>
                  )}

                  {userToken && (
                    <li>
                      <button
                        onClick={signOut}
                        className="block px-4 py-2 text-white">
                        SignOut
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div
            className={
              isOpen ? "mobile-menu  md:hidden" : "mobile-menu hidden md:hidden"
            }>
            {userToken && (
              <ul className="mt-4 space-y-4">
                <li>
                  <NavLink
                    to={"/"}
                    className="block px-4 py-2 text-white bg-gray-900 rounded">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/products"}
                    className="block px-4 py-2 text-white bg-gray-900 rounded">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/categories"}
                    className="block px-4 py-2 text-white bg-gray-900 rounded">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/brands"}
                    className="block px-4 py-2 text-white bg-gray-900 rounded">
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/cart"}
                    className="block px-4 py-2 text-white bg-gray-900 rounded">
                    Cart
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
