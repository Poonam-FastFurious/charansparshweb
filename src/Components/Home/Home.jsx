// import Banner from "./Banner";

// import Cardnew from "../Cardnew/Cardnew";
import Crausal from "./Crousal/Crausal";
import HomeColection from "./HomeColection";
import HomesecondColection from "./HomesecondColection";
import NewArrival from "./NewArrival";
import NewBanner from "./NewBanner";
// import Offer from "./Offer";
import Secondbanner from "./Secondbanner";
import Testimonial from "./Testimonial";
import VideoBanner from "./VideoBanner";
// import Videosecondbanner from "./Videosecondbanner";
// import TrendingProduct from "./TrendingProduct";

function Home() {
  return (
    <>
      <NewBanner />
      <HomeColection />
      <HomesecondColection />
      <Crausal heading="Best Selling" />
      <Secondbanner />
      <Crausal heading=" New Arrival" />
      <NewArrival />
      <Testimonial />
      <VideoBanner />
    </>
  );
}

export default Home;
