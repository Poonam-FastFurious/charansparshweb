import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Baseurl } from "../../Config";

function Wishlist() {
  const [wishlistData, setWishlistData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    // Retrieve accessToken from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Fetch wishlist data with authorization header
    fetch(Baseurl + "/api/v1/wishlist", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          setWishlistData(data.wishlist);
        } else {
          // Handle error or set default state
          console.error("Failed to fetch wishlist data:", data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching wishlist data:", error);
        setError("Failed to retrieve wishlist");
      });
  }, []);
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(Baseurl + "/api/v1/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Product added to cart:", data);
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => removeFromWishlist(productId),
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };
  const removeFromWishlist = (productId) => {
    // Retrieve accessToken from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Make DELETE request to remove item from wishlist
    fetch(`${Baseurl}/api/v1/wishlist/remove`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove item from wishlist");
        }
        toast.success("remove item from wishlist!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setWishlistData((prevData) => {
          const updatedItems = prevData.items.filter(
            (item) => item.productId !== productId
          );
          return { ...prevData, items: updatedItems };
        });
      })
      .catch((error) => {
        console.error("Error removing item from wishlist:", error);
        setError("Failed to remove item from wishlist");
      });
  };
  console.log(error);
  if (isLoading) {
    return <div>loadiing</div>;
  }
  return (
    <>
      <section className="gi-faq py-[40px] max-[767px]:py-[30px] gi-wishlist">
        <div className="flex flex-wrap justify-between items-center mx-auto  sm:container md:container ">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div className="gi-vendor-dashboard-card border-[1px] border-solid border-[#eee] rounded-[5px] overflow-y-auto">
                <div className="gi-vendor-card-header min-w-[700px] p-[30px] border-b-[1px] border-solid border-[#eee] flex justify-between items-center">
                  <h5 className="m-[0] text-[18px] uppercase font-bold text-[#777] tracking-[0.01rem] leading-[1.2]">
                    Wishlist
                  </h5>
                  <div className="gi-header-btn">
                    <Link
                      className="gi-btn-2 transition-all duration-[0.3s] ease-in-out py-[10px] px-[15px] text-[14px] font-medium  bg-AFPPrimary text-[#fff] text-center rounded-[5px] hover:bg-[#4b5966] hover:text-[#fff]"
                      to="/"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
                <div className="gi-vendor-card-body min-w-[700px] p-[30px]">
                  <div className="gi-vendor-card-table">
                    {wishlistData && wishlistData.items.length === 0 ? (
                      <>
                        <p>Your wishlist is empty.</p>
                        <img
                          className="h-80"
                          src="https://cdn.dribbble.com/users/1010436/screenshots/13921028/dribble_shot_62_4x.jpg"
                          alt=""
                        />
                      </>
                    ) : (
                      <div className="gi-vendor-card-table">
                        <table className="table  w-full mb-[1rem]">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="p-[0.5rem] text-left text-[#4b5966]"
                              >
                                ID
                              </th>
                              <th
                                scope="col"
                                className="p-[0.5rem] text-left text-[#4b5966]"
                              >
                                Image
                              </th>

                              <th
                                scope="col"
                                className="p-[0.5rem] text-left text-[#4b5966]"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="p-[0.5rem] text-left text-[#4b5966]"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="p-[0.5rem] text-left text-[#4b5966]"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="p-[0.5rem] text-left text-[#4b5966]"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="wish-empt border-t-[3px]  border-solid border-[#dee2e6]">
                            {wishlistData &&
                              wishlistData.items.map((item, index) => (
                                <tr key={item._id} className="pro-gl-content">
                                  <td className="p-[0.5rem] border-b-[1px] border-solid border-[#dee2e6]">
                                    <span className="max-[767px]:text-[14px] py-[14px] flex text-[#777] tracking-[0.02rem]">
                                      {index + 1}
                                    </span>
                                  </td>
                                  <td className="p-[0.5rem] border-b-[1px] border-solid border-[#dee2e6]">
                                    <Link to={`/Product/${item.productId}`}>
                                      <img
                                        className="prod-img h-[58px] w-[58px]"
                                        src={item.url}
                                        alt="product image"
                                      />
                                    </Link>
                                  </td>
                                  {/* <td className="p-[0.5rem] border-b-[1px] border-solid border-[#dee2e6]">
                                    <span className="max-[767px]:text-[14px] py-[14px] flex text-[#777] tracking-[0.02rem]">
                                      <Link to={`/Product/${item.productId}`}>
                                        {item.productName}
                                      </Link>
                                    </span>
                                  </td> */}
                                  <td className="p-[0.5rem] border-b-[1px] border-solid border-[#dee2e6]">
                                    <span className="max-[767px]:text-[14px] py-[14px] flex text-[#777] tracking-[0.02rem]">
                                      {new Date(
                                        item.addedAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </td>
                                  <td className="p-[0.5rem] border-b-[1px] border-solid border-[#dee2e6]">
                                    <span className="max-[767px]:text-[14px] py-[14px] flex text-[#777] tracking-[0.02rem]">
                                      Rs{item.price}
                                    </span>
                                  </td>
                                  <td className="p-[0.5rem] border-b-[1px] border-solid border-[#dee2e6]">
                                    <span className="max-[767px]:text-[14px] py-[14px] flex text-[#777] tracking-[0.02rem]">
                                      {item.quantity > 0 ? (
                                        <span className="text-[#5caf90]">
                                          Available
                                        </span>
                                      ) : (
                                        <span className="text-[#e9abab]">
                                          Out Of Stock
                                        </span>
                                      )}
                                    </span>
                                  </td>
                                  <td className="p-[0.5rem] border-b-[1px] border-solid border-[#dee2e6]">
                                    <span className="tbl-btn py-[14px] flex text-[#777]">
                                      <Link
                                        className="gi-btn-2 add-to-cart w-[30px] h-[30px] inline-flex items-center justify-center transition-all duration-[0.3s] ease-in-out py-[10px] px-[15px] text-[14px] font-medium  bg-orange-500 text-[#fff] text-center rounded-[5px] hover:bg-green-800 hover:text-[#fff]"
                                        to="#"
                                        title="Add To Cart"
                                        onClick={() =>
                                          addToCart(item.productId)
                                        }
                                      >
                                        <i className="fi-rr-shopping-basket leading-[10px]"></i>
                                      </Link>
                                      <button
                                        onClick={() =>
                                          removeFromWishlist(item.productId)
                                        }
                                        className="gi-btn-1 gi-remove-wish mx-[3px]  btn w-[30px] h-[30px] inline-flex items-center justify-center transition-all duration-[0.3s] ease-in-out py-[10px] px-[15px] text-[14px] font-medium  bg-red-500 text-[#fff] text-center rounded-[5px] hover:bg-red-400 hover:text-[#fff]"
                                        title="Remove From List"
                                      >
                                        ×
                                      </button>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}
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

export default Wishlist;
