// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UttarPradesh from "../../assets/Images/Uttar Pradesh.jpeg";
import MadhyaPradesh from "../../assets/Images/madhyapradesh.png";
import Rajasthan from "../../assets/Images/Rajasthan.jpeg";
import { useEffect, useState } from "react";
import circleimage from "../../assets/Images/circle-vector.png";
import axios from "axios";
import { Baseurl } from "../../Config";
import { Link } from "react-router-dom";
function HomesecondColection() {
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
  const handleSmoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Enables smooth scrolling
    });
  };
  return (
    <div>
      <body className=" relative overflow-hidden ">
        <img
          src={circleimage}
          alt=""
          className="rotate-images absolute -top-20 -left-40 " // Adjust width/height as needed
        />

        <img
          src={circleimage}
          alt=""
          className="rotate-images absolute -bottom-20 -right-20" // Adjust width/height as needed
        />
        <div className="sm:container   md:container lg:container mx-4   sm:mx-auto py-8 ">
          <h1 className="text-3xl font-semibold text-center text-green-900">
            ODOP & GI
          </h1>
          <p className="text-center text-gray-700 mt-4">
            From fashion-forward accessories to personalized home decor, the DIY
            possibilities are endless with Dritz cover buttons.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {state.slice(0, 3).map((state, index) => (
              <Link
                to={`/StateProduct/${state.State}`}
                key={index}
                className="relative bg-white shadow-lg rounded-lg overflow-hidden"
                onClick={handleSmoothScrollToTop}
              >
                <img
                  src={state.image || UttarPradesh}
                  alt="Madhya Pradesh"
                  className="w-full  object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h2 className="text-white text-xl   font-semibold    tracking-wider">
                    {state.State}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </body>
    </div>
  );
}

export default HomesecondColection;
