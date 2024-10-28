/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-solid border-gray-300 mb-6 p-4 rounded-md">
      <button
        className="w-full text-left flex items-center justify-between text-lg font-semibold text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg
          className={`w-3 h-3 transform transition-transform Rs{
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const CheckOut = () => {
  return (
    <>
      <section className="gi-checkout-section py-10 text-sm max-md:py-8 ">
        <h2 className="hidden">Checkout Page</h2>
        <div className="flex flex-wrap justify-between items-center mx-auto relative max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="gi-checkout-rightside min-[992px]:w-[50%]  w-full">
              <AccordionItem title="Product summary">
                <div className="gi-checkout-summary">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-left text-gray-500 text-sm leading-6">
                      Sub-Total
                    </span>
                    <span className="text-right text-gray-700 text-base leading-6 font-medium">
                      Rs80.00
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-left text-gray-500 text-sm leading-6">
                      Delivery Charges
                    </span>
                    <span className="text-right text-gray-700 text-base leading-6 font-medium">
                      Rs80.00
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-left text-gray-500 text-sm leading-6">
                      Coupon Discount
                    </span>
                    <span className="text-right text-gray-700 text-base leading-6 font-medium">
                      <Link className="gi-checkout-coupan text-green-500 text-sm font-medium">
                        Apply Coupon
                      </Link>
                    </span>
                  </div>

                  <div className="gi-checkout-coupan-content flex justify-between items-center mb-2.5">
                    <form
                      className="gi-checkout-coupan-form flex border border-solid border-gray-300 p-1.5 rounded-md"
                      name="gi-checkout-coupan-form"
                      method="post"
                      action="#"
                    >
                      <input
                        className="gi-coupan inline-block align-top leading-[35px] h-[35px] w-full text-gray-500 text-sm border-0 bg-transparent text-left pl-2.5 pr-2.5 rounded-md outline-none"
                        type="text"
                        required
                        placeholder="Enter Your Coupon Code"
                        name="gi-coupan"
                        value=""
                      />
                      <button
                        type="submit"
                        className="gi-coupan-btn gi-btn-2 text-base text-center px-3.5 transition-all duration-300 ease-in-out font-medium bg-green-500 text-white rounded-md hover:bg-gray-700 hover:text-white"
                        name="subscribe"
                        value=""
                      >
                        Apply
                      </button>
                    </form>
                  </div>

                  <div className="gi-checkout-summary-total border-t border-solid border-gray-300 pt-4.5 mb-0 mt-4 flex justify-between items-center">
                    <span className="text-left text-base font-semibold text-gray-700 tracking-normal font-manrope">
                      Total Amount
                    </span>
                    <span className="text-right text-base font-semibold text-gray-700 font-manrope">
                      Rs80.00
                    </span>
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem title="Delivery Method">
                <div className="gi-checkout-del">
                  <div className="gi-del-desc text-gray-500 text-sm font-light leading-6 mb-3.5">
                    Please select the preferred shipping method to use on this
                    order.
                  </div>
                  <form action="#">
                    <span className="gi-del-option flex">
                      <span className="w-1/2">
                        <span className="gi-del-opt-head text-gray-700 text-base font-medium leading-none tracking-normal mb-2.5 block">
                          Free Shipping
                        </span>
                        <input
                          type="radio"
                          id="del1"
                          name="radio-group"
                          defaultChecked
                        />
                        <label
                          htmlFor="del1"
                          className="relative pl-6 cursor-pointer leading-4 inline-block text-gray-500 tracking-normal mb-3.5"
                        >
                          Rate - Rs0.00
                        </label>
                      </span>
                      <span className="w-1/2">
                        <span className="gi-del-opt-head text-gray-700 text-base font-medium leading-none tracking-normal mb-2.5 block">
                          Flat Rate
                        </span>
                        <input type="radio" id="del2" name="radio-group" />
                        <label
                          htmlFor="del2"
                          className="relative pl-6 cursor-pointer leading-4 inline-block text-gray-500 tracking-normal mb-3.5"
                        >
                          Rate - Rs5.00
                        </label>
                      </span>
                    </span>
                    <span className="gi-del-commemt block mt-3">
                      <span className="gi-del-opt-head mb-2 text-gray-700 text-base font-medium leading-none tracking-normal block">
                        Add Comments About Your Order
                      </span>
                      <textarea
                        name="your-commemt"
                        placeholder="Comments"
                        className="bg-transparent border border-solid border-gray-300 text-gray-700 h-[100px] py-2.5 px-3.5 mb-0 w-full outline-none text-sm block rounded-md"
                      ></textarea>
                    </span>
                  </form>
                </div>
              </AccordionItem>
              <AccordionItem title="Delivery Address">
                <div className="gi-checkout-del">
                  <div className="gi-del-desc text-gray-500 text-sm font-light leading-6 mb-3.5">
                    Please select the preferred shipping method to use on this
                    order.
                  </div>
                  <form action="#">
                    <span className="gi-del-option ">
                      <span className="w-1/2">
                        <span className="gi-del-opt-head text-gray-700 text-base font-medium leading-none tracking-normal mb-2.5 block">
                          Home Address
                        </span>
                        <input
                          type="radio"
                          id="Address"
                          name="radio-group-address"
                        />
                        <label
                          htmlFor="Address"
                          className="relative pl-6 cursor-pointer leading-4 inline-block text-gray-500 tracking-normal mb-3.5"
                        >
                          noida secto 62
                        </label>
                      </span>
                      <span className="w-1/2">
                        <span className="gi-del-opt-head text-gray-700 text-base font-medium leading-none tracking-normal mb-2.5 block">
                          Office address
                        </span>
                        <input
                          type="radio"
                          id="adress2"
                          name="radio-group-address"
                        />
                        <label
                          htmlFor="adress2"
                          className="relative pl-6 cursor-pointer leading-4 inline-block text-gray-500 tracking-normal mb-3.5"
                        >
                          noida secto 62
                        </label>
                      </span>
                    </span>
                  </form>
                </div>
              </AccordionItem>
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full  ml-4  ">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 ">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Price Details
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Price(6Items)
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        Rs7,592.00
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        -Rs299.00
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        Rs99
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        Rs799
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total Payable
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      Rs8,191.00
                    </dd>
                  </dl>
                </div>

                <button className="flex w-full items-center justify-center rounded bg-[#FA8232] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#FA8232] focus:outline-none focus:ring-4  ">
                  Place Order
                </button>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    or
                  </span>
                  <Link
                    href="#"
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOut;
