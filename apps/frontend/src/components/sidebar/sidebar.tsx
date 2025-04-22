import HomeIcon from "@/assets/svg/home.svg";
import AboutUsLogo from "@/assets/svg/about-us.svg";
import RequestLogo from "@/assets/svg/requests.svg";
import SettingsLogo from "@/assets/svg/settings.svg";
import LogoutLogo from "@/assets/svg/logout.svg";
import { useState } from "react";
//import { useNavigate } from "@tanstack/react-router";
import Sidebarleft from "@/assets/svg/sidebar-left.svg";
import Sidebarright from "@/assets/svg/sidebar-right.svg";
const sidebarItems = [
  {
    title: "Home",
    url: "",
    icon: HomeIcon,
  },
  {
    title: "About Us",
    url: "",
    icon: AboutUsLogo,
  },
  {
    title: "Requests",
    url: "",
    icon: RequestLogo,
  },
  {
    title: "Settings",
    url: "",
    icon: SettingsLogo,
  },
  {
    title: "Logout",
    url: "",
    icon: LogoutLogo,
  },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  return (
    <div
      className={`bg-[#100f57] h-[38rem] text-white p-5 ${
        isOpen ? "w-96" : "w-20"
      } flex flex-col justify-between transition-all duration-300 rounded-xl fixed`}
    >
      <div className="mt-6">
        {sidebarItems.map((item) => (
          <div key={item.title} className="relative group">
            <div
              className={`mb-2 flex items-center py-1 p-2 cursor-pointer transiton hover:bg-white hover:text-[#100F57]`}
              style={{
                borderRadius: isOpen ? "0.5rem" : "1rem",
              }}
            >
              <div
                className={`flex items-center justify-center rounded-xl ${isOpen ? "" : "group-hover:bg-white group-hover:text-[#100F57]"}`}
                style={{
                  width: isOpen ? "auto" : "2.5rem",
                  height: "2.0rem",
                }}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-20 w-20 transition group-hover:filter group-hover:brightness-0"
                  style={{ minWidth: "1.5rem", minHeight: "1.5rem" }}
                />
                {isOpen && (
                  <span
                    className={`ml-4 text-sm font-medium transition 
                  }`}
                  >
                    {item.title}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 rounded-full flex items-center justify-center"
        >
          {isOpen ? (
            <img src={Sidebarleft} alt="left" />
          ) : (
            <img src={Sidebarright} alt="right" />
          )}
        </button>
      </div>
    </div>
  );
};
