import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext"; // Use the custom hook to consume the theme context

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme(); // Access the current theme and toggleTheme function from context
  const [circlePosition, setCirclePosition] = useState("ml-[6%]"); // Circle position for the toggle slider

  // Adjust the toggle slider position based on the current theme on load
  useEffect(() => {
    if (theme === "bluesh") {
      setCirclePosition("ml-[6%]"); // Circle position for Theme 1 (Bluesh)
    } else if (theme === "light") {
      setCirclePosition("ml-[35%]"); // Circle position for Theme 2 (Light)
    } else if (theme === "dark") {
      setCirclePosition("ml-[64%]"); // Circle position for Theme 3 (Dark)
    }
  }, [theme]);

  // Handle click event for toggling between themes
  const handleTogglerClick = (event) => {
    const clickX =
      event.clientX - event.currentTarget.getBoundingClientRect().left;
    const togglerWidth = event.currentTarget.offsetWidth;
    const positionPercent = (clickX / togglerWidth) * 100;

    if (positionPercent < 33) {
      toggleTheme("bluesh"); // Switch to "Bluesh" theme (Theme 1)
      setCirclePosition("ml-[6%]");
    } else if (positionPercent < 66) {
      toggleTheme("light"); // Switch to "Light" theme (Theme 2)
      setCirclePosition("ml-[35%]");
    } else {
      toggleTheme("dark"); // Switch to "Dark" theme (Theme 3)
      setCirclePosition("ml-[64%]");
    }
  };

  return (
    <div className="flex gap-2 sm:gap-4">
      <div className="text-white flex items-center font-semibold">THEME</div>
      <div className="theme-container flex flex-col items-center">
        <ul className="flex justify-between w-[48px] text-[#CCFFFF] text-sm">
          <li>1</li> {/* Theme 1 indicator (Bluesh) */}
          <li>2</li> {/* Theme 2 indicator (Light) */}
          <li>3</li> {/* Theme 3 indicator (Dark) */}
        </ul>
        <div
          className="relative bg-gray-300 h-[21px] w-[55px] rounded-full mt-1"
          onClick={handleTogglerClick}
        >
          <div
            className={`circle bg-pink-600 h-[16px] w-[16px] rounded-full absolute top-[2.5px] ${circlePosition} transition-all duration-200`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggler;
