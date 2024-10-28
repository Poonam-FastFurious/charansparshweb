import { useEffect, useState } from "react";
import { Baseurl } from "../../../Config";


function Privacy() {
  const [privacyPolicies, setPrivacyPolicies] = useState([]);

  useEffect(() => {
    // Fetch privacy policy data from the API
    fetch(Baseurl + "/api/v1/privacy")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          // Extract all sections from all privacy policies
          const allSections = data.data.flatMap((policy) => policy.sections);
          setPrivacyPolicies(allSections);
        }
      })
      .catch((error) => {
        console.error("Error fetching privacy policy:", error);
      });
  }, []);

  return (
    <section className="gi-terms-conditions py-[40px] max-[767px]:py-[30px]">
      <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div className="section-title-2 w-full mb-[20px] pb-[20px] flex flex-col justify-center items-center">
          <h2 className="gi-title mb-[0] font-manrope text-[26px] font-semibold text-[#4b5966] relative inline p-[0] capitalize leading-[1]">
            <span className=" text-AFPPrimary">Privacy</span> Policy
          </h2>
          <p className="max-w-[400px] mt-[15px] text-[14px] text-[#777] text-center leading-[23px]">
            Browse The Privacy Policy
          </p>
        </div>
        <div className="flex flex-wrap w-full">
          {privacyPolicies.map((section, index) => (
            <div key={index} className=" w-full px-[12px]">
              <div className="gi-common-wrapper p-[30px] border-solid  my-[0] mx-auto bg-[#fff] ">
                <div className="w-full">
                  <div className="gi-cgi-block-inner">
                    <h5 className="gi-cgi-block-title mb-[10px] text-[18px] font-semibold text-[#4b5966] tracking-[0.01rem] leading-[1.2]">
                      {section.title}
                    </h5>
                    <div
                      className="mb-[30px] text-[#777] text-[14px] font-normal leading-[28px]"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Privacy;