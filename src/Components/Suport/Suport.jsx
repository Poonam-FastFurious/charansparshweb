import { AiOutlineMessage } from "react-icons/ai";
import { MdCall } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "../../Config";
function Suport() {
  const [openFaq, setOpenFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(Baseurl + "/api/v1/faq/all");
        if (response.data && response.data.data) {
          setFaqs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);
  const handleWhatsappClick = () => {
    // Replace with your phone number
    const phoneNumber = "18005323367";
    // Optional: Replace with your custom message
    const message = "Hello, I need assistance with my service request.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  const handleCallClick = () => {
    // Replace with your phone number
    const phoneNumber = "1800-532-3367";
    window.location.href = `tel:${phoneNumber}`;
  };

  //   const handleEmailClick = () => {
  //     // Replace with your email address
  //     const emailAddress = "Support@Proven.com";
  //     window.location.href = `mailto:${emailAddress}`;
  //   };
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  return (
    <>
      <div className="  sm:container md:container my-8 ">
        <div className=" flex flex-row w-full  gap-4  justify-between  mx-auto sm:container md:container border p-8">
          <div>
            <div className="flex flex-col space-y-2">
              <div className="text-start mb-8">
                <div
                  // Replace with your actual handler
                  className=" bg-yellow-400   text-white font-normal py-2 px-6 rounded-lg  w-40"
                >
                  HELP CENTER
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 ">
                How we can help you!
              </h1>
            </div>
            <div className="bg-gray-100 flex p-1 rounded-full focus-within:bg-white ">
              <input
                type="email"
                placeholder="Enter your question or keyword"
                className="w-full outline-none bg-transparent text-sm text-gray-800 px-4 py-3 rounded-l-md  border-r-0"
                style={{ minWidth: "250px" }}
              />
              <button
                type="button"
                className="bg-[#FF9343]  transition-all text-white font-semibold text-sm l px-6 py-3   rounded-r-md"
              >
                Submit
              </button>
            </div>
          </div>
          <img
            className=" hidden sm:block lg:block "
            src="https://s3-alpha-sig.figma.com/img/c327/69c1/91bfaac4ad4be0342e37cb376c48e8eb?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gN9rmG43KYYnJJ~QpLkR603IxJsBO~CVqMRewVlY7pc2G2o0oH2H0iVG1klyQksLEostk3KqwBqCwM~KcC4lwgqsAP-~HLL2ah~gvTxMikHzfMWIr~YgKg9EIRcEU6cWiFLVgj4Jt6OynUtoofOYhm7QRLqtGOy-bk-Rkgby8mfc7MuBqT4pYpNdOEmQqPPY94ev2N1KlLDl4NZDMSmfI21g3s0HlxncO10cd455N4yrshBcurgPztNYlzh4bIvPqMcCRFqQv93s5hen6A5XOJ1Mm82W2Y2YP7BX49slyCbTvItDjvHv7q2rOIsEuR5cQfCXWlMwZLSyD3OP6bCK7Q__"
            alt=""
          />
        </div>
      </div>
      <div className="sm:container md:container relative   mb-4  ">
        <div className="mx-auto  sm:px-6 lg:px-8 border">
          <div className=" mb-4 text-center">
            <h2 className="text-xl text-center font-bold text-gray-900 mt-16">
              Popular Topics
            </h2>
          </div>
          <section className="gi-faq ">
            <div className="flex flex-wrap justify-between items-center mx-auto  ">
              <div className="w-full flex flex-wrap">
                {faqs.map((faq, index) => (
                  <div
                    key={faq._id}
                    className="min-[992px]:w-[33.33%] w-full px-[12px]"
                  >
                    <div className="gi-accordion style-1">
                      <div className="gi-accordion-item border-[#eee] overflow-hidden mb-[10px]">
                        <h4
                          className="gi-accordion-header m-[0] py-[15px] pl-[30px] pr-[35px] bg-[#f8f8fb] text-[#4b5966] text-[16px] leading-[28px] font-medium relative font-Poppins border-[1px] border-solid border-[#eee] rounded-[5px] tracking-[0.01rem] max-[767px]:text-[15px]"
                          onClick={() => toggleFaq(index)}
                        >
                          {faq.question}
                        </h4>
                        <div
                          className={`gi-accordion-body py-[15px] text-[14px] text-[#777] leading-[24px] ${
                            openFaq === index ? "" : "hidden"
                          }`}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-10 font-[sans-serif] text-[#333]">
        <div className="text-center mb-8">
          <button
            onClick={handleCallClick} // Replace with your actual handler
            className="bg-orange-400 hover:bg-white hover:text-orange-300 border-orange-400 border text-white font-normal py-2 px-6 rounded-lg transition-all duration-300"
          >
            CONTACT US
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-14 text-center">
          Don’t find your answer. Contact with us
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="bg-white flex gap-6 max-lg:flex-col rounded-2xl md:p-8 p-6 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.2)]">
            <h3 className="text-5xl font-extrabold">
              <div
                onClick={handleCallClick}
                className="  bg-[#EAF6FE] rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 "
              >
                <MdCall className=" text-4xl text-[#4d9bcf]" />
              </div>
            </h3>
            <div>
              <p className="text-base font-bold">Call us now</p>
              <p className="text-sm text-gray-500 mt-2 mb-2">
                we are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk
                with use now
              </p>
              <span className=" mt-8 font-bold ">1800-532-3367</span>
            </div>
          </div>
          <div className="bg-white flex gap-6 max-lg:flex-col rounded-2xl md:p-8 p-6 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.2)]">
            <h3 className="text-5xl font-extrabold">
              <div
                className=" bg-[#EAF7E9] rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 "
                onClick={handleWhatsappClick}
              >
                <AiOutlineMessage className=" text-4xl text-[#3fad37]" />
              </div>
            </h3>
            <div>
              <p className="text-base font-bold">Chat with us</p>
              <p className="text-sm text-gray-500 mt-2 mb-2">
                we are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk
                with use now
              </p>
              <span className=" font-bold">Support@charansparsh.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Suport;
