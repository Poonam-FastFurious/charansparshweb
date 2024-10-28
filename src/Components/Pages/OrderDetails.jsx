import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import { Baseurl } from "../../Config";
import { toast } from "react-toastify";

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${Baseurl}/api/v1/order/singleorder/${id}`
        );
        const result = await response.json();
        if (result.success) {
          setOrder(result.data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!order) {
    return (
      <div>
       Loading....
      </div>
    );
  }
  const handleTrackOrderClick = () => {
    if (order && order.shippingInfo && order.shippingInfo.shippingLink) {
      // Proceed to track order
      window.open(`${order.shippingInfo.shippingLink}`, "_blank");
    } else {
      // Show alert if shippingLink is null
      Swal.fire({
        title: "Your order status not changed yet.",
        confirmButtonColor: "#FF9343", // This sets the background color of the OK button to red
        customClass: {
          title: 'custom-swal-title' // Add custom class for title
        }
      });
    }
  };
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(Baseurl + "/api/v1/order/updateorder", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: orderId,
          status: "Cancelled",
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating status");
      }

      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );

      toast.success("Order canceled successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Failed to cancel order", err);
    }
  };
  if (!order || !order.shippingInfo) {
    return null; // Optionally, return a placeholder or loading state here
  }

  return (
    <>
      <section className="bg-white py-8 antialiased  md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Track the delivery of order #{order.orderID}
          </h2>
         
          <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
            <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200   lg:max-w-xl xl:max-w-2xl">
              {order.products.map((productItem) => (
                <div key={productItem._id} className="space-y-4 p-6">
                  <div className="flex items-center gap-6">
                    <Link to="#" className="h-14 w-14 shrink-0">
                      <img
                        className="h-full w-full dark:hidden"
                        src={productItem.product?.image}
                        alt={productItem.product?.name}
                      />
                    </Link>

                    <Link
                      to="#"
                      className="min-w-0 flex-1 font-medium text-gray-900 hover:underline"
                    >
                      {productItem.product?.title}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-normal text-gray-500">
                      <span className="font-medium text-gray-900">
                        Product ID:
                      </span>
                      {productItem.product?._id}
                    </p>

                    <div className="flex items-center justify-end gap-4">
                      <p className="text-base font-normal text-gray-900">
                        x{productItem.quantity}
                      </p>

                      <p className="text-xl font-bold leading-tight text-gray-900">
                        ₹{productItem.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="space-y-4 bg-gray-50 p-6 ">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="font-normal text-gray-500 ">Total price</dt>
                    <dd className="font-medium text-gray-900 ">
                      ₹{order.totalAmount}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="font-normal text-gray-500 ">
                      Shipping Address:
                    </dt>
                    <dd className="font-medium text-gray-900 ">
                      {order.shippingInfo.address} <br />
                      {order.shippingInfo?.city} <br />
                      {order.shippingInfo?.state} <br />
                      {order.shippingInfo?.postalCode} <br />
                     
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                  <dt className="text-lg font-bold text-gray-900 ">Total</dt>
                  <dd className="text-lg font-bold text-gray-900 ">
                    ₹{order.totalAmount}
                  </dd>
                </dl>
              </div>
            </div>

            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm  ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Order history
                </h3>

                <ol className="relative ms-3 border-s border-gray-200 ">
                  <li className="mb-10 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white  ">
                      <svg
                        className="h-4 w-4 text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                        />
                      </svg>
                    </span>
                    <h4 className="mb-0.5 text-base font-semibold text-gray-900 ">
                      Order Placed -
                    </h4>
                    <p className="text-sm font-normal text-gray-500 ">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </li>
                  {order.orderHistory.map((history, index) => (
                    <li className="mb-10 ms-6" key={index}>
                      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white  ">
                        <svg
                          className="h-4 w-4 text-gray-500 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                          />
                        </svg>
                      </span>
                      <h4 className="mb-0.5 text-base font-semibold text-gray-900 ">
                        {history.status} -
                      </h4>
                      <p className="text-sm font-normal text-gray-500 ">
                        {new Date(history.changedAt).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </li>
                  ))}
                </ol>
                {history.status !== "Delivered" || history.status !== "Cancelled" && (<div className="gap-4 sm:flex sm:items-center">
                  <button
                    onClick={handleTrackOrderClick}
                    type="button"
                    className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                  >
                    <Link to="#" rel="noopener noreferrer">
                      Track order
                    </Link>
                  </button>
                  <Link  onClick={() => handleCancelOrder(order.orderID)}
                    to="#"
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-orange-400  px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-orange-400  hover:border hover:border-orange-300 focus:outline-none focus:ring-4 focus:ring-primary-300   sm:mt-0"
                  >
                   Cancel
                  </Link>
                </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderDetails;
