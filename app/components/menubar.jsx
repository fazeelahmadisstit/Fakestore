'use client';
import React, { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { MdCategory, MdShop2, MdContacts, MdOutlineLogin } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


export default function MenuBar() {
  const [toggle, setToggle] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategory, setShowCategory] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategory(true);
    setToggle(false);
  };

  const handleGoBack = () => {
    setSelectedCategory(null);
    setShowCategory(false);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggle && !event.target.closest(".mobile-menu")) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle]);

  return (
    <div
      className={`sticky top-0 z-40 p-3 md:p-4 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-gray-100"
      }`}
    >
      <div className="max-w-[1240px] flex justify-between items-center mx-auto">
        {/* Logo */}
        <div className="flex items-center font-bold gap-2 hover:opacity-80 cursor-pointer">
          <img
            src="/images/logo.jpg"
            alt="Paklet Logo"
            className="h-20 md:h-12 w-auto"
            width={48}
            height={48}
          />
          <h1 className="text-3xl font-bold">Paklet</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex text-black gap-x-8 lg:gap-x-14 items-center text-sm lg:text-base">
            <li>
              <button
                onClick={handleGoBack}
                className="flex items-center gap-1 hover:text-orange-500 transition-colors"
              >
                <IoHome /> Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("men")}
                className="flex items-center gap-1 hover:text-orange-500 transition-colors"
              >
                <MdCategory /> Category
              </button>
            </li>
           
            <li>
              <button
                onClick={() => alert("Contact section coming soon")}
                className="flex items-center gap-1 hover:text-orange-500 transition-colors"
              >
                <MdContacts /> Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Cart & Login Section */}
        <div className="flex items-center gap-4 md:gap-8">
          <button className="relative p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <FaShoppingCart className="text-lg md:text-xl text-black" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          <button
            onClick={() => setShowLogin(true)}
            className="bg-orange-500 hover:bg-orange-600 text-black px-3 md:px-4 py-1.5 md:py-2 rounded-md flex items-center text-xs md:text-sm transition-colors"
          >
            <MdOutlineLogin className="w-4 h-4 md:w-5 md:h-5 mr-1" />
            <span>Login</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            {toggle ? (
              <AiOutlineClose className="text-black text-2xl" />
            ) : (
              <AiOutlineMenu className="text-black text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`mobile-menu fixed top-0 right-0 w-[250px] h-[100vh] bg-gray-200 text-black flex flex-col items-start pt-10 px-6 transition-transform duration-300 z-50 ${
          toggle ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-4 w-full">
          <li>
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 hover:text-orange-500 transition-colors py-2"
            >
              <IoHome size={18} /> Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick("men")}
              className="flex items-center gap-2 hover:text-orange-500 transition-colors py-2"
            >
              <MdCategory size={18} /> Category
            </button>
          </li>
          
          <li>
            <button
              onClick={() => alert("Contact section coming soon")}
              className="flex items-center gap-2 hover:text-orange-500 transition-colors py-2"
            >
              <MdContacts size={18} /> Contact
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-2 hover:text-orange-500 transition-colors py-2"
              onClick={() => {
                setShowLogin(true);
                setToggle(false);
              }}
            >
              <MdOutlineLogin size={18} /> Login
            </button>
          </li>
        </ul>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative mx-4">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl transition-colors"
              aria-label="Close login modal"
            >
              &times;
            </button>
            <LogInSignUp onSuccess={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {/* Show Category Products Inline */}
      {showCategory && selectedCategory && (
        <div className="p-6">
          <button
            onClick={handleGoBack}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          >
            Go Back to Home
          </button>
          <AllCategoryProducts
            category={selectedCategory}
            addToCart={addToCart}
          />
        </div>
      )}
    </div>
  );
}
