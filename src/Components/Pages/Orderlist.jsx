import { useEffect, useState } from "react";
import Uselasidemenu from "./Uselasidemenu";
import axios from "axios";
import { Baseurl } from "../../Config";
import { Link } from "react-router-dom";
function Orderlist() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Number of orders per page
  const [totalOrders, setTotalOrders] = useState(0);

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
        setTotalOrders(userOrders.length);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Calculate current orders based on pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  return (
    <>
      <section className="relative">
        <div className="md:container container relative"></div>
        <div className="container relative md:mt-4 mt-16">
          <div className="md:flex">
            <Uselasidemenu />

            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
              <h5 className="text-lg font-semibold my-6">My Orders</h5>
              <div className="relative overflow-x-auto shadow dark:shadow-gray-800 rounded-md">
                <table className="w-full text-start text-slate-500 dark:text-slate-400">
                  <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-800">
                    <tr className="text-start">
                      <th scope="col" className="px-2 py-3 text-start">
                        Order no.
                      </th>
                      <th scope="col" className="px-2 py-3 text-start">
                        Date
                      </th>
                      <th scope="col" className="px-2 py-3 text-start">
                        Status
                      </th>
                      <th scope="col" className="px-2 py-3 text-start">
                        Total
                      </th>
                      <th scope="col" className="px-2 py-3 text-start">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.length > 0 ? (
                      currentOrders.map((order, index) => (
                        <tr
                          key={index}
                          className="bg-white dark:bg-slate-900 text-start border-t border-gray-100 dark:border-gray-700"
                        >
                          <th className="px-2 py-3 text-start" scope="row">
                            {order.orderID}
                          </th>
                          <td className="px-2 py-3 text-start">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td
                            className={`px-2 py-3 text-start ${
                              order.status === "Delivered"
                                ? "text-green-600"
                                : order.status === "Canceled"
                                ? "text-red-600"
                                : "text-slate-400"
                            }`}
                          >
                            {order.status}
                          </td>
                          <td className="px-2 py-3 text-start">
                            ₹ {order.totalAmount}{" "}
                          </td>
                          <td className=" py-3 text-start">
                            <Link to={`/orderDetails/${order._id}`} className="text-orange-500">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-2 py-3 text-center">
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between my-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2  bg-orange-500 text-white rounded-md"
                >
                  Previous
                </button>
                <div>
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2  bg-orange-500 text-white rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Orderlist;
