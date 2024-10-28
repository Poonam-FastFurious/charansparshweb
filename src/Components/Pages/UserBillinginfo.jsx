import { FiMapPin } from "react-icons/fi";
import Uselasidemenu from "./Uselasidemenu";
import { MdOutlineLocalPhone } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Baseurl } from "../../Config";
import Swal from "sweetalert2";
function UserBillinginfo() {
  const [isaddaddressvisible, setIsaddaddressvisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const userId = localStorage.getItem("userid");
  const accessToken = localStorage.getItem("accessToken");
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "INDIA",
    addressType: "office",
  });
  const handleAddAddressClick = () => {
    setIsaddaddressvisible(!isaddaddressvisible);
    if (!isaddaddressvisible) {
      setIsEditing(false); // Reset editing mode
      setFormData({
        fullName: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "INDIA",
        addressType: "office",
      });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `${Baseurl}/api/v1/adress/update?addressId=${currentAddressId}`
      : `${Baseurl}/api/v1/adress/add`;

    const method = isEditing ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...formData, userId }),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success(
          isEditing
            ? "Address updated successfully!"
            : "Address added successfully!"
        );
        setFormData({});
        window.location.reload();
      } else {
        toast.warn(result.message || "There was a problem saving the address.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };
  const handleEditAddress = (address) => {
    setFormData(address);
    setIsaddaddressvisible(true);
    setIsEditing(true);
    setCurrentAddressId(address._id); // Assuming the address has a unique _id
  };
  const handleDeleteAddress = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${Baseurl}/api/v1/adress/delete?id=${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          toast.success("Address deleted successfully!");
          setAddresses(addresses.filter((address) => address._id !== id));
        } else {
          toast.error("Failed to delete address.");
        }
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.error("An error occurred while deleting the address.");
      }
    }
  };

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const response = await fetch(
          `${Baseurl}/api/v1/adress?userId=${userId}`,
          {
            method: "GET", // Assuming you use POST for sending data
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch address details");
        }

        const data = await response.json();
        setAddresses(data.data); // Assuming your API response has an 'addresses' array
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };

    fetchAddressDetails();
  }, [userId, accessToken]);
  return (
    <>
      <section className="relative py-4 ">
        <div className="md:container container relative"></div>

        <div className="container relative md:mt-4 mt-16">
          <div className="md:flex">
            <Uselasidemenu />

            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
              <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                <div className="">
                  <button
                    onClick={handleAddAddressClick}
                    type="submit"
                    className="text-white inline-flex items-center w-full bg-[#FF9343] hover:bg-[#FF9343] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add address
                  </button>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
                  {addresses.map((addres, index) => (
                    <div className=" border p-4" key={index}>
                      <div className="flex items-center mb-4 justify-between">
                        <h5 className="text-xl font-medium">
                          Shipping Address:
                        </h5>
                        <div className="flex">
                          <button
                            onClick={() => handleEditAddress(addres)}
                            className="text-blue-500 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addres._id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-lg font-medium mb-2">
                          {addres.fullName}
                        </p>

                        <ul className="list-none">
                          <li className="flex">
                            <FiMapPin className="size-4 me-2 mt-1" />

                            <p className="text-slate-400">
                              {addres.streetAddress}
                              <br />
                              {addres.city} <br />
                              {addres.state} <br />
                              {addres.postalCode}
                            </p>
                          </li>

                          <li className="flex mt-1">
                            <MdOutlineLocalPhone className="size-4 me-2 mt-1" />

                            <p className="text-slate-400">
                              {addres.phoneNumber}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {isaddaddressvisible && (
              <div
                id="crud-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
              >
                <div className="relative p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow">
                  <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {isEditing ? "Edit Address" : "Add Address"}
                      </h3>
                      <button
                        type="button"
                        onClick={handleAddAddressClick}
                        className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="p-6 space-y-6">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                          <div>
                            <label
                              htmlFor="fullName"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="phoneNumber"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Phone Number
                            </label>
                            <input
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Ensure the value is positive and within 10 digits
                                if (value >= 0 && value.length <= 10) {
                                  handleChange(e);
                                }
                              }}
                              maxLength={10}
                              required
                              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="streetAddress"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Street Address
                            </label>
                            <input
                              type="text"
                              id="streetAddress"
                              name="streetAddress"
                              value={formData.streetAddress}
                              onChange={handleChange}
                              required
                              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="city"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="state"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              required
                              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="postalCode"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Postal Code
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleChange}
                              required
                              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="country"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              id="country"
                              name="country"
                              value={formData.country}
                              readOnly
                              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="addressType"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Address Type
                            </label>
                            <select
                              id="addressType"
                              name="addressType"
                              value={formData.addressType}
                              onChange={handleChange}
                              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            >
                              <option value="Home">Home</option>
                              <option value="Office">Office</option>
                              <option value="Office">Hotels</option>
                              <option value="Home">Others</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          type="submit"
                          className="text-white inline-flex items-center w-full bg-[#FF9343] hover:bg-[#FF9343] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          {isEditing ? "Update Address" : "Add Address"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserBillinginfo;
