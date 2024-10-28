// import axios from "axios";
// import { useEffect, useState } from "react";
// import { IoCartOutline } from "react-icons/io5";
// import { Link, useParams } from "react-router-dom";
// import audio from "../../assets/Images/gond.mp3";
// import { Baseurl } from "../../Config";
// import { useCart } from "../Hooks/useCart";
// // import UttarPradesh from "../../assets/Images/Uttar Pradesh.png";
// import { useWishlist } from "../Hooks/useWishlist";
// import bannervideo from "../../assets/Images/bannervideo.mp4";
// import Shoppage from "./Shoppage";
// function NewCard() {
//   const [products, setProducts] = useState([]);
//   const { addToCart } = useCart();
//   const { handleAddToWishlist } = useWishlist();
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const { categoryName } = useParams();
//   useEffect(() => {
//     // Fetch product data from API
//     axios
//       .get(Baseurl + "/api/v1/Product/products")
//       .then((response) => {
//         const allProducts = response.data.data; // Adjust based on the actual API response structure
//         setProducts(allProducts);
//         // Filter products based on categoryName
//         const filtered = allProducts.filter(
//           (product) =>
//             product.categories.toLowerCase() === categoryName.toLowerCase() &&
//             product.IsApproved
//         );
//         setFilteredProducts(filtered);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, [categoryName]);
//   console.log(products);

//   return (
//     <div>
//       {/* <div className="bg-gray-100 container ">
//         <div className=" ">
//           <div className=" rounded-lg  flex flex-col md:flex-row items-center">
//             <div className="  ">
//               <img src={UttarPradesh} alt="Gond Art" className=" " />
//             </div>

//             <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
//               <p className="text-gray-700 text-justify">
//                 Lorem Ipsum Dolor Sit Amet Consectetur. Eu Elementum Purus Vel
//                 Amet Amet Nec Magna Tortor. Nunc At Nisl Senectus Lacinia.
//                 Faucibus Tortor Et Amet Senectus Auctor Arcu Id Et Tortor.
//                 Mattis Eget Mi Dignissim Etiam Justo Ultricies...
//               </p>

//               <div className="mt-4">
//                 <audio controls className="w-full">
//                   <source src={audio} type="audio/mpeg" />
//                   Your browser does not support the audio element.
//                 </audio>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}
//       <div className=" ">
//         <section className="gi-offer-section overflow-hidden py-[40px] max-[767px]:py-[30px]   ">
//           <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
//             <div className="w-full flex flex-wrap">
//               <div
//                 className="min-[768px]:w-[50%] w-full wow fadeInLeft"
//                 data-wow-duration="2s"
//               >
//                 <div className="gi-ofr-banners ">
//                   <div className=" flex flex-row relative overflow-hidden rounded-l-md">
//                     <div className=" w-full relative">
//                       <video src={bannervideo} autoPlay loop muted></video>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className="min-[768px]:w-[50%] w-full  wow fadeInRight"
//                 data-wow-duration="2s"
//               >
//                 <div className="gi-ofr-banners max-[767px]:mt-[30px]  ">
//                   <div className="gi-bnr-body flex flex-row relative overflow-hidden">
//                     <div className="gi-bnr-img w-full relative ">
//                       <div
//                         //   src={bannerImage}
//                         alt="banner"
//                         className="w-full  h-[370px] "
//                       />
//                     </div>
//                     <div className="">
//                       <p className="text-black ">
//                         Lorem Ipsum Dolor Sit Amet Consectetur. Eu Elementum
//                         Purus Vel Amet Amet Nec Magna Tortor. Nunc At Nisl
//                         Senectus Lacinia. Faucibus Tortor Et Amet Senectus
//                         Auctor Arcu Id Et Tortor. Mattis Eget Mi Dignissim Etiam
//                         Justo Ultricies... Lorem ipsum dolor sit amet
//                         consectetur adipisicing elit. Eum dolores numquam quo
//                         repudiandae quia id eligendi cum at magni fuga? Modi ab
//                         repellat, ratione error qui pariatur eveniet saepe
//                         deserunt iusto vitae praesentium vel atque magni sunt
//                         reprehenderit libero ipsam molestiae laudantium a
//                         inventore! Quaerat.
//                       </p>
//                       {/* <h5 className="text-white text-[34px] font-bold leading-[1.2] capitalize mb-[6px] max-[1399px]:text-[28px] max-[1199px]:text-[22px] max-[991px]:text-[16px] max-[767px]:text-[20px] max-[420px]:text-[16px] pb-4">
//                         the hands that craft our heritage
//                       </h5> */}
//                       <div className="mt-4">
//                         <audio controls className="w-full text-black">
//                           <source src={audio} type="audio/mpeg" />
//                           Your browser does not support the audio element.
//                         </audio>
//                       </div>

//                       {/* <a
//                         href="#"
//                         className="gi-btn-2 transition-all duration-[0.3s] ease-in-out overflow-hidden text-center relative rounded-[5px] py-[5px]  max-[360px]:py-[3px] px-[15px] max-[360px]:px-[10px]   border-white text-[#fff] border-[1px] text-[14px] max-[360px]:text-[13px] tracking-[0] font-medium inline-flex items-center hover:bg-[#4b5966] hover:text-[#fff]"
//                       >
//                         Shop Now
//                       </a> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//       {/* <section
//         className="gi-product-tab gi-products py-[40px] max-[767px]:py-[30px] wow fadeInUp"
//         data-wow-duration="2s"
//       >
//         <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] ">
//           <div className="gi-tab-title w-full inline-flex justify-between px-[12px] max-[991px]:flex-col">
//             <div className="gi-main-title">
//               <div className="section-title mb-[20px] pb-[20px] flex flex-start">
//                 <div className="section-detail">
//                   <h2 className="gi-title mb-[0] text-[25px] max-[991px]:text-[24px] max-[767px]:text-[22px] max-[575px]:text-[20px] font-semibold text-[#4b5966] relative inline p-[0] capitalize leading-[1] font-manrope tracking-[0.01rem]">
//                     <span className="text-black">Handloom Collections</span>
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="w-full flex flex-wrap mb-[-24px] container">
//             <div className="w-full">
//               <div className="tab-content">
//                 <div className="tab-pro-pane" id="all">
//                   <div className="w-full flex flex-wrap">
//                     {filteredProducts.map((item, index) => (
//                       <div
//                         key={index}
//                         className="min-[1200px]:w-[20%] min-[768px]:w-[33.33%] min-[576px]:w-[50%] max-[575px]:w-[50%] max-[480px]:w-full px-[12px]"
//                       >
//                         <div className="gi-product-content h-full pb-[24px] flex">
//                           <div className="gi-product-inner transition-all duration-[0.3s] ease-in-out cursor-pointer flex flex-col overflow-hidden border-[1px] border-solid border-[#75AFC6]">
//                             <div className="gi-pro-image-outer transition-all duration-[0.3s] delay-[0s] ease z-[11] relative">
//                               <div className="gi-pro-image overflow-hidden">
//                                 <Link
//                                   to="/productDetails"
//                                   className="image relative block overflow-hidden max-h-72"
//                                 >
//                                   <span className="label veg max-[991px]:hidden">
//                                     <span className="dot"></span>
//                                   </span>
//                                   <img
//                                     className="main-image  max-w-full transition-all duration-[0.3s] ease delay-[0s]"
//                                     src={item.image}
//                                     alt="Product"
//                                   />
//                                   <img
//                                     className="hover-image absolute top-0 left-0 w-full transition-all duration-[0.3s] ease delay-[0s]"
//                                     src={item.image}
//                                     alt="Product"
//                                   />
//                                 </Link>
//                                 <span className="flags flex flex-col p-[0] uppercase absolute top-[10px] right-[10px] z-[2]">
//                                   <span className="sale px-[10px] py-[5px] text-[11px] font-medium leading-[12px] text-left uppercase flex items-center bg-[#5caf90] text-[#fff] tracking-[0.5px] relative rounded-[5px] ">
//                                     -{item.discount}%
//                                   </span>
//                                 </span>
//                                 <div className="gi-pro-actions transition-all duration-[0.3s] ease-in-out absolute z-[9] left-[0] right-[0] bottom-[-10px] max-[991px]:opacity-[1] max-[991px]:bottom-[10px] flex flex-row items-center justify-center my-[0] mx-auto opacity-0">
//                                   <Link
//                                     className="gi-btn-group wishlist transition-all duration-[0.3s] ease-in-out h-[30px] w-[30px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px]"
//                                     title="Wishlist"
//                                     onClick={() =>
//                                       handleAddToWishlist(item._id)
//                                     }
//                                   >
//                                     <i className="fi-rr-heart transition-all duration-[0.3s] ease-in-out text-[#777] leading-[10px]"></i>
//                                   </Link>
//                                   <Link
//                                     to="#"
//                                     className="gi-btn-group quickview transition-all duration-[0.3s] ease-in-out h-[30px] w-[30px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] modal-toggle"
//                                   >
//                                     <i className="fi-rr-eye transition-all duration-[0.3s] ease-in-out text-[#777] leading-[10px]"></i>
//                                   </Link>

//                                   <Link
//                                     to="#"
//                                     title="Add To Cart"
//                                     className="gi-btn-group add-to-cart transition-all duration-[0.3s] ease-in-out h-[30px] w-[30px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px]"
//                                   >
//                                     <IoCartOutline
//                                       className="fi-rr-shopping-basket transition-all duration-[0.3s] ease-in-out text-[#777] leading-[10px] text-xl"
//                                       onClick={() => addToCart(item._id)}
//                                     />
//                                   </Link>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="gi-pro-content h-full p-[20px] relative z-[10] flex flex-col text-left">
//                               <Link to="/productDetails">
//                                 <h6 className="gi-pro-stitle mb-[10px] font-normal text-[#999] text-[13px] leading-[1.2] capitalize">
//                                   {item.categories}
//                                 </h6>
//                               </Link>
//                               <h5 className="gi-pro-title h-full mb-[10px] text-[16px]">
//                                 <Link
//                                   to="/productDetails"
//                                   className="block text-[14px] leading-[22px] font-normal text-[#4b5966] tracking-[0.85px] capitalize font-Poppins hover:text-[#5caf90]"
//                                 >
//                                   {item.title}
//                                 </Link>
//                               </h5>
//                               <div className="gi-pro-rat-price mt-[5px] mb-[0] flex flex-col">
//                                 <span className="gi-pro-rating mb-[10px] relative">
//                                   <div className="flex items-center space-x-1 rtl:space-x-reverse">
//                                     <svg
//                                       className="w-4 h-4 text-yellow-300"
//                                       aria-hidden="true"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       fill="currentColor"
//                                       viewBox="0 0 22 20"
//                                     >
//                                       <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                     </svg>
//                                     <svg
//                                       className="w-4 h-4 text-yellow-300"
//                                       aria-hidden="true"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       fill="currentColor"
//                                       viewBox="0 0 22 20"
//                                     >
//                                       <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                     </svg>
//                                     <svg
//                                       className="w-4 h-4 text-yellow-300"
//                                       aria-hidden="true"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       fill="currentColor"
//                                       viewBox="0 0 22 20"
//                                     >
//                                       <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                     </svg>
//                                     <svg
//                                       className="w-4 h-4 text-yellow-300"
//                                       aria-hidden="true"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       fill="currentColor"
//                                       viewBox="0 0 22 20"
//                                     >
//                                       <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                     </svg>
//                                     <svg
//                                       className="w-4 h-4 text-gray-200 dark:text-gray-600"
//                                       aria-hidden="true"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       fill="currentColor"
//                                       viewBox="0 0 22 20"
//                                     >
//                                       <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                     </svg>
//                                   </div>
//                                 </span>
//                                 <span className="gi-price">
//                                   <span className="new-price text-[#4b5966] font-bold text-[14px] mr-[7px]">
//                                     ₹{item.price}
//                                   </span>
//                                   <span className="old-price text-[14px] text-[#777] line-through">
//                                     ₹{item.cutPrice}
//                                   </span>
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}{" "}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section> */}
//       <Shoppage />
//     </div>
//   );
// }

// export default NewCard;
