/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";

import Slider from "react-slick";

import { Link, useParams } from "react-router-dom";
import { Baseurl } from "../../Config";
import Crausal from "../Home/Crousal/Crausal";
import { useCart } from "../Hooks/useCart";
import { useWishlist } from "../Hooks/useWishlist";
import { toast } from "react-toastify";
function ProductDetails() {
  const { id } = useParams();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [productData, setProductData] = useState(null);
  const { addToCart } = useCart();
  const { handleAddToWishlist } = useWishlist();
  const [quickview, setQuickview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`${Baseurl}/api/v1/Product/product?id=${id}`)
      .then((responce) => responce.json())
      .then((data) => setProductData(data.product));
  }, [id]);
  if (!productData) return <div>Loading...</div>; // Handle loading state

  const productCoverSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
  };

  const navThumbSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    arrows: true,
    focusOnSelect: true,
    ref: (slider) => setNav2(slider),
  };
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
  return (
    <>
      <section className="gi-single-product py-[40px] max-[767px]:py-[30px] ">
        <div className="flex flex-wrap justify-between items-center   mx-auto sm:container  md:container  pb-4">
          <div className="flex flex-wrap w-full">
            <div className="gi-pro-rightside gi-common-rightside min-[992px]:w-[100%] w-full px-[12px]">
              <div className="single-pro-block">
                <div className="single-pro-inner">
                  <div className="w-full flex flex-wrap gap-8">
                    <div className="single-pro-img single-pro-img-no-sidebar lg:w-[50%] w-full relative  max-[991px]:pl-[12px] max-[991px]:w-full max-[991px]:max-w-[500px] max-[991px]:m-auto max-[420px]:px-[0]">
                      <div className="single-product-scroll p-[15px] sticky top-[30px] rounded-[5px] border-[1px] border-solid border-[#eee]">
                        <>
                          <Slider
                            {...productCoverSettings}
                            className="single-product-cover overflow-hidden cursor-zoom-in rounded-[5px]"
                          >
                            {productData.thumbnail.map((media, index) => (
                              <div
                                className="single-slide zoom-image-hover"
                                key={index}
                              >
                                <img
                                  src={media}
                                  alt={`Product Image ${index + 1}`}
                                  className="img-responsive h-full w-full"
                                />
                              </div>
                            ))}
                            {productData.youtubeVideoLink && (
                              <div className="single-slide" key="youtube-video">
                                <iframe
                                  width="100%"
                                  height="315"
                                  src={productData.youtubeVideoLink.replace(
                                    "watch?v=",
                                    "embed/"
                                  )}
                                  title="YouTube Video"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            )}
                          </Slider>
                          <Slider
                            {...navThumbSettings}
                            className="single-nav-thumb w-full overflow-hidden"
                          >
                            {productData.thumbnail.map((media, index) => (
                              <div
                                className="single-slide px-[11px] pt-[11px]"
                                key={index}
                              >
                                <img
                                  src={media}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="img-responsive h-full w-full"
                                />
                              </div>
                            ))}
                            {productData.youtubeVideoLink && (
                              <div
                                className="single-slide px-[11px] pt-[11px]"
                                key="youtube-video-thumb"
                              >
                                <img
                                  src={`https://img.youtube.com/vi/${
                                    productData.youtubeVideoLink.split("v=")[1]
                                  }/hqdefault.jpg`}
                                  alt="YouTube Video Thumbnail"
                                  className="img-responsive h-full w-full"
                                />
                              </div>
                            )}
                          </Slider>
                        </>
                      </div>
                    </div>
                    <div className="single-pro-desc single-pro-desc-no-sidebar w-[40%]  relative pl-[12px] max-[991px]:pl-[0] max-[991px]:mt-[30px] max-[991px]:w-full">
                      <div className="single-pro-content">
                        <h5 className="gi-single-title text-[#4b5966] text-[22px] capitalize mb-[20px] block font-Poppins font-medium leading-[35px] tracking-[0.02rem] max-[1199px]:text-[20px] max-[1199px]:leading-[33px] max-[767px]:text-[18px]  max-[767px]:leading-[31px]">
                          {productData.title}
                        </h5>
                        <div className="gi-single-rating-wrap flex mb-[14px] items-center">
                          <div className="gi-single-rating pr-[15px] leading-[17px]">
                            <i className="gicon gi-star fill text-[#f27d0c] float-left text-[14px] mr-[3px]"></i>
                            <i className="gicon gi-star fill text-[#f27d0c] float-left text-[14px] mr-[3px]"></i>
                            <i className="gicon gi-star fill text-[#f27d0c] float-left text-[14px] mr-[3px]"></i>
                            <i className="gicon gi-star fill text-[#f27d0c] float-left text-[14px] mr-[3px]"></i>
                            <i className="gicon gi-star-o text-[#b2b2b2] float-left text-[14px] mr-[3px]"></i>
                          </div>
                          <span className="gi-read-review text-[#999] leading-[17px]">
                            |&nbsp;&nbsp;
                            <a
                              href="#gi-spt-nav-review"
                              className="text-[#999] text-[14px] leading-[20px] hover:text-[#5caf90]"
                            >
                              992 Ratings
                            </a>
                          </span>
                        </div>
                        <div className="gi-single-price-stoke mb-[15px] pt-[15px] pb-[15px] flex justify-between">
                          <div className="gi-single-price flex flex-col">
                            <div className="final-price mb-[15px] text-[#4b5966] font-semibold text-[22px] leading-[32px] font-Poppins tracking-[0] max-[1199px]:text-[20px]">
                              ₹{productData.price}
                              <span className="price-des ml-[15px] text-[#5caf90] font-medium text-[18px] tracking-[0.02rem]">
                                -{productData.discount}%
                              </span>
                            </div>
                            <div className="mrp text-[#777]">
                              M.R.P. :
                              <span className="text-[#999] line-through">
                                ₹{productData.cutPrice}
                              </span>
                            </div>
                          </div>
                          <div className="gi-single-stoke flex flex-col">
                            <span className="gi-single-sku mb-[15px] text-[18px] leading-[32px] text-[#4b5966] font-semibold tracking-[0.02rem]">
                              SKU#:{productData.sku}
                            </span>
                            <span className="gi-single-ps-title leading-[1] text-[16px] text-[#5caf90] tracking-[0]">
                              IN STOCK
                            </span>
                          </div>
                        </div>
                        <div className="gi-single-desc mb-[12px] text-[#777] text-[14px] tracking-[0] break-all leading-[26px] font-Poppins">
                          {productData.shortDescription}
                        </div>
                        <div
                          className="gi-single-desc mb-[12px] text-[#777] text-[14px] tracking-[0] break-all leading-[26px] font-Poppins"
                          dangerouslySetInnerHTML={{
                            __html: productData.description,
                          }}
                        ></div>

                        <div className="gi-single-qty flex flex-wrap  m-[-5px] mt-8">
                          <div className="gi-single-cart">
                            <button
                              type="button"
                              className="btn btn-primary gi-btn-1 flex h-[40px] leading-[50px] text-center text-[14px] m-[5px] py-[10px] px-[15px] uppercase justify-center bg-[#FF9343] text-[#fff] transition-all duration-[0.3s] ease-in-out relative rounded-[5px] items-center min-w-[160px] font-semibold tracking-[0.02rem]  hover:bg-[#fff] hover:text-[#FF9343] border-[1px] hover:border-[#FF9343]"
                              onClick={() => addToCart(id)}
                            >
                              Add To Cart
                            </button>
                          </div>
                          <div className="gi-single-wishlist m-[5px]">
                            <a
                              className="gi-btn-group wishlist w-[40px] h-[40px] flex items-center justify-center transition-all duration-[0.3s] ease delay-[0s] text-[#17181c] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] hover:text-[#fff] hover:bg-[#FF9343] hover:border-[#FF9343]"
                              title="Wishlist"
                              onClick={() => handleAddToWishlist(id)}
                            >
                              <i className="fi-rr-heart transition-all duration-[0.3s] ease-in-out text-[#4b5966] leading-[0]"></i>
                            </a>
                          </div>
                          <div
                            className="gi-single-quickview m-[5px]"
                            onClick={() => toggleQuickview(id)}
                            disabled={loading}
                          >
                            <Link
                              to="#"
                              className="gi-btn-group quickview w-[40px] h-[40px] flex items-center justify-center transition-all duration-[0.3s] ease delay-[0s] text-[#17181c] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] hover:text-[#fff] hover:bg-[#FF9343] hover:border-[#FF9343] modal-toggle"
                            >
                              <i className="fi-rr-eye transition-all duration-[0.3s] ease-in-out text-[#4b5966] leading-[0]"></i>
                            </Link>
                          </div>
                          {productData._id === "6703acce0be2808e0039cec3" && (
                            <Link
                              to="https://charansparsh.netlify.app/basket"
                              target="_blank"
                              type="button"
                              className="btn btn-primary gi-btn-1 flex h-[40px] leading-[50px] text-center text-[14px] m-[5px] py-[10px] px-[15px] uppercase justify-center bg-[#FF9343] text-[#fff] transition-all duration-[0.3s] ease-in-out relative rounded-[5px] items-center font-semibold tracking-[0.02rem]  hover:bg-[#fff] hover:text-[#FF9343] border-[1px] hover:border-[#FF9343]"
                            >
                              View 360
                            </Link>
                          )}{" "}
                          {productData._id === "6703c7f70be2808e0039dc9f" && (
                            <Link
                              to="https://charansparsh.netlify.app/carpet"
                              target="_blank"
                              type="button"
                              className="btn btn-primary gi-btn-1 flex h-[40px] leading-[50px] text-center text-[14px] m-[5px] py-[10px] px-[15px] uppercase justify-center bg-[#FF9343] text-[#fff] transition-all duration-[0.3s] ease-in-out relative rounded-[5px] items-center font-semibold tracking-[0.02rem]  hover:bg-[#fff] hover:text-[#FF9343] border-[1px] hover:border-[#FF9343]"
                            >
                              View 360
                            </Link>
                          )}{" "}
                          {productData._id === "6703cb940be2808e0039deb2" && (
                            <Link
                              to="https://charansparsh.netlify.app/sitar"
                              target="_blank"
                              type="button"
                              className="btn btn-primary gi-btn-1 flex h-[40px] leading-[50px] text-center text-[14px] m-[5px] py-[10px] px-[15px] uppercase justify-center bg-[#FF9343] text-[#fff] transition-all duration-[0.3s] ease-in-out relative rounded-[5px] items-center font-semibold tracking-[0.02rem]  hover:bg-[#fff] hover:text-[#FF9343] border-[1px] hover:border-[#FF9343]"
                            >
                              View 360
                            </Link>
                          )}{" "}
                          {productData._id === "6703ca700be2808e0039de25" && (
                            <Link
                              to="https://charansparsh.netlify.app/footstool"
                              target="_blank"
                              type="button"
                              className="btn btn-primary gi-btn-1 flex h-[40px] leading-[50px] text-center text-[14px] m-[5px] py-[10px] px-[15px] uppercase justify-center bg-[#FF9343] text-[#fff] transition-all duration-[0.3s] ease-in-out relative rounded-[5px] items-center font-semibold tracking-[0.02rem]  hover:bg-[#fff] hover:text-[#FF9343] border-[1px] hover:border-[#FF9343]"
                            >
                              View 360
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Crausal heading="Related product" />
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
                              className="gi-btn-1 ml-[15px] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center relative rounded-[5px] py-[10px] max-[767px]:py-[6px] px-[15px] max-[767px]:px-[10px] bg-orange-500 text-[#fff] border-[0] text-[15px] max-[767px]:text-[13px] tracking-[0] font-medium inline-flex items-center  hover:text-[#fff]"
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
    </>
  );
}

export default ProductDetails;
