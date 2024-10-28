/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import bgimage from "../../../assets/Images/bgsection.jpeg";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "../../../Config";

import { useWishlist } from "../../Hooks/useWishlist";
import { useCart } from "../../Hooks/useCart";
import { toast } from "react-toastify";

function Crausal({ heading = "Best selling" }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { handleAddToWishlist } = useWishlist();
  const [quickview, setQuickview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch product data from API
    axios
      .get(Baseurl + "/api/v1/Product/products")
      .then((response) => {
        // Filter products where isApproved is true
        const approvedProducts = response.data.data.filter(
          (product) => product.IsApproved
        );
        setProducts(approvedProducts); // Update the state with approved products only
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const toggleQuickview = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${Baseurl}/api/v1/Product/product?id=${productId}`
      );
      const data = await response.json();
      if (data.success) {
        setSelectedProduct(data.product);
        setQuickview(true);
      } else {
        toast.error("Failed to fetch product details.");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  };
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 578,
        settings: {
          slidesToScroll: 4,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };

  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Return an empty string if text is undefined or null
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url('${bgimage}')` }}
      ></div>
      <section className="sm:container   md:container lg:container mx-4   sm:mx-auto py-8 ">
        <h1 className="text-3xl font-semibold text-center text-green-900">
          {heading}
        </h1>
        <p className="text-center text-gray-700 mt-4">
          From fashion-forward accessories to personalized home decor, the DIY
          possibilities are endless with Dritz cover buttons.
        </p>
        <div className="flex flex-wrap justify-between items-center  ">
          <div className="flex flex-wrap w-full overflow-hidden mb-[-24px]">
            <div className="gi-new-prod-section w-full">
              <div className="gi-products">
                <div
                  className="section-title mb-[20px] relative flex justify-between  z-[5] max-[767px]:flex-col"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="200"
                >
                  <div className="section-detail">
                    <h2 className="gi-title mb-[0] text-[25px] font-semibold text-AFPPrimary relative inline  sm:p-0 md:p-0 lg:p-0 xl:p-0 capitalize leading-[1]  font-manrope max-[991px]:text-[25px] max-[767px]:text-[25px] max-[575px]:text-[25px] text-center">
                      <span className=""></span>
                    </h2>
                  </div>
                 
                </div>
                <div
                  className="gi-new-block"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  data-aos-delay="300"
                >
                  <Slider
                    {...settings}
                    className="new-product-carousel owl-carousel gi-product-slider"
                  >
                    {products.map((item, index) => (
                      <div
                        key={index}
                        className="gi-product-content h-full pb-[24px] px-[12px] flex max-[575px]:w-full max-[575px]:m-auto "
                      >
                        <div className="gi-product-inner transition-all duration-[0.3s] ease-in-out cursor-pointer flex flex-col overflow-hidden border-[1px]  bg-white  border-solid border-[#eee] rounded-[5px]">
                          <div className="gi-pro-image-outer transition-all duration-[0.3s] delay-[0s] ease z-[11] relative">
                            <div className="gi-pro-image overflow-hidden">
                              <Link
                                to={`/Productdetails/${item._id}`}
                                className="image relative block overflow-hidden max-h-72"
                              >
                                <span className="label veg max-[991px]:hidden">
                                  <span className="dot"></span>
                                </span>
                                <img
                                  className="main-image  max-w-full transition-all duration-[0.3s] ease delay-[0s]"
                                  src={item.image}
                                  alt="Product"
                                />
                                <img
                                  className="hover-image absolute top-0 left-0 w-full transition-all duration-[0.3s] ease delay-[0s]"
                                  src={item.image}
                                  alt="Product"
                                />
                              </Link>
                              <span className="flags flex flex-col p-[0] uppercase absolute top-[10px] right-[10px] z-[2]">
                                <span className="sale px-[10px] py-[5px] text-[11px] font-medium leading-[12px] text-left uppercase flex items-center bg-[#5caf90] text-[#fff] tracking-[0.5px] relative rounded-[5px]">
                                  -{item.discount}%
                                </span>
                              </span>
                              <div className="gi-pro-actions transition-all duration-[0.3s] ease-in-out absolute z-[9] left-[0] right-[0] bottom-[-10px] max-[991px]:opacity-[1] max-[991px]:bottom-[10px] flex flex-row items-center justify-center my-[0] mx-auto opacity-0">
                                <Link
                                  className="gi-btn-group wishlist transition-all duration-[0.3s] ease-in-out h-[30px] w-[30px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px]"
                                  title="Wishlist"
                                  onClick={() => handleAddToWishlist(item._id)}
                                >
                                  <i className="fi-rr-heart transition-all duration-[0.3s] ease-in-out text-[#777] leading-[10px]"></i>
                                </Link>
                                <Link
                                  to="#"
                                  className="gi-btn-group quickview transition-all duration-[0.3s] ease-in-out h-[30px] w-[30px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] modal-toggle"
                                  onClick={() => toggleQuickview(item._id)}
                                  disabled={loading}
                                >
                                  <i className="fi-rr-eye transition-all duration-[0.3s] ease-in-out text-[#777] leading-[10px]"></i>
                                </Link>

                                <Link
                                  to="#"
                                  title="Add To Cart"
                                  className="gi-btn-group add-to-cart transition-all duration-[0.3s] ease-in-out h-[30px] w-[30px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px]"
                                >
                                  <IoCartOutline
                                    className="fi-rr-shopping-basket transition-all duration-[0.3s] ease-in-out text-[#777] leading-[10px] text-xl"
                                    onClick={() => addToCart(item._id)}
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="gi-pro-content h-full p-[20px] relative z-[10] flex flex-col  border-t-[1px] border-solid border-[#eee] text-center">
                            
                            <h5 className="gi-pro-title h-full mb-[10px] text-[16px] text-center">
                              <Link
                                to={`/Productdetails/${item._id}`}
                                className="block text-[14px] leading-[22px] text-truncatewebsite font-normal text-[#4b5966] tracking-[0.85px] capitalize font-Poppins hover:text-[#FF9343]"
                              >
                                {truncateText(item.title, 20)}
                              </Link>
                            </h5>
                            <div className="gi-pro-rat-price mt-[5px] mb-[0] flex flex-col">
                             
                              <span className="gi-price text-center">
                                <span className="new-price text-[#4b5966] font-bold text-[18px] mr-[7px] ">
                                  ₹{item.price}
                                </span>
                                <span className="old-price text-[14px] text-[#777] line-through">
                                  ₹{item.cutPrice}
                                </span>
                              </span>
                              <button
                                className="block mx-auto mt-4 px-4 py-2  bg-[#FF9343] text-white rounded  hover:bg-[#fff] hover:text-[#FF9343]  border-[1px] hover:border-[#FF9343]"
                                onClick={() => addToCart(item._id)}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {quickview && (
        <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
          <div className="gi-modal-overlay w-full h-screen  fixed top-0 left-0 z-[30] bg-[#000000b3]"></div>
          <div className="modal gi-modal max-[575px]:w-full fixed top-[50%] left-[50%] z-[30] max-[767px]:w-full  max-[767px]:max-h-full max-[767px]:overflow-y-auto">
            <div className="modal-dialog modal-dialog-centered h-full my-[0%] mx-auto max-w-[900px] w-[900px] max-[991px]:max-w-[650px] max-[991px]:w-[650px] max-[767px]:w-[80%] max-[767px]:h-auto max-[767px]:max-w-[80%] max-[767px]:m-[0] max-[767px]:py-[35px] max-[767px]:mx-auto max-[575px]:w-[90%] transition-transform duration-[0.3s] ease-out">
              <div className="modal-content quickview-modal p-[30px] relative bg-[#fff] rounded-[5px] max-[360px]:p-[15px]">
                <button
                  onClick={() => setQuickview(false)}
                  type="button"
                  className="gi-close-modal qty_close absolute top-[10px] right-[10px] leading-[18px] max-[420px]:top-[5px] max-[420px]:right-[5px]"
                ></button>
                <div className="modal-body mx-[-12px] max-[767px]:mx-[0]">
                  <div className="w-full flex flex-wrap ">
                    <div className="min-[768px]:w-[41.66%] px-[12px] max-[767px]:px-[0] w-full">
                      <div className="single-pro-img single-pro-img-no-sidebar h-full border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden">
                        <div className="single-product-scroll h-full">
                          <div className="single-slide h-full flex items-center zoom-image-hover">
                            <img
                              className="img-responsive h-full w-full"
                              src={selectedProduct.image}
                              alt={selectedProduct.title}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="min-[768px]:w-[58.33%] px-[12px] max-[767px]:px-[0] w-full max-[767px]:mt-[30px]">
                      <div className="quickview-pro-content">
                        <h5 className="gi-quick-title">
                          <Link
                            to="product-left-sidebar.html"
                            className="mb-[15px] block text-[#4b5966] text-[22px] leading-[1.5] font-medium max-[991px]:text-[20px]"
                          >
                            {selectedProduct.title}
                          </Link>
                        </h5>
                        <div className="gi-quickview-rating flex mb-[15px]">
                          <i className="gicon gi-star fill text-[14px] text-[#f27d0c] mr-[5px]"></i>
                          <i className="gicon gi-star fill text-[14px] text-[#f27d0c] mr-[5px]"></i>
                          <i className="gicon gi-star fill text-[14px] text-[#f27d0c] mr-[5px]"></i>
                          <i className="gicon gi-star fill text-[14px] text-[#f27d0c] mr-[5px]"></i>
                          <i className="gicon gi-star text-[14px] text-[#777] mr-[5px]"></i>
                        </div>
                        <div className="gi-quickview-price pt-[5px] pb-[10px] flex items-center justify-left">
                          <span className="new-price text-[#4b5966] font-bold text-[22px]">
                            ₹{selectedProduct.price}
                          </span>
                          <span className="old-price text-[18px] ml-[10px] line-through text-[#777]">
                            ₹{selectedProduct.cutPrice}
                          </span>
                        </div>
                        <div className="gi-pro-variation mt-[5px]">
                          <div className="gi-pro-variation-inner flex flex-col mb-[15px] gi-pro-variation-size gi-pro-size"></div>
                        </div>
                        <div className="gi-quickview-qty mt-[15px] inline-flex">
                          <div className="gi-quickview-cart">
                            <button
                              onClick={() => addToCart(selectedProduct._id)}
                              type="button"
                              className="gi-btn-1 ml-[15px] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center relative rounded-[5px] py-[10px] max-[767px]:py-[6px] px-[15px] max-[767px]:px-[10px] bg-orange-500 text-[#fff]  text-[15px] max-[767px]:text-[13px] tracking-[0] font-medium inline-flex items-center   hover:bg-[#fff] hover:text-[#FF9343]  border-[1px] hover:border-[#FF9343]"
                            >
                              <i className="fi-rr-shopping-basket text-[14px] leading-[0] mr-[5px]"></i>
                              Add To Cart
                            </button>
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
      )}
    </div>
  );
}

export default Crausal;
