// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// import axios from "axios";
// import { Baseurl } from "../../Config";
// //
// function NewHeader() {
//   const [isTokenExpired, setIsTokenExpired] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem("accessToken"));
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

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
//       setIsTokenExpired(false);
//       setIsLoggedIn(false);
//     }
//   }, [token]);
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
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
//                     <Link onClick={scrollToTop} to="/">
//                       <img
//                         src="https://charansparsh.brandbell.in/assets/logocharansparsh-JWUXuxY_.png"
//                         alt="Site Logo"
//                         className="md:w-[170px] w-36"
//                       />
//                     </Link>
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
//                           <a
//                             href="javascript:void(0)"
//                             className="gi-close-search absolute top-[30px] right-[30px] text-[#fff] text-[30px] leading-[20px]"
//                             title="Close"
//                             onClick={() => setIsSearchOpen(false)}
//                           >
//                             ×
//                           </a>
//                           <form
//                             className="gi-form relative flex items-center justify-center max-[575px]:w-[100%] max-[575px]:px-[15px]"
//                             onSubmit={handleSearchSubmit}
//                           >
//                             <input
//                               className="gi-popup-search w-[500px] max-[575px]:w-[100%] bg-transparent border-[0] border-b-[2px] border-solid outline-[0] border-[#fff] text-[#fff] h-[40px]"
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
//                           <i className="fi-rr-user text-[20px] leading-[17px]"></i>
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
//                               to="/profile"
//                             >
//                               My Accounts
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
//                         <i className="fi-rr-heart text-[20px] leading-[17px]"></i>
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
//                       <div className="   relative flex">
//                         <i className="fi-rr-shopping-bag text-[20px] leading-[17px]"></i>
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
//                             <a
//                               href="javascript:void(0)"
//                               className="gi-close-search absolute top-[30px] right-[30px] text-[#fff] text-[30px] leading-[20px]"
//                               title="Close"
//                               onClick={() => setIsSearchOpen(false)}
//                             >
//                               ×
//                             </a>
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
//                         <span className="gi-header-count gi-wishlist-count w-[15px] h-[15px] text-[#fff] flex items-center justify-center rounded-[50%] text-[11px] absolute top-[-2px] right-[-6px] opacity-[0.8]">
//                           4
//                         </span>
//                       </Link>

//                       <Link
//                         to="/Cart"
//                         className="gi-header-btn gi-cart-toggle mr-[30px] transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center"
//                       >
//                         <div className="header-icon relative flex">
//                           <i className="fi-rr-shopping-bag text-[24px] leading-[17px]"></i>
//                           <span className="main-label-note-new"></span>
//                         </div>
//                         <span className="gi-header-count gi-cart-count w-[15px] h-[15px] text-[#fff] flex items-center justify-center rounded-[50%] text-[11px] absolute top-[-2px] right-[-6px] opacity-[0.8]">
//                           3
//                         </span>
//                       </Link>

//                       <Link
//                         to="#"
//                         data-drawer-target="drawer-navigation"
//                         data-drawer-show="drawer-navigation"
//                         aria-controls="drawer-navigation"
//                         className=" gi-site-menu-icon transition-all duration-[0.3s] ease-in-out  flex text-[#4b5966]"
//                       >
//                         <i className="fi-rr-menu-burger text-[24px] leading-[17px] sm:hidden md:hidden lg:hidden  hide-on-mobile menudemo"></i>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-wrap py-3.5 px-10 overflow-x-auto">
//         <div
//           id="collapseMenu"
//           className="w-full max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
//         >
//           <button
//             id="toggleClose"
//             className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-4 fill-black"
//               viewBox="0 0 320.591 320.591"
//             >
//               <path
//                 d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
//                 data-original="#000000"
//               ></path>
//               <path
//                 d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
//                 data-original="#000000"
//               ></path>
//             </svg>
//           </button>

//           <ul className="lg:flex lg:justify-center lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
//             <li className="mb-6 hidden max-lg:block">
//               <Link onClick={scrollToTop} to="/Product">
//                 <img
//                   src="https://readymadeui.com/readymadeui.svg"
//                   alt="logo"
//                   className="w-36"
//                 />
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/Product/Handloom"
//                 className="hover:text-[#007bff] text-[#007bff] font-bold text-[15px] block"
//               >
//                 Handloom
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/Product/Art & Painting"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 Art & Painting
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/Product/Eco-friendly"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 Eco-friendly
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/Product/Handicraft"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 Handicraft
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/Product/Customized Products"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 Customized Products
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/Product/Gift Items"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 Gift Items
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/Product/Traditional"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 Traditional
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/Product/State Wise"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 State Wise
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/AboutUs"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 About us
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/ContactUs"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 Contact Us
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3">
//               <Link
//                 to="/temple"
//                 className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block"
//               >
//                 Temple
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

// export default NewHeader;
