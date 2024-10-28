import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Baseurl } from "../../Config";

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
};

function NewBanner() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(Baseurl + "/api/v1/slider/allslider")
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of image URLs
        setImages(data.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const items = images.map((image, index) => (
    <div className="item" data-value={index} key={index}>
      <img
        style={{ width: "100%" }}
        src={image.sliderImage}
        alt={`banner${index + 1}`}
      />
    </div>
  ));

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      autoPlay
      autoPlayInterval={2000}
      controlsStrategy="alternate"
      disableButtonsControls={true}
      infinite
    />
  );
}

export default NewBanner;
