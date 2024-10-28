import { useEffect, useState } from "react";
import Uselasidemenu from "./Uselasidemenu";
import { Baseurl } from "../../Config";
import axios from "axios";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [pendingOrderCount, setPendingOrderCount] = useState([]);
  const [completeordercount, setCompleteordercount] = useState([]);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userid");
  const accessToken = localStorage.getItem("accessToken");
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    // Fetch all orders from the API
    const currentUserId = localStorage.getItem("userid");

    const fetchOrders = async () => {
      try {
        const response = await axios.get(Baseurl + "/api/v1/order/allorder");
        const allOrders = response.data.data;

        // Filter orders to only include those of the current user
        const userOrders = allOrders.filter(
          (order) => order.customer?._id === currentUserId
        );
        userOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const pendingOrders = userOrders.filter(
          (order) => order.status === "Pending"
        );
        const Completeordercount = userOrders.filter(
          (order) => order.status === "Delivered"
        );
        setOrders(userOrders);
        setPendingOrderCount(pendingOrders.length);
        setCompleteordercount(Completeordercount.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

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
      <section >
      

        <div className="container relative md:mt-4 my-8">
          <div className="md:flex">
            <Uselasidemenu />

            <div className=" w-full md:px-0 my-6 md:mt-0 ">
              <div className=" w-full  md:mt-0">
                <div className=" rounded-md  bg-white ">
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 mt-6">
                    <div className="bg-gray-100 flex justify-center items-center ">
                      <div className="bg-white p-6 rounded-lg border w-full ">
                        <div className="flex items-center mb-4 justify-between">
                          <h5 className="text-xl font-medium">Account Info</h5>
                          <a href="#" className="text-orange-500 text-lg">
                            <i data-feather="edit" className="size-4"></i>
                          </a>
                        </div>
                        <div className="flex flex-col ">
                          <img
                            src={
                              user?.avatar ||
                              "https://shreethemes.in/cartzio/layouts/assets/images/client/16.jpg"
                            }
                            alt="Profile Picture"
                            className="w-20 h-20 rounded-full mb-4"
                          />

                          <div className="">
                            <h2 className="text-lg font-semibold">
                              {user?.fullName || "user Name"}
                            </h2>
                            <p className="text-gray-600">
                              {user?.username || "user Name"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-800">
                            <strong>Email:</strong>
                            {user?.email || "user@example.com"}
                          </p>

                          <p className="text-gray-800">
                            <strong>Phone:</strong>
                            {user?.mobile || "9999999999"}
                          </p>
                        </div>

                        <div className="mt-6">
                          <button className="w-full bg-orange-400 text-white py-2 rounded">
                            <Link to="/profile"> Edit Account</Link>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className=" border p-4">
                      <div className="flex items-center mb-4 justify-between">
                        <h5 className="text-xl font-medium">
                          Shipping Address:
                        </h5>
                        <a href="#" className="text-orange-500 text-lg">
                          <i data-feather="edit" className="size-4"></i>
                        </a>
                      </div>
                      {addresses.slice(0, 1).map((add, index) => (
                        <div
                          key={index}
                          className="pt-4 border-t border-gray-100 dark:border-gray-700"
                        >
                          <p className="text-lg font-medium mb-2">
                            {add.fullName}
                          </p>

                          <ul className="list-none">
                            <li className="flex">
                              <i
                                data-feather="map-pin"
                                className="size-4 me-2 mt-1"
                              ></i>
                              <p className="text-slate-400">
                                {add.streetAddress}
                                <br />
                                {add.city} <br />
                                {add.state} <br />
                                {add.postalCode}
                              </p>
                            </li>

                            <li className="flex mt-1">
                              <i
                                data-feather="phone"
                                className="size-4 me-2 mt-1"
                              ></i>
                              <p className="text-slate-400">
                                {add.phoneNumber}
                              </p>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center items-center  border p-4">
                      <div className="w-full max-w-sm space-y-4">
                        <div className="bg-blue-50 flex items-center p-4 rounded-lg shadow">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-blue-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zM9 6h2v4H9V6zm0 6h2v2H9v-2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-2xl font-semibold">
                              {orders.length}
                            </h3>
                            <p className="text-gray-600">Total Orders</p>
                          </div>
                        </div>

                        <div className="bg-orange-50 flex items-center p-4 rounded-lg shadow">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-orange-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 10h10M3 6h10M3 14h10m7-2h1M4 18h16M2 18h1M3 18h1m0-10h1m10 0h1m-4-1h1m0 10h1m4 0h1"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-2xl font-semibold">
                              {pendingOrderCount}
                            </h3>
                            <p className="text-gray-600">Pending Orders</p>
                          </div>
                        </div>

                        <div className="bg-green-50 flex items-center p-4 rounded-lg shadow">
                          <div className="bg-green-100 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-2xl font-semibold">
                              {completeordercount}
                            </h3>
                            <p className="text-gray-600">Completed Orders</p>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default UserDashboard;
