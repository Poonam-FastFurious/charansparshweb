// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UttarPradesh from "../../../assets/Images/Uttar Pradesh.jpeg";
import MadhyaPradesh from "../../../assets/Images/madhyapradesh.png";
import Rajasthan from "../../../assets/Images/Rajasthan.jpeg";

// import bannervideo from "../../../assets/Images/FINAL jaipur pro4.mp4";
import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { Baseurl } from "../../../Config";
function Detailsproduct() {
  const [state, setState] = useState([]);
  const fetchstate = async () => {
    try {
      const response = await axios.get(Baseurl + "/api/v1/State");
      const stateData = response.data.data;

      // Array of images corresponding to the states
      const imagesArray = [UttarPradesh, MadhyaPradesh, Rajasthan];

      // Assigning each state an image from the imagesArray
      const updatedStateData = stateData.map((stateItem, index) => ({
        ...stateItem,
        image: imagesArray[index], // Assign image from the imagesArray
      }));

      setState(updatedStateData); // Set the updated state data with images
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchstate();
  }, []);

  return (
    <div>
      {/* <section className=" ">
        <div className="">
          <div className="w-full flex flex-wrap">
            <div className="min-[768px]:w-[100%] w-full ">
              <div className="gi-ofr-banners ">
                <div className=" flex flex-row relative overflow-hidden ">
                  <div className=" w-full relative  sm:h-[550px] md:h-[550px] lg:h-[550px]">
                    <video src={"bannervideo"} autoPlay loop></video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div className="bg-[#F6E8DD] relative overflow-hidden ">
        <img
          src="https://charansparsh.in/circle-vector.295669bfeaa9a830.png"
          alt=""
          className="rotate-images absolute -top-20 -left-40 " // Adjust width/height as needed
        />

        {/* <img
          src="https://charansparsh.in/circle-vector.295669bfeaa9a830.png"
          alt=""
          className="rotate-images absolute -bottom-20 -right-20" // Adjust width/height as needed
        /> */}
        <div className="sm:container md:container lg:container  xl:container mx-auto py-12 z-50">
          <h1 className="text-3xl font-semibold text-center text-green-900">
            State Wise Collection
          </h1>
          <p className="text-center text-gray-700 mt-4">
            From fashion-forward accessories to personalized home decor, the DIY
            possibilities are endless with Dritz cover buttons.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-12 px-4 sm:px-0 md:px-0">
            {state.slice(0, 3).map((state, index) => (
              <Link
                to={`/StateProduct/${state.State}`}
                key={index}
                className="relative bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={state.image || UttarPradesh}
                  alt="Madhya Pradesh"
                  className="w-full  object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h2 className="text-white text-xl font-bold">
                    {state.State}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailsproduct;
