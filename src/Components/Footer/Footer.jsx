import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../Config";
import logocharansparsh from "../../assets/Images/logocharansparsh.png";
import { FaInstagram } from "react-icons/fa";
function Footer() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch(Baseurl + "/api/v1/category/allcategory")
      .then((response) => response.json())
      .then((data) => {
        // Filter out inactive categories
        const activeCategories = data.data.filter(
          (category) => category.status === "active"
        );
        setCategories(activeCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="bg-footer ">
      <div className="sm:container md:container lg:container xl:container px-10  sm:p-0 md:p-0">
        <footer className="font-sans tracking-wide       overflow-hidden ">
          <div className="grid max-sm:grid-cols-1 lg:grid-cols-3 items-center gap-4 py-4">
            <h2 className="lg:col-span-2 text-xl font-semibold text-black">
              <Link to="/">
                <img className="h-20" alt="" src={logocharansparsh} />
              </Link>
            </h2>
            <div className="bg-gray-100 flex p-1 rounded-full focus-within:bg-white">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent text-sm text-gray-800 px-4 py-3 rounded-l-md  border-r-0"
              />
              <button
                type="button"
                className="bg-[#FF9343]  transition-all text-white font-semibold text-sm l px-6 py-3   rounded-r-md"
              >
                Submit
              </button>
            </div>
          </div>
          <hr className=" border-gray-800 " />
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-8 py-12 ">
            <div>
              <h4 className="text-[black] font-semibold text-lg mb-6">
                About Us
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    onClick={scrollToTop}
                    to="/profile"
                    className="hover:text-[black] text-black text-[15px] transition-all"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={scrollToTop}
                    to="#"
                    className="hover:text-[black] text-black text-[15px] transition-all"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={scrollToTop}
                    to="#"
                    className="hover:text-[black] text-black text-[15px] transition-all"
                  >
                    Awards
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={scrollToTop}
                    to="/temple"
                    className="hover:text-[black] text-black text-[15px] transition-all"
                  >
                    CharnSparsh Sewa
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[black] font-semibold text-lg mb-6">
                Category
              </h4>
              <ul className="space-y-1">
                {categories.slice(0, 4).map((item, index) => (
                  <li key={index}>
                    <Link
                      onClick={scrollToTop}
                      to={`/product/${item._id}`}
                      className="hover:text-[black] text-black text-[15px] transition-all"
                    >
                      {item.categoriesTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[black] font-semibold text-lg mb-6">
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    onClick={scrollToTop}
                    to="/Support"
                    className="hover:text-[black] text-black text-[15px] transition-all"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Privacy"
                    onClick={scrollToTop}
                    className="hover:text-[black] text-black text-[15px] transition-all"
                  >
                    Privacy Policy
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to="/ReturnPolicy"
                    onClick={scrollToTop}
                    className="hover:text-[black] text-black text-[15px] transition-all"
                  >
                    Return policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/TermsCondition"
                    onClick={scrollToTop}
                    className="hover:text-[black] text-black text-[15px] transition-all"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[black] font-semibold text-lg mb-6">
                Contact us
              </h4>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <div className="bg-[#FF9343] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#FFFFFF"
                      viewBox="0 0 479.058 479.058"
                    >
                      <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                  <Link
                    to="mailto:	info@charansparsh.in"
                    className="text-black text-sm ml-3"
                  >
                    <small className="block">Mail</small>
                    <p> support@charansparsh.in</p>
                  </Link>
                </li>

                <li className="flex items-center">
                  <div className="bg-[#FF9343] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#ffffff"
                      viewBox="0 0 482.6 482.6"
                    >
                      <path
                        d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.9-62.4-86.7-79-131.5-10.3-27.5-14.2-49.6-12.6-69.7z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                  <Link
                    to="tel:+91 98998 88847"
                    className="text-black text-sm ml-3"
                  >
                    <small className="block">Phone:</small>
                    <p>+91 98998 88847</p>
                  </Link>
                </li>
                <li>
                  <ul className="flex flex-wrap gap-x-8 gap-4 my-8">
                    <li>
                      <Link
                        to="https://www.facebook.com/charansparshfoundation"
                        className="text-xl hover:text-gray-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline w-7 h-7"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#1877f2"
                            d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z"
                            data-original="#1877f2"
                          />
                          <path
                            fill="#fff"
                            d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z"
                            data-original="#ffffff"
                          />
                        </svg>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="https://www.linkedin.com/company/charan-sparsh/"
                        className="text-xl hover:text-gray-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline w-7 h-7"
                          viewBox="0 0 176 176"
                        >
                          <g data-name="Layer 2">
                            <rect
                              width="176"
                              height="176"
                              fill="#0077b5"
                              data-original="#0077b5"
                              rx="24"
                            />
                            <path
                              fill="#fff"
                              d="M63.4 48a15 15 0 1 1-15-15 15 15 0 0 1 15 15zM60 73v66.27a3.71 3.71 0 0 1-3.71 3.73H40.48a3.71 3.71 0 0 1-3.72-3.72V73a3.72 3.72 0 0 1 3.72-3.72h15.81A3.72 3.72 0 0 1 60 73zm82.64 34.5v32.08a3.41 3.41 0 0 1-3.42 3.42h-17a3.41 3.41 0 0 1-3.42-3.42v-31.09c0-4.64 1.36-20.32-12.13-20.32-10.45 0-12.58 10.73-13 15.55v35.86A3.42 3.42 0 0 1 90.3 143H73.88a3.41 3.41 0 0 1-3.41-3.42V72.71a3.41 3.41 0 0 1 3.41-3.42H90.3a3.42 3.42 0 0 1 3.42 3.42v5.78c3.88-5.82 9.63-10.31 21.9-10.31 27.18 0 27.02 25.38 27.02 39.32z"
                              data-original="#ffffff"
                            />
                          </g>
                        </svg>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="https://www.instagram.com/charansparshfoundation"
                        className="text-xl hover:text-gray-400"
                      >
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-7 h-7"
                        viewBox="0 0 24 24"
                      >
                        <linearGradient
                          id="a"
                          x1="-37.106"
                          x2="-26.555"
                          y1="-72.705"
                          y2="-84.047"
                          gradientTransform="matrix(0 -1.982 -1.844 0 -132.522 -51.077)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#fd5" />
                          <stop offset=".5" stopColor="#ff543e" />
                          <stop offset="1" stopColor="#c837ab" />
                        </linearGradient>
                        <path
                          fill="url(#a0000)"
                          d="M1.5 1.633C-.386 3.592 0 5.673 0 11.995c0 5.25-.916 10.513 3.878 11.752 1.497.385 14.761.385 16.256-.002 1.996-.515 3.62-2.134 3.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091C18.89.029 18.778.005 15.91 0 5.737.005 3.507-.448 1.5 1.633z"
                          data-original="url(#a)"
                        />
                        <path
                          fill="#fff"
                          d="M11.998 3.139c-3.631 0-7.079-.323-8.396 3.057-.544 1.396-.465 3.209-.465 5.805 0 2.278-.073 4.419.465 5.804 1.314 3.382 4.79 3.058 8.394 3.058 3.477 0 7.062.362 8.395-3.058.545-1.41.465-3.196.465-5.804 0-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794 1.597c7.574-.012 8.538-.854 8.006 10.843-.189 4.137-3.339 3.683-7.211 3.683-7.06 0-7.263-.202-7.263-7.265 0-7.145.56-7.257 6.468-7.263zm5.524 1.471a1.063 1.063 0 1 0 0 2.126 1.063 1.063 0 0 0 0-2.126zm-4.73 1.243a4.55 4.55 0 1 0 .001 9.101 4.55 4.55 0 0 0-.001-9.101zm0 1.597c3.905 0 3.91 5.908 0 5.908-3.904 0-3.91-5.908 0-5.908z"
                          data-original="#ffffff"
                        />
                      </svg> */}
                        <FaInstagram className=" w-8 h-8  text-[#FF6842]" />
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="https://x.com/officialcsparsh?t=Xg75gPIkP4pG6ZHatnLbGA&s=09"
                        className="text-xl hover:text-gray-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline w-7 h-7"
                          viewBox="0 0 1227 1227"
                        >
                          <path
                            d="M613.5 0C274.685 0 0 274.685 0 613.5S274.685 1227 613.5 1227 1227 952.315 1227 613.5 952.315 0 613.5 0z"
                            data-original="#000000"
                          />
                          <path
                            fill="#fff"
                            d="m680.617 557.98 262.632-305.288h-62.235L652.97 517.77 470.833 252.692H260.759l275.427 400.844-275.427 320.142h62.239l240.82-279.931 192.35 279.931h210.074L680.601 557.98zM345.423 299.545h95.595l440.024 629.411h-95.595z"
                            data-original="#00000"
                          />
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </footer>{" "}
        <div className=" text-center border-[#6b5f5f] ">
          <p className="text-black text-[15px]">
            Copyright © 2024
            <Link to="#" target="_blank" className="hover:underline mx-1">
              CharanSparsh
            </Link>
            All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
