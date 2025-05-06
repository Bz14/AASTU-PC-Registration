import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import ContentSection from "./ContentSection";

function MainLayout() {
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);
  const selectedItem = location.pathname.includes("/qrpage")
    ? "qrcode"
    : location.pathname.split("/").pop() || "dashboard";

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/signup";
  //const selectedItem = location.pathname.split('/').pop() || 'dashboard';

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 640);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      {!isLoginPage && <Navbar />}
      <div className={`flex h-[87%] w-full transition-all duration-300`}>
        {!isLoginPage && (
          <>
            <div>
              {/* Sidebar for desktop view */}
              {!isMobileView && <Sidebar />}
            </div>

            {/* Main content section */}
            <ContentSection selectedItem={selectedItem} />
          </>
        )}

        {/* Show MobileMenu only on mobile view and when not on login/signup pages */}
        {!isLoginPage && isMobileView && <MobileMenu />}
      </div>
    </div>
  );
}

export default MainLayout;
