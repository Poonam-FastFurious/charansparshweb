import { useState } from "react";
import Uselasidemenu from "./Uselasidemenu";
import axios from "axios";
import { FiKey } from "react-icons/fi";
import { Baseurl } from "../../Config";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

function UserChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        Baseurl + "/api/v1/user/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess("Password changed successfully!");
        // Clear the password fields after success
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // This will display "Invalid old password"
      } else {
        setError(
          error.response?.data?.message ||
            "An error occurred while changing the password."
        );
      }
    }
  };

  return (
    <>
      <section className="relative">
        <div className="md:container container relative"></div>

        <div className="container relative md:mt-4 my-8">
          <div className="md:flex">
            <Uselasidemenu />

            <div className="lg:w-3/4 md:w-2/3 md:px-3 md:mt-0">
              <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                  <div>
                    <h5 className="text-lg font-semibold mb-4">
                      Change password:
                    </h5>
                    <form onSubmit={handleChangePassword}>
                      <div className="grid grid-cols-1 gap-5">
                        <div>
                          <label className="form-label font-medium">
                            Old password:
                          </label>
                          <div className="form-icon relative mt-2">
                            <i className="w-4 h-4 absolute top-3 start-4">
                              <FiKey />
                            </i>
                            <input
                              type={showOldPassword ? "text" : "password"}
                              className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                              placeholder="Old password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              required
                            />{" "}
                            <span
                              onClick={toggleShowOldPassword}
                              className="absolute top-3 end-4 cursor-pointer text-xl"
                            >
                              {showOldPassword ? (
                                <IoEyeOffSharp />
                              ) : (
                                <IoEyeSharp />
                              )}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="form-label font-medium">
                            New password:
                          </label>
                          <div className="form-icon relative mt-2">
                            <i
                              data-feather="key"
                              className="w-4 h-4 absolute top-3 start-4"
                            >
                              <FiKey />
                            </i>
                            <input
                              type={showNewPassword ? "text" : "password"}
                              className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                              placeholder="New password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                            <span
                              onClick={toggleShowNewPassword}
                              className="absolute top-3 end-4 cursor-pointer text-xl"
                            >
                              {showNewPassword ? (
                                <IoEyeOffSharp />
                              ) : (
                                <IoEyeSharp />
                              )}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="form-label font-medium">
                           Confirm password:
                          </label>
                          <div className="form-icon relative mt-2">
                            <i className="w-4 h-4 absolute top-3 start-4">
                              <FiKey />
                            </i>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                              placeholder="Confirm password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              required
                            />
                            <span
                              onClick={toggleShowConfirmPassword}
                              className="absolute top-3 end-4 cursor-pointer text-xl"
                            >
                              {showConfirmPassword ? (
                                <IoEyeOffSharp />
                              ) : (
                                <IoEyeSharp />
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {error && <p className="text-red-500 mt-3">{error}</p>}
                      {success && (
                        <p className="text-green-500 mt-3">{success}</p>
                      )}

                      <button
                        type="submit"
                        className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-[#FF9343] hover:bg-white hover:text-orange-400 hover:border hover:border-orange-100 text-white rounded-md mt-5"
                      >
                        Save password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserChangePassword;
