import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace);

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-gray-800 shadow-lg z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo Section */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-10" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navigation.map((nav, index) => (
            <NavLink
              key={nav.label + index}
              to={nav.href}
              className={({ isActive }) =>
                `text-white hover:text-yellow-400 transition duration-300 ${isActive && "font-bold"}`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* Search and Profile Section */}
        <div className="flex items-center gap-4">
          {/* Search Form */}
          <form
            className="flex items-center bg-gray-700 rounded-lg overflow-hidden"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Movie name"
              className="bg-transparent text-white px-3 py-1 outline-none border-none hidden lg:block"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="text-white p-2">
              <IoSearchOutline className="text-xl" />
            </button>
          </form>

          {/* User Profile Icon */}
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-yellow-400 cursor-pointer">
            <img
              src={userIcon}
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-gray-700 w-full py-2 px-4 flex justify-between">
        {navigation.map((nav, index) => (
          <NavLink
            key={nav.label + "mobile" + index}
            to={nav.href}
            className={({ isActive }) =>
              `text-white px-3 py-2 rounded hover:bg-gray-600 transition ${isActive && "bg-gray-500"}`
            }
          >
            {nav.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
