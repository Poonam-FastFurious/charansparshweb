import { useEffect, useState } from "react";
import { Carousel, initTWE } from "tw-elements";
import { Baseurl } from "../../Config";

function Banner() {
  const [bannerImages, setBannerImages] = useState([]);
  useEffect(() => {
    // Fetch images from API
    fetch(Baseurl + "/api/v1/slider/allslider")
      .then((response) => response.json())
      .then((data) => {
        setBannerImages(data.data); // Adjust according to your API response structure
      })
      .catch((error) => console.error("Error fetching banner images:", error));
  }, []);
  useEffect(() => {
    // Check if the carousel elements are available
    const checkElements = () => {
      const carouselElement = document.querySelector(
        "#carouselExampleCaptions"
      );
      console.log("Carousel Element:", carouselElement); // Debugging

      if (carouselElement) {
        initTWE({ Carousel });
      } else {
        console.error("Carousel element not found");
      }
    };

    // Delay initialization
    const timer = setTimeout(checkElements, 1000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, [bannerImages]);

  return (
    <>
      <div>
        <div className=" bottom-0 left-0 right-0 z-[2] mb-4 flex list-none justify-center p-0">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              type="button"
              data-twe-target="#carouselExampleCaptions"
              data-twe-slide-to={index}
              className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none ${
                index === 0 ? "data-twe-carousel-active" : ""
              }`}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
                index === 0 ? "data-twe-carousel-active" : ""
              }`}
              data-twe-carousel-item
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src={image.sliderImage}
                className="block w-full"
                alt={`Slide ${index + 1}`}
              />
              <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                <h5 className="text-xl">Slide {index + 1} label</h5>
              </div>
            </div>
          ))}
        </div>

        <button
          className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-twe-target="#carouselExampleCaptions"
          data-twe-slide="prev"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Previous
          </span>
        </button>

        <button
          className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-twe-target="#carouselExampleCaptions"
          data-twe-slide="next"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
      </div>
    </>
  );
}

export default Banner;
