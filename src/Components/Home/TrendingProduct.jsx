import NewCard from "./Crousal/NewCard";
import bgimage from "../../assets/Images/newarrivalbg.jpeg";
function TrendingProduct() {
  return (
    <div className=" relative">
      <div
        className="absolute inset-0 bg-cover bg-center  bg-repeat opacity-15"
        style={{ backgroundImage: `url('${bgimage}')` }}
      ></div>
      <NewCard />
    </div>
  );
}

export default TrendingProduct;
