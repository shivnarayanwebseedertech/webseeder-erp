import React from "react";
import { Link } from "react-router-dom";
import Needhelp from "./Needhelp";
import logowithbg from "../assets/logowithbg.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="mx-auto w-22 h-10 "
                  src={logowithbg}
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div className="flex gap-4">
                {/* Use div instead of button to avoid nested buttons */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    /* your openHelpPanel logic here */
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      /* same logic */
                    }
                  }}
                  className="cursor-pointer"
                >
                  <Needhelp />
                </div>

                <button>
                  <IoIosNotificationsOutline className="h-6 w-6 rounded-full" />
                </button>

                <button className="bg-white text-blue-400 mt-1 rounded-full flex text-sm">
                  <FiUser className="h-6 w-6 rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
