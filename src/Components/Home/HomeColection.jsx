import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Baseurl } from "../../Config";
import circleimage from "../../assets/Images/circle-vector.png";
function HomeColection() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch(Baseurl + "/api/v1/category/allcategory")
      .then((response) => response.json())
      .then((data) => {
        // Filter out inactive categories
        const activeCategories = data.data.filter(
          (category) => category.isCollectionCategory === true
        );
        setCategories(activeCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  // Function to handle scroll to top when "View More" is clicked
  const handleSmoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Enables smooth scrolling
    });
  };

  return (
    <>
      <div className=" gi-product-tab gi-products py-[40px] max-[767px]:py-[10px] wow fadeInUp relative overflow-hidden  ">
        <img
          src={circleimage}
          alt=""
          className="rotate-images absolute -top-0 -left-40 " // Adjust width/height as needed
        />

        <img
          src={circleimage}
          alt=""
          className="rotate-images absolute -bottom-20 -right-40" // Adjust width/height as needed
        />
        <section className="">
          <div className=" px-4 mx-auto max-w-screen-xl ">
            <div className="max-w-screen-xl text-gray-500 sm:text-lg dark:text-gray-400">
              <h1 className="text-3xl font-semibold text-center text-green-900">
                Collection
              </h1>
              <p className="text-center   text-black  ">
                From fashion-forward accessories to personalized home decor, the
                DIY possibilities are endless with Dritz cover buttons.
              </p>
            </div>
          </div>
        </section>
        <div className="r">
          <h2 className="sr-only">Products</h2>

          <div>
            <div className="sm:container   md:container lg:container mx-4  sm:mx-auto py-8 ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((item, index) => (
                  <div className="bg-white  testimonial-slider  " key={index}>
                    <img
                      src={item.image}
                      alt="Cow Head"
                      className="w-full h-[50vh]  object-cover rounded-xl"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-bold text-center">
                        {item.categoriesTitle}
                      </h2>
                      <p className="mt-2 text-gray-600 text-center">
                        From fashion-forward accessories to personalized home
                        decor, the DIY possibilities are endless with Dritz
                        cover buttons.
                      </p>
                      <Link
                        style={{ display: "flex", justifyContent: "center" }}
                        to={`/product/${item.categoriesTitle}`}
                        className=" text-center inline-block mt-4  w-40   mx-auto  py-2  text-orange-400 border hover:text-white hover:bg-orange-500 border-orange-500 font-semibold rounded-lg"
                        onClick={handleSmoothScrollToTop}
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeColection;
