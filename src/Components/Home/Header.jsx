// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// import axios from "axios";
// // import logo from "../assets/Images/logoproven.png";
// // import categorydefulthower from "../assets/Images/categorydefulthower.jpg";
// import { Baseurl } from "../../Config";
// const AccordionItem = ({ title, children }) => {};
// function Header() {
//     const [categories, setCategories] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
   
    
   
   
  
//     const [activeCategory, setActiveCategory] = useState(null);
   
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [category, setCategory] = useState([]);
//   const [isTokenExpired, setIsTokenExpired] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem("accessToken"));
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const [activeMenu, setActiveMenu] = useState(null);

//   const handleMenuClick = (menuName) => {
//     setActiveMenu(menuName);
//   };
//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };
//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const currentTime = Math.floor(Date.now() / 1000);
//         if (decodedToken.exp < currentTime) {
//           // Token is expired
//           setIsTokenExpired(true);
//           setIsLoggedIn(false);
//           localStorage.removeItem("accessToken");
//           setToken(null);
//         } else {
//           // Token is valid
//           setIsTokenExpired(false);
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         // Error decoding token, assume token is invalid
//         setIsTokenExpired(true);
//         setIsLoggedIn(false);
//         localStorage.removeItem("accessToken");
//         setToken(null);
//       }
//     } else {
//       // No token found
//       setIsTokenExpired(false);
//       setIsLoggedIn(false);
//     }
//   }, [token]);

//   // const [hoveredImage, setHoveredImage] = useState(categorydefulthower);

//   // const handleMouseOver = (imageSrc) => {
//   //   setHoveredImage(imageSrc);
//   // };

//   // const handleMouseOut = () => {
//   //   setHoveredImage(categorydefulthower);
//   // };
//   useEffect(() => {
//     fetch(Baseurl + "/api/v1/category/allcategory")
//       .then((response) => response.json())
//       .then((data) => {
//         // Filter out categories with the title "Spare Parts"
//         const filteredCategories = data.data.filter(
//           (cat) => cat.categoriesTitle !== "Spare Parts"
//         );
//         setCategory(filteredCategories);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const userId = localStorage.getItem("userid");

//       if (!accessToken || !userId) {
//         throw new Error("User information not found in local storage.");
//       }

//       const response = await axios.post(
//         Baseurl + "/api/v1/user/logout",
//         { id: userId },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("userid");
//         localStorage.removeItem("user"); // Remove user info if stored
//         localStorage.removeItem("refreshToken");

//         document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//         document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//         // Redirect to login page or perform any other actions
//         window.location.href = "/login"; // Example: redirect to login page
//       } else {
//         console.error("Failed to log out:", response);
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
//       setIsSearchOpen(false);
//     }
//   };
//   useEffect(() => {
//     if (isTokenExpired) {
//       window.location.href = "/"; // Adjust redirect as needed
//     }
//   }, [isTokenExpired]);
//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const currentTime = Math.floor(Date.now() / 1000);
//         if (decodedToken.exp < currentTime) {
//           // Token is expired
//           setIsTokenExpired(true);
//           setIsLoggedIn(false);
//           localStorage.removeItem("accessToken");
//           setToken(null);
//         } else {
//           // Token is valid
//           setIsTokenExpired(false);
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         // Error decoding token, assume token is invalid
//         setIsTokenExpired(true);
//         setIsLoggedIn(false);
//         localStorage.removeItem("accessToken");
//         setToken(null);
//       }
//     } else {
//       setIsTokenExpired(false);
//       setIsLoggedIn(false);
//     }
//   }, [token]);
//   const getProductsByCategory = (categoryTitle) => {
//     return products.filter(
//       (product) => product.category.categoriesTitle === categoryTitle
//     );
//   };

//   const handleSmoothScrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth", // Enables smooth scrolling
//     });
//   };
//   const handleCategoryClick = (categoryTitle) => {
//     setActiveCategory(categoryTitle); // Set the active category
//     handleSmoothScrollToTop(); // Smooth scroll to top when category is clicked
//   };
//   return (
//     <>
//       <header
//         className={`gi-header bg-[#fff] z-[14] max-[1024px]:z-[16] relative  border`}
//       >
//         <div className="gi-header-bottom py-[12px] max-[1024px]:py-[10px] max-[1024px]:border-b-[1px] border-solid border-[#eee]">
//           <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
//             <div className="w-full flex flex-wrap px-[12px]">
//               <div className="gi-flex flex flex-row justify-between w-full max-[575px]:flex-col">
//                 <div className="self-center gi-header-logo max-[575px]:mb-[15px]">
//                   <div className="header-logo text-left">
//                     <Link to="/">
//                       <img
//                         // src={logo}
//                         alt="Site Logo"
//                         className="w-[230px] max-[1399px]:w-[180px] max-[1199px]:w-[150px] max-[991px]:w-[120px] max-[767px]:w-[100px]"
//                       />
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="w-full items-center min-[992px]:block hidden">
//                   <div className="nav-desk">
//                     <div className="w-full flex flex-wrap px-[12px] min-[1400px]:relative">
//                       <div className="basis-auto w-full self-center">
//                         <div className="gi-main-menu flex">
//                         <ul className="w-full flex justify-center flex-wrap pl-[0]">
//                                   {categories.slice(0, 6).map((item, index) => (
//                                     <>
//                                       <li
//                                         key={index}
//                                         className="dropdown drop-list relative ml-[20px] mr-[30px] transition-all duration-[0.3s] ease-in-out max-[1199px]:ml-[15px]"
//                                       >
//                                         <Link
//                                           to={`/Product/${item.categoriesTitle}`}
//                                           className={`dropdown-arrow py-[15px] text-[15px] leading-[60px] capitalize flex items-center font-medium ${
//                                             activeCategory ===
//                                             item.categoriesTitle
//                                               ? "text-[#fa8232]" // Active category style
//                                               : ""
//                                           }`}
//                                           onClick={() =>
//                                             handleCategoryClick(
//                                               item.categoriesTitle
//                                             )
//                                           }
//                                         >
//                                           {item.categoriesTitle}
//                                         </Link>
//                                         <ul className="sub-menu transition-all duration-[0.3s] ease-in-out mt-[15px] absolute z-[16] text-left opacity-0 invisible min-w-[205px] left-0 right-auto bg-[#fff] block rounded-[5px] border-[1px] border-solid border-[#eee] py-[5px]">
//                                           {getProductsByCategory(
//                                             item.categoriesTitle
//                                           ).map((product, index) => (
//                                             <li key={index}>
//                                               <Link
//                                                 to={`/Product/${item.categoriesTitle}/${product.subCategoryTitle}`}
//                                                 className="transition-all duration-[0.3s] ease-in-out leading-[20px] px-[20px] py-[10px] font-normal text-[13px] text-[#777] capitalize flex justify-between items-center hover:text-[#516ebf]"
//                                                 onClick={
//                                                   handleSmoothScrollToTop
//                                                 }
//                                               >
//                                                 {product.subCategoryTitle}
//                                               </Link>
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       </li>
//                                     </>
//                                   ))}
//                                   <li className="dropdown drop-list relative ml-[20px] mr-[30px] transition-all duration-[0.3s] ease-in-out max-[1199px]:ml-[15px]">
//                                     <Link
//                                       to={`/StateProduct`}
//                                       className="dropdown-arrow relative transition-all duration-[0.3s] ease-in-out py-[15px] text-[15px] leading-[60px] capitalize text-[#4b5966] flex items-center font-medium"
//                                     >
//                                       State Wise
//                                     </Link>
//                                   </li>
//                                 </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="gi-header-action self-center max-[991px]:hidden">
//                   <div className="gi-header-bottons flex justify-end">
//                     <Link
//                       to="#"
//                       className="gi-header-btn  h-icon gi-search-icon mr-[30px] transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center whitespace-nowrap"
//                       title="Search"
//                       onClick={() => setIsSearchOpen(!isSearchOpen)}
//                     >
//                       <div className="header-icon relative flex">
//                         <i className="fi-rr-search text-[24px] leading-[17px] max-[575px]:text-[#fff] max-[575px]:text-[18px]"></i>
//                       </div>
//                       <div className="gi-btn-desc flex flex-col uppercase ml-[10px] max-[1199px]:hidden"></div>
//                     </Link>
//                     {isSearchOpen && (
//                       <div className="gi-search-menu w-full h-[30%] fixed top-[0] left-[0] bg-[#000000cc] z-[17]">
//                         <div className="gi-search-wrapper h-full w-full relative flex items-center justify-center">
//                           <Link
//                             to="#"
//                             className="gi-close-search absolute top-[30px] right-[30px] text-[#fff] text-[30px] leading-[20px]"
//                             title="Close"
//                             onClick={() => setIsSearchOpen(false)}
//                           >
//                             ×
//                           </Link>
//                           <form
//                             className="gi-form relative flex items-center justify-center max-[575px]:w-[100%] max-[575px]:px-[15px]"
//                             onSubmit={handleSearchSubmit}
//                           >
//                             <input
//                               className="gi-popup-search w-[500px] max-[575px]:w-[100%] bg-transparent border-[0] border-b-[2px] border-solid outline-[0] border-[#fff] text-[#fff] h-[50px]"
//                               type="text"
//                               name="u"
//                               placeholder="Search here"
//                               value={searchQuery}
//                               onChange={handleSearchChange}
//                             />
//                             <i className="fi-rr-search ml-[-17px] text-[#fff]"></i>
//                             <button
//                               type="submit"
//                               className="gi-popup-search-button p-[0]"
//                               name="search"
//                             >
//                               <i className="ion-ios-search-strong mr-[-17px] text-[#fff]"></i>
//                             </button>
//                           </form>
//                         </div>
//                       </div>
//                     )}
//                     <div className="gi-acc-drop relative">
//                       <Link
//                         to="/Login"
//                         className="gi-header-btn gi-header-user dropdown-toggle gi-user-toggle mr-[30px] transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center whitespace-nowrap"
//                         title="Account"
//                       >
//                         <div className="header-icon relative flex">
//                           <i className="fi-rr-user text-[24px] leading-[17px]"></i>
//                         </div>
//                         <div className="gi-btn-desc flex flex-col uppercase ml-[10px] max-[1199px]:hidden">
//                           <span className="gi-btn-title transition-all duration-[0.3s] ease-in-out text-[12px] leading-[1] text-[#777] mb-[6px] tracking-[0.6px] capitalize font-medium">
//                             {isLoggedIn ? "" : ""}
//                           </span>
//                         </div>
//                       </Link>
//                       {isLoggedIn && (
//                         <ul className="gi-dropdown-menu min-w-[150px] py-[5px] transition-all duration-[0.3s] ease-in-out mt-[25px] absolute z-[16] text-left bg-[#fff] block opacity-0 invisible left-[0] right-[auto] border-[1px] border-solid border-[#eee]">
//                           <li>
//                             <Link
//                               className="dropdown-item py-[10px] px-[20px] block w-full font-normal text-[13px] text-[#777] hover:bg-transparent hover:text-AFPPrimary"
//                               to="/profile"
//                             >
//                               Profile
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               className="dropdown-item py-[10px] px-[20px] block w-full font-normal text-[13px] text-[#777] hover:bg-transparent hover:text-AFPPrimary"
//                               to="/OrderList"
//                             >
//                               My Orders
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               className="dropdown-item py-[10px] px-[20px] block w-full font-normal text-[13px] text-[#777] hover:bg-transparent hover:text-AFPPrimary"
//                               to="/Support"
//                             >
//                               Support
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               onClick={handleLogout}
//                               className="dropdown-item py-[10px] px-[20px] block w-full font-normal text-[13px] text-[#777] hover:bg-transparent hover:text-AFPPrimary"
//                               to="#"
//                             >
//                               Log Out
//                             </Link>
//                           </li>
//                         </ul>
//                       )}
//                     </div>

//                     <Link
//                       to="/wishlist"
//                       className="gi-header-btn gi-wish-toggle mr-[30px] transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center whitespace-nowrap"
//                       title="Wishlist"
//                     >
//                       <div className="header-icon relative flex">
//                         <i className="fi-rr-heart text-[24px] leading-[17px]"></i>
//                       </div>
//                       <div className="gi-btn-desc flex flex-col uppercase ml-[10px] max-[1199px]:hidden">
//                         <span className="gi-btn-title transition-all duration-[0.3s] ease-in-out text-[12px] leading-[1] text-[#777] mb-[6px] tracking-[0.6px] capitalize font-medium"></span>
//                       </div>
//                     </Link>

//                     <Link
//                       to="/Cart"
//                       className="gi-header-btn gi-cart-toggle transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center whitespace-nowrap"
//                       title="Cart"
//                     >
//                       <div className="header-icon relative flex">
//                         <i className="fi-rr-shopping-bag text-[24px] leading-[17px]"></i>
//                       </div>
//                       <div className="gi-btn-desc flex flex-col uppercase ml-[10px] max-[1199px]:hidden">
//                         <span className="gi-btn-title transition-all duration-[0.3s] ease-in-out text-[12px] leading-[1] text-[#777] mb-[6px] tracking-[0.6px] capitalize font-medium"></span>
//                       </div>
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="grow-[1] shrink-[0] basis-[0%] min-[576px]:flex justify-end items-center min-[992px]:hidden">
//                   <div className="gi-header-bottons flex justify-end">
//                     <div className="right-icons flex flex-row">
//                       <Link
//                         to="#"
//                         className="gi-header-btn gi-header-user mr-[30px] transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center"
//                       >
//                         <div className="header-icon relative flex">
//                           <i
//                             className="fi-rr-search text-[24px] text-[#4b5966] leading-[17px]"
//                             onClick={() => setIsSearchOpen(!isSearchOpen)}
//                           ></i>
//                         </div>
//                       </Link>
//                       {isSearchOpen && (
//                         <div className="gi-search-menu w-full h-[30%] fixed top-[0] left-[0] bg-[#000000cc] z-[17]">
//                           <div className="gi-search-wrapper h-full w-full relative flex items-center justify-center">
//                             <Link
//                               to="#"
//                               className="gi-close-search absolute top-[30px] right-[30px] text-[#fff] text-[30px] leading-[20px]"
//                               title="Close"
//                               onClick={() => setIsSearchOpen(false)}
//                             >
//                               ×
//                             </Link>
//                             <form
//                               className="gi-form relative flex items-center justify-center max-[575px]:w-[100%] max-[575px]:px-[15px]"
//                               onSubmit={handleSearchSubmit}
//                             >
//                               <input
//                                 className="gi-popup-search w-[500px] max-[575px]:w-[100%] bg-transparent border-[0]  border-solid outline-[0] border-[#fff] text-[#fff] h-[50px]"
//                                 type="text"
//                                 name="u"
//                                 placeholder="Search here"
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                               />
//                               <i className="fi-rr-search ml-[-17px] text-[#fff]"></i>
//                               <button
//                                 type="submit"
//                                 className="gi-popup-search-button p-[0]"
//                                 name="search"
//                               >
//                                 <i className="ion-ios-search-strong mr-[-17px] text-[#fff]"></i>
//                               </button>
//                             </form>
//                           </div>
//                         </div>
//                       )}
//                       <Link
//                         to="/profile"
//                         className="gi-header-btn gi-header-user mr-[30px] transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center"
//                       >
//                         <div className="header-icon relative flex">
//                           <i className="fi-rr-user text-[24px] leading-[17px]"></i>
//                         </div>
//                       </Link>

//                       <Link
//                         to="/wishlist"
//                         className="gi-header-btn gi-wish-toggle mr-[30px] transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center"
//                       >
//                         <div className="header-icon relative flex">
//                           <i className="fi-rr-heart text-[24px] leading-[17px]"></i>
//                         </div>
//                       </Link>

//                       <Link
//                         to="/Cart"
//                         className="gi-header-btn gi-cart-toggle mr-[30px] transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center"
//                       >
//                         <div className="header-icon relative flex">
//                           <i className="fi-rr-shopping-bag text-[24px] leading-[17px]"></i>
//                           <span className="main-label-note-new"></span>
//                         </div>
//                       </Link>

//                       <button
//                         onClick={toggleDrawer}
//                         className=" gi-site-menu-icon transition-all duration-[0.3s] ease-in-out  flex text-[#4b5966]"
//                       >
//                         <i className="fi-rr-menu-burger text-[24px] leading-[17px] sm:hidden md:hidden lg:hidden  hide-on-mobile menudemo"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div
//         id="drawer-navigation"
//         className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
//           isDrawerOpen ? "translate-x-0" : "-translate-x-full"
//         } bg-white w-64`}
//         tabIndex="-1"
//         aria-labelledby="drawer-navigation-label"
//       >
//         <h5
//           id="drawer-navigation-label"
//           className="text-base font-semibold text-gray-500 uppercase "
//         >
//           {/* <img className=" w-20" src={logo} alt="logo" /> */}
//         </h5>
//         <button
//           type="button"
//           onClick={toggleDrawer}
//           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center "
//         >
//           <svg
//             className="w-3 h-3"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 14 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//             />
//           </svg>
//           <span className="sr-only">Close menu</span>
//         </button>
//         <div className="py-4 overflow-y-auto">
//           <ul>
//             <li className="dropdown relative">
//               <AccordionItem title="Product">
//                 <Link
//                   to="/Water-purifier"
//                   className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
//                 >
//                   Art & Painting
//                 </Link>
//               </AccordionItem>
//             </li>
//             <li className="relative"></li>
//             <li className="relative">
//               <Link
//                 to="/Spare_Parts"
//                 className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
//               >
//                 Handloom
//               </Link>
//             </li>
//             <li className="dropdown ">
//               <Link
//                 to="/AboutUs"
//                 className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
//               >
//                 Handicraft
//               </Link>
//             </li>
//             <li className="dropdown ">
//               <Link
//                 to="/contact-us"
//                 className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
//               >
//                 Traditional
//               </Link>
//             </li>
//             <li className="relative">
//               <Link
//                 to="/Client"
//                 className="dropdown-arrow p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
//               >
//                 Eco-friendly
//               </Link>
//             </li>
//             <li className="relative pt-2">
//               <Link
//                 to="/Book-Demo"
//                 className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
//               >
//                 Gift Items
//               </Link>
//             </li>
//             <li className="relative pt-2">
//               <Link
//                 to="/Book-Demo"
//                 className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
//               >
//                 Gift Items
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Header;
