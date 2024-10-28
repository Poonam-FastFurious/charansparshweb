import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Baseurl } from "../../Config";


function Cart() {
  const [cart, setCart] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation
 

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(Baseurl + "/api/v1/cart/product", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch cart");
        }

        const data = await response.json();
        const updatedCartItems = data.cart.items.map((item) => ({
          ...item,
          product: {
            ...item.product,
            price: item.price,
          },
        }));
        const updatedCart = {
          ...data.cart,
          items: updatedCartItems,
        };
        setCart(updatedCart);
      } catch (err) {
        console.log(err);
      } finally {
        // Set loading to false whether fetch succeeded or failed
      }
    };
    const fetchCoupons = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/coupon/coupons");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch coupons");
        }

        const data = await response.json();
        setCoupons(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
    fetchCoupons();
  }, []);

  const incrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const updatedItems = updatedCart.items.map((item) => {
        if (item.product._id === productId) {
          const updatedQuantity = item.quantity + 1;
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });

      const updatedSubtotal = updatedItems.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      );

      return {
        ...updatedCart,
        items: updatedItems,
        total: updatedSubtotal,
      };
    });
  };
  const decrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const updatedItems = updatedCart.items.map((item) => {
        if (item.product._id === productId) {
          const updatedQuantity = Math.max(item.quantity - 1, 1); // Ensure quantity doesn't go below 0
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });

      const updatedSubtotal = updatedItems.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      );

      return {
        ...updatedCart,
        items: updatedItems,
        total: updatedSubtotal,
      };
    });
  };

  const removeProduct = async (productId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(Baseurl + "/api/v1/cart/removeproduct", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove product");
      }

      setCart((prevCart) => {
        const updatedItems = prevCart.items.filter(
          (item) => item.product._id !== productId
        );

        const updatedSubtotal = updatedItems.reduce(
          (total, item) => total + item.quantity * item.product.price,
          0
        );

        return {
          ...prevCart,
          items: updatedItems,
          total: updatedSubtotal,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = () => {
    const totalAfterDiscount = getTotalWithDiscount();
    localStorage.setItem("cartProducts", JSON.stringify(cart.items));
    localStorage.setItem("cartTotal", totalAfterDiscount);
    navigate("/checkout");
  };
  const handleApplyCoupon = () => {
    const coupon = coupons.find((coupon) => coupon.code === couponCode);

    if (coupon) {
      if (coupon.status === "active") {
        setDiscount(coupon.discount);
        localStorage.setItem("couponDiscount", coupon.discount); // Store discount
        setCouponError("");
      } else {
        setDiscount(0);
        setCouponError("Coupon code has expired");
      }
    } else {
      setDiscount(0);
      setCouponError("Invalid coupon code");
    }
  };

  const getTotalWithDiscount = () => {
    if (cart) {
      const totalAfterDiscount = cart.total - (cart.total * discount) / 100;
      return totalAfterDiscount.toFixed(2);
    }
    return 0;
  };
  
  return (
    <>
      <div className=" pt-12  container">
        <ul className="flex items-center  space-x-4">
          <li className="text-Black text-lg font-bold cursor-pointer">
            <Link to="/"> Home</Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-black w-3.5 -rotate-90"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                clipRule="evenodd"
                data-original="#000000"
              ></path>
            </svg>
          </li>
          <li className="text-gray-400 text-lg font-bold cursor-pointer">
            Your Cart
          </li>
        </ul>
      </div>

      <div className="  container min-h-screen ">
        <div className="grid lg:grid-cols-3 gap-4 max-lg:max-w-3xl mx-auto">
          <div className="lg:col-span-2 bg-white  divide-gray-300 px-4 ">
            {cart &&
              cart.items.map((item, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-4 items-center gap-4 py-4"
                >
                  <div className="col-span-2 flex items-center gap-6">
                    <Link
                      to={`/Productdetails/${item.product._id}`}
                      className="w-28 h-28 shrink-0"
                    >
                      <img
                        src={item.product.image}
                        className="w-full h-full object-contain"
                      />
                    </Link>

                    <div>
                      <h3 className="   font-semibold text-gray-800 ">
                        {item.product.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrementQuantity(item.product._id)}
                      type="button"
                      className="flex items-center justify-center w-5 h-5 bg-[#FA8232] outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 124 124"
                      >
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                    <span className="font-bold text-sm leading-[18px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.product._id)}
                      type="button"
                      className="flex items-center justify-center w-5 h-5 bg-[#FA8232] outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 42 42"
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center">
                    <h4 className="text-base font-bold text-gray-800">
                      ₹{item.product.price}
                    </h4>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 ml-auto"
                      viewBox="0 0 320.591 320.591"
                      onClick={() => removeProduct(item.product._id)}
                    >
                      <path
                        d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
              ))}
          </div>

          <div className="p-6 lg:sticky top-0">
            <ul className="text-gray-800 divide-y divide-gray-300">
              <li className="flex flex-wrap gap-4 text-sm pb-4 font-semibold">
                Subtotal
                <span className="ml-auto">{cart ? cart.total : "0.00"}</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm py-4 font-semibold">
                Shipping <span className="ml-auto">0</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm py-4 font-semibold">
                Coupon <span className="ml-auto">{discount}%</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm pt-4 font-bold">
                Total <span className="ml-auto">₹{getTotalWithDiscount()}</span>
              </li>
            </ul>
            <div className="subcribe-form mt-6">
              <h3 className="text-base font-bold text-gray-800">
                Apply promo code
              </h3>
              <form className="relative max-w-xl mt-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  id="subcribe"
                  name="email"
                  className="w-full h-[50px] outline-none text-black  rounded-full bg-white  shadow "
                  placeholder="Promo code"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-orange-400 text-white rounded-full"
                >
                  Redeem
                </button>
              </form>
            </div>
            {couponError && (
              <p className="mt-2 text-sm text-red-600">{couponError}</p>
            )}

            <button
              type="button"
              className="mt-8 max-w-md text-sm px-6 py-3 w-full  bg-orange-400 hover:bg-[#FF9343] text-white font-semibold tracking-wide rounded-lg"
              onClick={handleCheckout}
            >
              <Link to="/CheckOut"> Proceed to Checkout &rarr;</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
