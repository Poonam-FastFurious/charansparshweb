import { useEffect, useState } from "react";
import { Baseurl } from "../../../Config";


function ReturnPolicy() {
  const [returnPolicy, setReturnPolicy] = useState("");

  useEffect(() => {
    // Fetch return policy data from the API
    fetch(Baseurl + "/api/v1/Returnpolicy")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data) {
          // Extract the return policy content
          setReturnPolicy(data.data.ReturnPolicy);
        }
      })
      .catch((error) => {
        console.error("Error fetching return policy:", error);
      });
  }, []);

  return (
    <section className="gi-terms-conditions py-[40px] max-[767px]:py-[30px]">
      <div className="flex flex-wrap justify-between items-center mx-auto  sm:container md:container">
        <div className="section-title-2 w-full mb-[20px] pb-[20px] flex flex-col justify-center items-center">
          <h2 className="gi-title mb-[0] font-manrope text-[26px] font-semibold text-[#4b5966] relative inline p-[0] capitalize leading-[1]">
            <span className=" text-AFPPrimary">Return </span> Policy
          </h2>
          <p className="max-w-[400px] mt-[15px] text-[14px] text-[#777] text-center leading-[23px]">
            Browse The Return Policy
          </p>
        </div>
        <div className="flex flex-wrap w-full px-4 sm:px-0 md:px-0 lg:px-0 xl:px-0 sm:container md:container">
          <div
            className="return-policy-content"
            dangerouslySetInnerHTML={{ __html: returnPolicy }}
          />
        </div>
      </div>
    </section>
  );
}

export default ReturnPolicy;