import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className=" bg-[#4b5966]">
      <div className="header-top py-[10px] text-[#fff]  max-[1199px]:hidden container ">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="w-full flex flex-wrap px-[12px]">
            <div className="grow-[1] shrink-[0] basis-[0%] min-[992px]:block max-[767px]:hidden">
              <div className="header-top-social">
                <ul className="mb-[0] p-[0] flex">
                  <li className="list-inline-item transition-all duration-[0.3s] ease-in-out flex text-[13px] mr-[15px]">
                    <Link
                      to="#"
                      className="mx-[5px] text-center flex items-center justify-center text-[15px]"
                    >
                      <i className="fi fi-rr-phone-call transition-all duration-[0.3s] ease-in-out text-[#fff]"></i>
                    </Link>
                    +91 987 654 3210
                  </li>
                  <li className="list-inline-item transition-all duration-[0.3s] ease-in-out flex text-[13px]">
                    <Link
                      to="#"
                      className="mx-[5px] text-center flex items-center justify-center text-[15px]"
                    >
                      <i className="fi fi-brands-whatsapp transition-all duration-[0.3s] ease-in-out text-[#fff]"></i>
                    </Link>
                    +91 987 654 3210
                  </li>
                </ul>
              </div>
            </div>

            <div className="grow-[1] shrink-[0] basis-[0%] text-center max-[1199px]:hidden">
              <div className="header-top-message text-[13px]">
                Worlds BEST Online Shopping Destination
              </div>
            </div>

            <div className="grow-[1] shrink-[0] basis-[0%] hidden min-[992px]:block">
              <div className="header-top-right-inner flex justify-end">
                <div className="header-top-lan-curr header-top-lan dropdown pl-[20px] flex flex-wrap relative">
                  <button
                    type="button"
                    className="dropdown-toggle text-[13px] flex items-center p-[0] transition-all duration-[0.3s] ease delay-0 text-[#fff] border-[0] tracking-[0.7px]"
                  >
                    <Link to="/AboutUs">About Us</Link>
                  </button>
                </div>

                <div className="header-top-lan-curr header-top-lan dropdown pl-[20px] flex flex-wrap relative">
                  <Link
                    to="/ContactUs"
                    className="dropdown-toggle text-[13px] flex items-center p-[0] transition-all duration-[0.3s] ease delay-0 text-[#fff] border-[0] tracking-[0.7px]"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div className="grow-[1] shrink-[0] basis-[0%] hidden ">
              <div className="gi-header-bottons flex justify-end mr-[-15px]">
                <div className="right-icons flex flex-row">
                  <Link
                    to="#"
                    className="gi-header-btn gi-header-user mr-[30px] px-[15px] relative transition-all duration-[0.3s] ease-in-out  flex text-[#4b5966] w-[auto] items-center"
                  >
                    <div className="header-icon relative flex">
                      <i className="fi-rr-user text-[24px] leading-[17px]">
                        user
                      </i>
                    </div>
                  </Link>

                  <Link
                    to="#"
                    className="gi-header-btn gi-wish-toggle mr-[30px] relative transition-all duration-[0.3s] ease-in-out  flex text-[#4b5966] w-[auto] items-center"
                  >
                    <div className="header-icon relative flex">
                      <i className="fi-rr-heart text-[24px] leading-[17px]"></i>
                    </div>
                    <span className="gi-header-count gi-wishlist-count w-[15px] h-[15px] bg-[#17181c] text-[#fff] flex items-center justify-center rounded-[50%] text-[11px] absolute top-[-2px] right-[-6px] opacity-[0.8]">
                      3
                    </span>
                  </Link>

                  <Link
                    to="#"
                    className="gi-header-btn gi-cart-toggle mr-[30px] relative transition-all duration-[0.3s] ease-in-out  flex text-[#4b5966] w-[auto] items-center"
                  >
                    <div className="header-icon relative flex">
                      <i className="fi-rr-shopping-bag text-[24px] leading-[17px]"></i>
                      <span className="main-label-note-new transition-all duration-[0.3s] ease-in-out w-[10px] h-[10px] m-auto bg-[#ec716d] rounded-[50%] cursor-default hidden absolute bottom-[-15px] left-[0] right-[0] z-[3] leading-[0.02rem]"></span>
                    </div>
                    <span className="gi-header-count gi-cart-count  w-[15px] h-[15px] text-[#fff] flex items-center justify-center rounded-[50%] text-[11px] absolute top-[-2px] right-[-6px] opacity-[0.8]">
                      3
                    </span>
                  </Link>

                  <Link
                    to="#"
                    className="gi-header-btn gi-site-menu-icon  transition-all duration-[0.3s] ease-in-out relative flex text-[#4b5966] w-[auto] items-center"
                  >
                    <i className="fi-rr-menu-burger text-[24px] leading-[17px]"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
