import bannervideo from "../../assets/Images/bannervideo.mp4";
function VideoBanner() {
  return (
    <>
      {/* <div className=" bg-[#F6E8DD]">
      <section className="gi-offer-section overflow-hidden py-[40px] max-[767px]:py-[30px] container ">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="w-full flex flex-wrap">
            <div
              className="min-[768px]:w-[50%] w-full wow fadeInLeft"
              data-wow-duration="2s"
            >
              <div className="gi-ofr-banners ">
                <div className=" flex flex-row relative overflow-hidden rounded-l-md">
                  <div className=" w-full relative">
                    <video src={bannervideo} autoPlay loop muted></video>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="min-[768px]:w-[50%] w-full  wow fadeInRight"
              data-wow-duration="2s"
            >
              <div className="gi-ofr-banners max-[767px]:mt-[30px]  bg-[#401700]">
                <div className="gi-bnr-body flex flex-row relative overflow-hidden">
                  <div className="gi-bnr-img w-full relative ">
                    <div
                      //   src={bannerImage}
                      alt="banner"
                      className="w-full  h-[370px] "
                    />
                  </div>
                  <div className="gi-bnr-detail max-w-[400px]  flex flex-col items-start justify-center absolute top-[50%] right-[50px] translate-y-[-50%] max-[1199px]:max-w-[160px] max-[1199px]:right-[15px] max-[991px]:max-w-[110px] max-[767px]:max-w-[155px] max-[420px]:max-w-[150px] max-[360px]:max-w-[110px] max-[360px]:top-auto max-[360px]:bottom-[30px] max-[360px]:right-[15px] max-[360px]:transform-none">
                    <p className="text-white mb-[16px] text-[16px] leading-[22px] capitalize font-normal max-[991px]:hidden max-[767px]:block max-[767px]:text-[14px] max-[420px]:text-[13px] max-[420px]:leading-[17px] max-[360px]:hidden">
                      We supporting
                    </p>
                    <h5 className="text-white text-[34px] font-bold leading-[1.2] capitalize mb-[6px] max-[1399px]:text-[28px] max-[1199px]:text-[22px] max-[991px]:text-[16px] max-[767px]:text-[20px] max-[420px]:text-[16px] pb-4">
                      the hands that craft our heritage
                    </h5>

                    <a
                      href="#"
                      className="gi-btn-2 transition-all duration-[0.3s] ease-in-out overflow-hidden text-center relative rounded-[5px] py-[5px]  max-[360px]:py-[3px] px-[15px] max-[360px]:px-[10px]   border-white text-[#fff] border-[1px] text-[14px] max-[360px]:text-[13px] tracking-[0] font-medium inline-flex items-center hover:bg-[#4b5966] hover:text-[#fff]"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div> */}
      <div
  className="sm:container md:container lg:container mx-4 sm:mx-auto py-8"
  data-wow-duration="2s"
>
  <div className="w-full flex flex-wrap px-[12px]">
    <div className="w-full">
      <div
        className="gi-animated-banner w-full overflow-hidden relative rounded-[5px]"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="200"
      >
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover z-[1] rounded-[5px] "
        >
          <source
            src={bannervideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="gi-bnr-detail h-full py-[80px] px-[100px] max-[991px]:p-[50px] max-[420px]:p-[15px] flex flex-col justify-center items-end text-right relative z-[2]">
          <div className="gi-bnr-info">
          <p className="text-white mb-[16px] text-[16px] leading-[22px] capitalize font-normal max-[991px]:hidden max-[767px]:block max-[767px]:text-[14px] max-[420px]:text-[13px] max-[420px]:leading-[17px] max-[360px]:hidden">
                      We supporting
                    </p>
            <h2 className="text-[50px] max-[1399px]:text-[38px] max-[1199px]:text-[30px] max-[991px]:text-[28px] max-[767px]:text-[20px] max-[480px]:text-[18px] font-bold text-white leading-[65px] max-[1199px]:leading-[40px] max-[991px]:leading-[35px] max-[767px]:leading-[27px] max-[480px]:leading-[25px] z-[2] relative">
            the hands that <br /> craft our heritage
            </h2>
          
            <a
              href="shop-left-sidebar-col-3.html"
              className="gi-btn-2 mt-[15px] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center relative rounded-[5px] py-[5px] max-[767px]:py-[6px] px-[10px] max-[767px]:px-[10px] bg-orange-400 text-[#fff] border-[0] text-[14px] max-[767px]:text-[13px] tracking-[0] font-medium inline-flex items-center hover:bg-[#4b5966] hover:text-[#fff]"
            >
              Shop now
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default VideoBanner;
