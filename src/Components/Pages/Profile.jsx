import { useState } from "react";
import { FaRegBookmark, FaRegUserCircle, FaUserCheck } from "react-icons/fa";
import Uselasidemenu from "./Uselasidemenu";
import { IoMdMail } from "react-icons/io";
import axios from "axios";
import { Baseurl } from "../../Config";
import Swal from "sweetalert2";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.patch(
        Baseurl + "/api/v1/user/update-account",
        {
          fullName: formData.fullName,
          userName: formData.userName,
          email: formData.email,
          mobile: formData.mobile,
          dob: formData.dob,
          gender: formData.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Account updated successfully:", response.data);

      // Clear form after successful submission
      setFormData({
        fullName: "",
        userName: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "",
      });

      // Display success alert message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Account updated successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.error(
        "Error updating account:",
        error.response?.data || error.message
      );
      // Display error alert message
      alert("Failed to update account. Please try again.");
    }
  };

  return (
    <>
      <section >
       

        <div className="container relative md:mt-4 my-16">
          <div className="md:flex">
            <Uselasidemenu />

            <div className="lg:w-3/4 md:w-2/3 md:px-3  my-4">
              <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                <h5 className="text-lg font-semibold mb-4">
                  Personal Detail :
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                      <label className="form-label font-medium">
                        Full Name : <span className="text-red-600">*</span>
                      </label>
                      <div className="form-icon relative mt-2">
                        <FaRegUserCircle className="w-4 h-4 absolute top-3 start-4" />
                        <input
                          type="text"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Full Name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-medium">
                        User Name : <span className="text-red-600">*</span>
                      </label>
                      <div className="form-icon relative mt-2">
                        <FaUserCheck className="w-4 h-4 absolute top-3 start-4" />
                        <input
                          type="text"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="User Name"
                          name="userName"
                          value={formData.userName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-medium">
                        Your Email : <span className="text-red-600">*</span>
                      </label>
                      <div className="form-icon relative mt-2">
                        <IoMdMail className="w-4 h-4 absolute top-3 start-4" />
                        <input
                          type="email"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-medium">Mobile :</label>
                      <div className="form-icon relative mt-2">
                        <FaRegBookmark className="w-4 h-4 absolute top-3 start-4" />
                        <input
                          type="number"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Ensure the value is positive and within 10 digits
                            if (value >= 0 && value.length <= 10) {
                              handleChange(e);
                            }
                          }}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-medium">DOB :</label>
                      <div className="form-icon relative mt-2">
                        <FaRegBookmark className="w-4 h-4 absolute top-3 start-4" />
                        <input
                          type="date"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="DOB"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-medium">Gender :</label>
                      <div className="form-icon relative mt-2">
                        <FaRegBookmark className="w-4 h-4 absolute top-3 start-4" />
                        <select
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="submit"
                    className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-[#FF9343] text-white rounded-md mt-5"
                    value="Save Changes"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
