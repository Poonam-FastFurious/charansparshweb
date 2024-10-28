import axios from "axios";

import { Baseurl } from "../../Config";
import { Link } from "react-router-dom";
import { FiAirplay } from "react-icons/fi";
import { FaCreditCard, FaRegAddressCard } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiSignOutLight } from "react-icons/pi";
import { GoListOrdered } from "react-icons/go";
import { TbJewishStar } from "react-icons/tb";
function Uselasidemenu() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userid");

        if (!accessToken || !userId) {
          throw new Error("User information not found in local storage.");
        }

        const response = await axios.get(
          Baseurl + "/api/v1/user/current-user",
          {
            params: { id: userId },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setUser(response.data.data);
        } else {
          console.error("Failed to fetch user data:", response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.patch(
        Baseurl + "/api/v1/user/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Update the avatar in the state
        setAvatar(URL.createObjectURL(file));
        console.log("Avatar updated successfully");
      } else {
        console.error("Failed to upload avatar", response);
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };
  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userid");

      if (!accessToken || !userId) {
        throw new Error("User information not found in local storage.");
      }

      const response = await axios.post(
        Baseurl + "/api/v1/user/logout",
        { id: userId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userid");
        localStorage.removeItem("user"); // Remove user info if stored
        localStorage.removeItem("refreshToken");

        document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        window.location.href = "/login";
      } else {
        console.error("Failed to log out:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };
  const activeStyle = {
    backgroundColor: "#3498db", // Active background color
    color: "white", // Active text color
  };

  const inactiveStyle = {
    color: "#6b7280", // Inactive text color
  };
  return (
    <>
      <div className="lg:w-1/4 md:w-1/3 md:px-3">
        <div className="relative ">
          <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
            <div className="profile-pic text-center mb-5">
              <input
                id="pro-img"
                name="profile-image"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div>
                <div className="relative h-28 w-28 mx-auto">
                  <img
                    src={
                      avatar ||
                      user?.avatar ||
                      "https://shreethemes.in/cartzio/layouts/assets/images/client/16.jpg"
                    }
                    className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                    id="profile-image"
                    alt=""
                  />
                  <label
                    className="absolute inset-0 cursor-pointer"
                    htmlFor="pro-img"
                  ></label>
                </div>

                <div className="mt-4">
                  <h5 className="text-lg font-semibold">
                    {user?.fullName || "user Name"}
                  </h5>
                  <p className="text-slate-400">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 ">
              <ul className="list-none sidebar-nav mb-0 pb-0" id="navmenu-nav">
                <li
                  className={`"navbar-item account-menu ${
                    activeMenu === "Dashboard" ? activeStyle : inactiveStyle
                  }`}
                >
                  <Link
                    to="/Dashboard"
                    onClick={() => handleMenuClick("Dashboard")}
                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                  >
                    <span className="me-2 mb-0">
                      <FiAirplay className="size-4" />
                    </span>
                    <h6 className="mb-0 font-medium">Dashboard</h6>
                  </Link>
                </li>

                <li className="navbar-item account-menu">
                  <Link
                    to="/Order-History"
                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                  >
                    <span className="me-2 mb-0">
                      <i data-feather="edit" className="size-4">
                        <GoListOrdered />
                      </i>
                    </span>
                    <h6 className="mb-0 font-medium">My Order </h6>
                  </Link>
                </li>

                <li className="navbar-item account-menu">
                  <Link
                    to="/Cart"
                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                  >
                    <span className="me-2 mb-0">
                      <i d className="size-4">
                        <FaCreditCard />
                      </i>
                    </span>
                    <h6 className="mb-0 font-medium">My Cart</h6>
                  </Link>
                </li>

                <li className="navbar-item account-menu">
                  <Link
                    to="/Wishlist"
                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                  >
                    <span className="me-2 mb-0">
                      <i data-feather="file-text" className="size-4">
                        <TbJewishStar />
                      </i>
                    </span>
                    <h6 className="mb-0 font-medium">Wishlist</h6>
                  </Link>
                </li>

                <li className="navbar-item account-menu">
                  <Link
                    to="/Address"
                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                  >
                    <span className="me-2 mb-0">
                      <i data-feather="share-2" className="size-4">
                        <FaRegAddressCard />
                      </i>
                    </span>
                    <h6 className="mb-0 font-medium">Address</h6>
                  </Link>
                </li>

                <li className="navbar-item account-menu">
                  <Link
                    to="/Change-Password"
                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                  >
                    <span className="me-2 mb-0">
                      <i data-feather="bell" className="size-4">
                        <RiLockPasswordLine />
                      </i>
                    </span>
                    <h6 className="mb-0 font-medium">Change Password</h6>
                  </Link>
                </li>

                <li className="navbar-item account-menu">
                  <Link
                    to="/profile"
                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                  >
                    <span className="me-2 mb-0">
                      <i data-feather="settings" className="size-4">
                        <IoSettingsOutline />
                      </i>
                    </span>
                    <h6 className="mb-0 font-medium">Settings</h6>
                  </Link>
                </li>

                <li className="navbar-item account-menu">
                  <button
                    onClick={handleLogout}
                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                  >
                    <span className="me-2 mb-0">
                      <i data-feather="log-out" className="size-4">
                        <PiSignOutLight />
                      </i>
                    </span>
                    <h6 className="mb-0 font-medium">Sign Out</h6>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Uselasidemenu;
