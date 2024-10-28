import templedetails from "../../assets/Images/templedetails.jpg";
import image1 from "../../assets/Images/templeimage1.jpg";
import image2 from "../../assets/Images/templedimagwe2.jpg";
import image3 from "../../assets/Images/templeimage3.jpg";
import image4 from "../../assets/Images/templeimage4.jpg";
import image5 from "../../assets/Images/templeimage5.jpg";
import { Link } from "react-router-dom";
function Templedetails() {
  return (
    <>
      <section>
        <div>
          <div className="w-full flex flex-wrap">
            <div className="min-[768px]:w-[100%] w-full ">
              <div className="gi-ofr-banners">
                <div className="flex flex-row relative overflow-hidden">
                  <div className="w-full relative sm:h-[550px] md:h-[550px] lg:h-[550px]">
                    {/* Image */}
                    <img
                      src={templedetails}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <h2 className="text-white lg:text-5xl md:text-4xl text-3xl font-bold">
                        Kashi Vishwanath Temple
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className=" sm:container md:container mx-auto  sm:py-16">
        <div className="grid md:grid-cols-2 items-center gap-16">
          <div className="max-md:order-1 max-w-lg">
            <h3 className="text-md text-[#F99746] font-semibold mb-4  px-4 sm:px-0">
              About Temple
            </h3>
            <h3 className="text-xl  font-semibold mb-4 px-4  sm:px-0 md:px-0">
              Kashi Vishwanath Temple
            </h3>
            <p className=" px-4 sm:px-0 md:px-0">
              Lorem ipsum dolor sit amet consectetur. Faucibus eleifend sed
              iaculis et pretium tristique mi venenatis nunc. Id gravida velit
              enim adipiscing felis arcu facilisis. Enim eu est convallis sem
              nibh. Porttitor quam accumsan quis sit quisque tellus tempor.
              Mauris iaculis id nulla lacus. Cursus lorem elit gravida risus
              urna. Ultricies mi id blandit at a enim metus. Libero neque amet
              aliquam adipiscing sodales in sit ut. Nec eget tincidunt lacus
              maecenas placerat sit metus nulla quis. Cras et amet ipsum sit
              lobortis pellentesque. Sed volutpat hendrerit suscipit vehicula
              velit adipiscing egestas. Auctor nibh consequat semper vitae
              cursus nisl.
            </p>
          </div>
          <div>
            <img
              src={image1}
              className="w-full object-contain  shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] sm:mt-12  hidden sm:block lg:block px-4 sm:px-0 md:px-0 lg:px-0  "
            />
          </div>
        </div>
      </div>
      <div className="bg-white my-4 sm:container  md:container  mx-auto  py-16">
        <div className="max-w-7xl mx-auto">
          <div className="">
            <h2 className="text-3xl font-extrabold text-[#FA8232] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:rounded-full px-4 md:px-0 sm:px-0 lg:px-0">
              Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-16  mx-auto">
            <div className="bg-white cursor-pointer rounded overflow-hidden  relative top-0 hover:-top-2 transition-all duration-300 px-4 md:px-0 sm:px-0 lg:px-0">
              <img
                src={image2}
                alt="temple image  "
                className="w-full   h-80 object-cover "
              />
              <button
                type="button"
                className="bg-[#FF9343] hover:bg-[#FF9343] text-white rounded-full px-5 py-2.5 mt-8 transition-all "
              >
                <Link
                  target="_blank"
                  to={
                    "https://www.ttdconline.com/virtualtour/darasuram/index.html"
                  }
                >
                  Virtual tour
                </Link>
              </button>
            </div>
            <div className="bg-white cursor-pointer rounded overflow-hidden  relative top-0 hover:-top-2 transition-all duration-300 px-4 md:px-0 sm:px-0 lg:px-0">
              <img
                src={image3}
                alt="Blog Post 1"
                className="w-full   h-80 object-cover"
              />
              <button
                type="button"
                className="bg-[#FF9343] hover:bg-[#FF9343] text-white rounded-full px-5 py-2.5 mt-8 transition-all"
              >
                <Link
                  target="_blank"
                  to={
                    "https://www.ttdconline.com/virtualtour/darasuram/index.html"
                  }
                >
                  Live Aarti
                </Link>
              </button>
            </div>
            <div className="bg-white cursor-pointer rounded overflow-hidden  relative top-0 hover:-top-2 transition-all duration-300 px-4 md:px-0 sm:px-0 lg:px-0">
              <img
                src={image4}
                alt="Blog Post 1"
                className="w-full   h-80 object-cover"
              />
              <button
                type="button"
                className="bg-[#FF9343] hover:bg-[#FF9343] text-white rounded-full px-5 py-2.5 mt-8 transition-all"
              >
                <Link
                  target="_blank"
                  to={
                    "https://www.ttdconline.com/virtualtour/darasuram/index.html"
                  }
                >
                  {" "}
                  Order Parshad
                </Link>
              </button>
            </div>
            <div className="bg-white cursor-pointer rounded overflow-hidden  relative top-0 hover:-top-2 transition-all duration-300 px-4 md:px-0 sm:px-0 lg:px-0">
              <img
                src={image5}
                alt="Blog Post 1"
                className="w-full   h-80 object-cover"
              />
              <button
                type="button"
                className="bg-[#FF9343] hover:bg-[#FF9343] text-white rounded-full px-5 py-2.5 mt-8 transition-all"
              >
                <Link
                  target="_blank"
                  to={
                    "https://www.ttdconline.com/virtualtour/darasuram/index.html"
                  }
                >
                  Book Guide
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Templedetails;
