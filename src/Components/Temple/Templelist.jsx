import { useEffect } from "react";
import { Carousel, initTWE } from "tw-elements";
import banner from "../../assets/Images/bannercharnspars.jpeg";
import image from "../../assets/Images/temple/kshi.jpg";
import image2 from "../../assets/Images/temple/Omkareshwar-Temple.jpg";
import image3 from "../../assets/Images/temple/mhakaleshwar.jpg";
import image4 from "../../assets/Images/temple/somnath.jpg";
import image5 from "../../assets/Images/temple/kedarnath.jpg";
import image6 from "../../assets/Images/temple/Baidyanath-temple.jpg";
import { Link } from "react-router-dom";
function Templelist() {
  useEffect(() => {
    initTWE({ Carousel });
  }, []);
  return (
    <>
      <div id="carouselExampleCaptions" className="relative">
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
          data-twe-carousel-indicators
        ></div>

        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <div
            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-twe-carousel-active
            data-twe-carousel-item
            style={{ backfaceVisibility: "hidden" }}
          >
            <img src={banner} className="block w-full" alt="..." />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full  ">
        <section className="bg-white  sm:container md:container ">
          <div className="py-8 px-4 mx-auto w-full  sm:container md:container">
            <div className="max-w-screen-xl text-gray-500 sm:text-lg">
              <h2 className="mb-4 text-xl tracking-tight font-bold text-[#FA8232]">
                Select your temple
              </h2>
            </div>
          </div>
        </section>

        <div className=" sm:container md:container  mx-auto flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="bg-white w-full  lg:max-w-md rounded-lg overflow-hidden mx-auto">
            <div className="min-h-auto mx-4">
              <img
                src={image}
                className="w-full  object-cover"
                alt="Kashi Vishwanath Temple"
              />
            </div>
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-gray-800 text-lg sm:text-xl font-bold text-center mb-4">
                Kashi Vishwanath Temple
              </h3>
              <button
                type="button"
                className="py-2.5 rounded-lg text-white text-sm tracking-wider bg-[#F28330] flex justify-center w-[50%] lg:w-[25%]"
              >
                <Link to="/templedetails">Visit Now</Link>
              </button>
            </div>
          </div>
          <div className="bg-white w-full  lg:max-w-md rounded-lg overflow-hidden mx-auto">
            <div className="min-h-auto mx-4">
              <img
                src={image2}
                className="w-full  object-cover"
                alt="Kashi Vishwanath Temple"
              />
            </div>
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-gray-800 text-lg sm:text-xl font-bold text-center mb-4">
                Omkareshwar Temple
              </h3>
              <button
                type="button"
                className="py-2.5 rounded-lg text-white text-sm tracking-wider bg-[#F28330] flex justify-center w-[50%] lg:w-[25%]"
              >
                <Link to="/templedetails">Visit Now</Link>
              </button>
            </div>
          </div>

          <div className="bg-white w-full max-w-sm lg:max-w-md rounded-lg overflow-hidden mx-auto">
            <div className="min-h-auto mx-4 sm:px-0 md:px-0 lg:px-0">
              <img
                src={image3}
                className="w-full  object-cover"
                alt="Mahakaleshwar Temple"
              />
            </div>
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-gray-800 text-lg sm:text-xl font-bold text-center mb-4">
                Mahakaleshwar Temple
              </h3>
              <button
                type="button"
                className="py-2.5 rounded-lg text-white text-sm tracking-wider bg-[#F28330] flex justify-center w-[50%] lg:w-[25%]"
              >
                <Link to="/templedetails">Visit Now</Link>
              </button>
            </div>
          </div>
        </div>
        <div className=" sm:container md:container  mx-auto flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="bg-white w-full  lg:max-w-md rounded-lg overflow-hidden mx-auto">
            <div className="min-h-auto mx-4">
              <img
                src={image4}
                className="w-full  object-cover"
                alt="Kashi Vishwanath Temple"
              />
            </div>
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-gray-800 text-lg sm:text-xl font-bold text-center mb-4">
                Somnath Temple
              </h3>
              <button
                type="button"
                className="py-2.5 rounded-lg text-white text-sm tracking-wider bg-[#F28330] flex justify-center w-[50%] lg:w-[25%]"
              >
                <Link to="/templedetails">Visit Now</Link>
              </button>
            </div>
          </div>
          <div className="bg-white w-full  lg:max-w-md rounded-lg overflow-hidden mx-auto">
            <div className="min-h-auto mx-4">
              <img
                src={image5}
                className="w-full  object-cover"
                alt="Kashi Vishwanath Temple"
              />
            </div>
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-gray-800 text-lg sm:text-xl font-bold text-center mb-4">
                Kedarnath Temple
              </h3>
              <button
                type="button"
                className="py-2.5 rounded-lg text-white text-sm tracking-wider bg-[#F28330] flex justify-center w-[50%] lg:w-[25%]"
              >
                <Link to="/templedetails">Visit Now</Link>
              </button>
            </div>
          </div>

          <div className="bg-white w-full max-w-sm lg:max-w-md rounded-lg overflow-hidden mx-auto">
            <div className="min-h-auto mx-4 sm:px-0 md:px-0 lg:px-0">
              <img
                src={image6}
                className="w-full  object-cover"
                alt="Mahakaleshwar Temple"
              />
            </div>
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-gray-800 text-lg sm:text-xl font-bold text-center mb-4">
                Baidyanath Temple
              </h3>
              <button
                type="button"
                className="py-2.5 rounded-lg text-white text-sm tracking-wider bg-[#F28330] flex justify-center w-[50%] lg:w-[25%]"
              >
                <Link to="/templedetails">Visit Now</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full text-gray-500 sm:text-lg dark:text-gray-400 py-4 flex justify-center items-center mx-auto pt-8">
          <button
            type="button"
            className="py-2.5 rounded-lg text-white text-sm tracking-wider bg-[#F28330] flex justify-center w-[50%] sm:w-[25%] lg:w-[10%]"
          >
            READ MORE
          </button>
        </div>
      </div>
    </>
  );
}

export default Templelist;
