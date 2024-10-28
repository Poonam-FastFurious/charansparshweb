import axios from "axios";
import { useEffect, useState } from "react";
import { Baseurl } from "../../Config";
import { Link, useParams } from "react-router-dom";
import audio from "../../assets/Images/gond.mp3";
import bannervideo from "../../assets/Images/bannervideo.mp4";
import { useWishlist } from "../Hooks/useWishlist";
import { useCart } from "../Hooks/useCart";
import { toast } from "react-toastify";

function Shoppage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quickview, setQuickview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { handleAddToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [sortOption, setSortOption] = useState("1"); // Default sorting option
  const { categoryName, subcategory } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch product data from API
    axios
      .get(Baseurl + "/api/v1/Product/products")
      .then((response) => {
        const allProducts = response.data.data; // Adjust based on the actual API response structure
        setProducts(allProducts);

        // Filter products based on categoryName and subcategory
        const filtered = allProducts.filter(
          (product) =>
            product.categories.toLowerCase() === categoryName.toLowerCase() &&
            (subcategory
              ? product.subcategory?.toLowerCase() === subcategory.toLowerCase()
              : true) &&
            product.IsApproved
        );
        setFilteredProducts(filtered);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [categoryName, subcategory]);
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
  const filterProducts = (products, categoryName) => {
    const filtered = products.filter(
      (product) =>
        product.categories.toLowerCase() === categoryName.toLowerCase() &&
        product.IsApproved
    );
    setFilteredProducts(sortProducts(filtered, sortOption));
  };

  const sortProducts = (products, option) => {
    switch (option) {
      case "1": // Position
        return products; // Default or specific sorting
      case "2": // Relevance
        return products; // Implement sorting logic
      case "3": // Name, A to Z
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case "4": // Name, Z to A
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case "5": // Price, low to high
        return products.sort((a, b) => a.price - b.price);
      case "6": // Price, high to low
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    filterProducts(sortProducts(filteredProducts, option));
  };
  console.log(products);

  return (
    <>
      <section className="gi-offer-section overflow-hidden py-[40px] max-[767px]:py-[30px]   ">
        <div className="flex flex-wrap justify-between items-center mx-auto  sm:container md:container">
          <div className="w-full flex flex-wrap">
            <div
              className="min-[768px]:w-[50%] w-full wow fadeInLeft"
              data-wow-duration="2s"
            >
              <div className="gi-ofr-banners ">
                <div className=" flex flex-row relative overflow-hidden ">
                  <div className=" w-full relative">
                    <video src={bannervideo} autoPlay loop></video>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="min-[768px]:w-[50%] w-full  wow fadeInRight"
              data-wow-duration="2s"
            >
              <div className="gi-ofr-banners max-[767px]:mt-[30px]  ">
                <div className="gi-bnr-body flex flex-row relative overflow-hidden">
                  <div className="gi-bnr-img w-full relative ">
                    <div alt="banner" className="w-full  h-[370px] " />
                  </div>
                  <div className="">
                    <h5 className="text-black text-[34px] font-bold leading-[1.2] capitalize mb-[6px] max-[1399px]:text-[28px] max-[1199px]:text-[22px] max-[991px]:text-[16px] max-[767px]:text-[20px] max-[420px]:text-[16px] pb-4">
                      {categoryName}
                    </h5>
                    <p className="text-black ">
                      Lorem Ipsum Dolor Sit Amet Consectetur. Eu Elementum Purus
                      Vel Amet Amet Nec Magna Tortor. Nunc At Nisl Senectus
                      Lacinia. Faucibus Tortor Et Amet Senectus Auctor Arcu Id
                      Et Tortor. Mattis Eget Mi Dignissim Etiam Justo
                      Ultricies... Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Eum dolores numquam quo repudiandae quia
                      id eligendi cum at magni fuga? Modi ab repellat, ratione
                      error qui pariatur eveniet saepe deserunt iusto vitae
                      praesentium vel atque magni sunt reprehenderit libero
                      ipsam molestiae laudantium a inventore! Quaerat.
                    </p>

                    <div className="mt-4">
                      <audio controls className="w-full text-black">
                        <source src={audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gi-shop py-[40px] max-[767px]:py-[30px]">
        <div className="flex flex-wrap justify-between items-center mx-auto  sm:container  md:container">
          <div className="flex flex-wrap w-full px-[12px]">
            <div className="gi-shop-rightside w-full">
              <div className="gi-pro-list-top flex items-center justify-between text-[14px] border-[1px] border-solid border-[#eee] rounded-[5px] mb-[30px]">
                <div className="min-[768px]:w-[50%] w-full gi-grid-list">
                  <div className="gi-gl-btn ml-[5px] flex items-center flex-row">
                    <button
                      type="button"
                      className="grid-btn btn-grid-50 h-[40px] w-[40px] border-[0] rounded-[0] flex items-center justify-center flex-row active"
                    >
                      <i className="fi fi-rr-apps text-[20px] text-[#4b5966] leading-[0]"></i>
                    </button>
                  </div>
                </div>
                <div className="min-[768px]:w-[50%] w-full gi-sort-select flex justify-end items-center">
                  <div className="gi-select-inner relative flex w-[140px] h-[50px] leading-[1.5] bg-[#fff] overflow-hidden rounded-[0] border-l-[1px] border-solid border-[#eee]">
                    <select
                      name="gi-select"
                      id="gi-select"
                      className="appearance-none outline-[0] border-[0] bg-[#fff] grow-[1] px-[10px] text-[#777] cursor-pointer"
                      value={sortOption}
                      onChange={handleSortChange}
                    >
                      <option value="1">Position</option>
                      <option value="2">Relevance</option>
                      <option value="3">Name, A to Z</option>
                      <option value="4">Name, Z to A</option>
                      <option value="5">Price, low to high</option>
                      <option value="6">Price, high to low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="shop-pro-content">
                <div className="shop-pro-inner mx-[-12px]">
                  <div className="flex flex-wrap w-full">
                    {filteredProducts.map((items, index) => (
                      <div
                        key={index}
                        className="min-[1200px]:w-[20%] min-[992px]:w-[25%] min-[768px]:w-[50%] min-[576px]:w-[50%] max-[420px]:w-full px-[12px] gi-product-box max-[575px]:w-[50%] max-[575px]:mx-auto pro-gl-content"
                      >
                        <div className="gi-product-content pb-[24px] h-full flex">
                          <div className="gi-product-inner transition-all duration-[0.3s] ease-in-out cursor-pointer flex flex-col overflow-hidden border-[1px] border-solid border-[#eee] rounded-[5px]">
                            <div className="gi-pro-image-outer transition-all duration-[0.3s] ease delay-[0s] z-[11] relative">
                              <div className="gi-pro-image overflow-hidden">
                                <Link
                                  to={`/Productdetails/${items._id}`}
                                  className="image relative block overflow-hidden pointer-events-none transition-all duration-[0.3s] ease-in-out"
                                >
                                  <img
                                    className="main-image max-w-full z-[1] transition-all duration-[0.3s] ease delay-[0s]"
                                    src={items.image}
                                    alt="Product"
                                  />
                                  <img
                                    className="hover-image absolute z-[2] top-[0] left-[0] opacity-[0] max-w-full transition-all duration-[0.3s] ease delay-[0s]"
                                    src={items.image}
                                    alt="Product"
                                  />
                                </Link>
                                <span className="flags flex flex-col p-[0] uppercase absolute top-[10px] right-[10px] z-[2]">
                                  <span className="sale py-[5px] px-[10px] text-[11px] font-medium leading-[12px] text-left uppercase flex items-center bg-[#5caf90] text-[#fff] tracking-[0.5px] relative rounded-[5px]">
                                    {items.discount}%
                                  </span>
                                </span>
                                <div className="gi-pro-actions transition-all duration-[0.3s] ease-in-out absolute z-[9] left-[0] right-[0] bottom-[-10px] max-[991px]:opacity-[1] max-[991px]:bottom-[10px] flex flex-row items-center justify-center my-[0] mx-auto opacity-[0]">
                                  <Link
                                    className="gi-btn-group wishlist transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] hover:bg-[#5caf90]"
                                    title="Wishlist"
                                    onClick={() =>
                                      handleAddToWishlist(items._id)
                                    }
                                  >
                                    <i className="fi-rr-heart transition-all duration-[0.3s] ease-in-out text-[#777] leading-[10px]"></i>
                                  </Link>
                                  <Link
                                    to="#"
                                    onClick={() => toggleQuickview(items._id)}
                                    disabled={loading}
                                    className="gi-btn-group modal-toggle quickview transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] hover:bg-[#5caf90]"
                                  >
                                    <i className="fi-rr-eye transition-all duration-[0.3s] ease-in-out text-[#777] leading-[10px]"></i>
                                  </Link>

                                  <Link
                                    onClick={() => addToCart(items._id)}
                                    to="#"
                                    title="Add To Cart"
                                    className="gi-btn-group add-to-cart transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] hover:bg-[#5caf90]"
                                  >
                                    <i className="fi-rr-shopping-basket transition-all duration-[0.3s] ease-in-out text-[#777] leading-[10px]"></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="gi-pro-content h-full p-[20px] relative z-[10] flex flex-col text-left border-t-[1px] border-solid border-[#eee]">
                              <h5 className="gi-pro-title h-full mb-[10px] text-[16px] tracking-[0.01rem] font-normal leading-[1.2]">
                                <Link
                                  to={`/Productdetails/${items._id}`}
                                  className="text-[#4b5966] block text-center text-[14px] leading-[22px] font-normal tracking-[0.85px] capitalize font-Poppins"
                                >
                                  {items.title}
                                </Link>
                              </h5>

                              <span className="gi-price text-center">
                                <span className="new-price text-[#4b5966] font-bold text-[18px] mr-[7px] ">
                                  ₹{items.price}
                                </span>
                                <span className="old-price text-[14px] text-[#777] line-through">
                                  ₹{items.cutPrice}
                                </span>
                              </span>
                              <button
                                className="block mx-auto mt-4 px-4 py-2  bg-[#FF9343] text-white rounded "
                                onClick={() => addToCart(items._id)}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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

export default Shoppage;
