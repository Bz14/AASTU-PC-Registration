import React, { useEffect, useState } from "react";
import { useMobileMenu } from "../contexts/MobileMenuContext";
import computerIcon from "../../assets/laptop-minimalistic-svgrepo-com.svg";
import ProfileIcon from "../../assets/profile-svgrepo-com.svg";
import { MdClose, MdMenu } from "react-icons/md";
import ProfileCard from "./ProfileCard";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  const { isMobileMenuVisible, toggleMobileMenu } = useMobileMenu();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controls the dropdown state
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // Load user data from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  // Toggles profile card
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setDropdownOpen(!dropdownOpen); // Toggle dropdown for logged-in users
    } else {
      window.location.href = "/login"; // Redirect to login if not logged in
    }
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("profilePic");
    setIsLoggedIn(false);
    setDropdownOpen(false); // Close profile card after logout
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <div className="relative navbar h-[13%] mx-2 rounded-lg my-1 flex items-center justify-between px-4">
      <div className="flex items-center gap-10 sm:gap-0">
        {/* Menu icon for mobile */}
        <div className=" h-12 w-12 flex items-center justify-center cursor-pointer rounded-full sm:hidden">
          {isMobileMenuVisible ? (
            <MdClose className="w-10 h-10" onClick={toggleMobileMenu} />
          ) : (
            <MdMenu className="w-10 h-10" onClick={toggleMobileMenu} />
          )}
        </div>

        {/* System logo (Visible on sm: and above) */}
        <div className="hidden sm:flex justify-center items-center gap-3">
          <div className="bg-[#CCFFFF] h-8 w-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center">
            <img
              src={computerIcon}
              className="w-6 sm:w-8"
              alt="Computer Icon"
            />
          </div>
          <h1 className="font-bold text-sm sm:text-2xl">
            PC Registration System
          </h1>
        </div>
      </div>

      <div className="relative flex items-center">
        {/* Theme toggler (Visible on sm: and above) */}
        <div className="hidden sm:block">
          <ThemeToggler />
        </div>

        <div className="bg-[#2a89a9] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ml-4">
          {profilePic ? (
            <img
              src={profilePic}
              className="w-10 rounded-full"
              alt="Profile"
              onClick={handleLoginLogout} // Click event for profile
            />
          ) : (
            <img
              src={ProfileIcon}
              className="w-10"
              alt="Profile Icon"
              onClick={handleLoginLogout} // Click event for profile
            />
          )}
        </div>

        {/* Render ProfileCard if dropdownOpen is true */}
        {dropdownOpen && isLoggedIn && (
          <ProfileCard user={{ name: username }} onLogout={handleLogout} /> // Pass user data and logout handler
        )}
      </div>
    </div>
  );
};

export default Navbar;
