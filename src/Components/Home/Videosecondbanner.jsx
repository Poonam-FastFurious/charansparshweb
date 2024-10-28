import { Link } from "react-router-dom";
import bannervideo from "../../assets/Images/bannervideo.mp4";

function Videosecondbanner() {
  return (
    <>
      <section className="gi-banner wow fadeInUp " data-wow-duration="2s">
        <div className="flex flex-wrap justify-between  ">
          <div className="w-full flex flex-wrap px-[12px]">
            <div className="w-full">
              <video
                className="gi-animated-banner w-full h-[600px] max-[1199px]:h-full  bg-center bg-no-repeat bg-cover overflow-hidden relative"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="200"
                src={bannervideo}
              >
                <div className="gi-bnr-detail h-full py-[80px] px-[100px] max-[991px]:p-[50px] max-[420px]:p-[15px] flex flex-col justify-center items-end text-right relative">
                  <div className="gi-bnr-info">
                    <h3 className="mt-[15px] mb-[15px] text-[#fff] leading-[1.2] font-semibold text-[1.75rem] max-[991px]:text-[20px] max-[767px]:text-[16px] max-[767px]:mt-[5px]">
                      30% off sale{" "}
                      <span className="text-[#fff] font-normal"></span>
                    </h3>
                    <h2 className="text-[50px] max-[1399px]:text-[38px] max-[1199px]:text-[30px] max-[991px]:text-[28px] max-[767px]:text-[20px] max-[480px]:text-[18px] font-bold text-[#fff] leading-[65px] max-[1199px]:leading-[40px] max-[991px]:leading-[35px] max-[767px]:leading-[27px] max-[480px]:leading-[25px] z-[2] relative">
                      Latest Exclusive <br />
                      Summer Collection
                    </h2>
                    <Link
                      to="#"
                      className="gi-btn-2 mt-[15px] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center relative py-[5px] max-[767px]:py-[6px] px-[10px] max-[767px]:px-[10px] bg-[#5caf90] text-[#fff] border-[0] text-[14px] max-[767px]:text-[13px] tracking-[0] font-medium inline-flex items-center hover:bg-[#4b5966] hover:text-[#fff]"
                    >
                      Shop now
                    </Link>
                  </div>
                </div>
              </video>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Videosecondbanner;
