/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { Carousel, initTWE } from "tw-elements";
import banner from "../../assets/Images/banner---.webp";
import krishna from "../../assets/Images/krishna.png";
import cahreperson from "../../assets/Images/aboutuscharepersonimg.png";
import image from "../../assets/Images/image.webp";
import memberimage from "../../assets/Images/memberimagecharnsparsh.png";
import map from "../../assets/Images/map-charansparsh (1).png";
function Aboutus() {
  useEffect(() => {
    // Initialize tw-elements
    initTWE({ Carousel });
  }, []);
  return (
    <>
      <div id="carouselExampleCaptions" className="relative">
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
          data-twe-carousel-indicators
        ></div>

        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <div
            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-twe-carousel-active
            data-twe-carousel-item
            style={{ backfaceVisibility: "hidden" }}
          >
            <img src={banner} className="block w-full" alt="..." />
          </div>
        </div>
      </div>
      <section className=" sm:container md:container  ">
        <div className="flex flex-wrap justify-between items-center mx-auto  sm:container">
          <div className="flex flex-wrap w-full my-[-12px]">
            <div className="min-[992px]:w-[50%] min-[768px]:w-[50%] w-full ">
              <div className="  h-full flex items-center justify-center flex-col text-center bg-[#fff] ">
                <div>
                  <h4 className="text-[40px]    py-8  ">About Us</h4>
                  <p className=" text-justify px-4 sm:px-0 md:px-0 lg:px-0">
                    'चरण स्पर्श' - The moment a new born touches the mother
                    earth, his journey for learning about his environment
                    begins. Indian ethos is deeply rooted. We need to nurture
                    them and preserve them as is reflected in our tagline -
                    ‘सभ्यता ही संस्कृति. Established amidst the challenges of
                    the pandemic in 2020, Charansparsh was founded with a
                    visionary mission to impart knowledge, raise awareness, and
                    foster a sense of cultural identity among the youth. Beyond
                    cultural enrichment, the organization is committed to
                    addressing national issues, contributing to the development
                    of a progressive nation and a civilized society. The
                    foundation has introduced a first-of-its-kind digital
                    awareness program aimed at connecting today's youth with
                    India's rich cultural heritage. Our foray into digital
                    awareness programs marks a significant step towards engaging
                    today's youth in a meaningful exploration of India's
                    cultural richness and awareness of various safety measures.
                    By utilizing digital platforms, the organization is not only
                    imparting knowledge but also fostering a sense of
                    responsibility and pride among the youth. In doing so,
                    Charansparsh is contributing to the vision of a progressive
                    nation and a civilized society, where the youth are not just
                    the future, but active participants in shaping a brighter
                    tomorrow. In its continued commitment to youth engagement
                    and societal progress, Charansparsh has embarked on a
                    pioneering journey into the realm of road safety awareness
                    through its program Count Safety First (CSF). This
                    initiative seamlessly blends the physical and digital
                    worlds, harnessing the power of both to instill a sense of
                    responsibility, pride, and safety consciousness among the
                    youth and the citizens.
                  </p>
                </div>
              </div>
            </div>
            <div className="min-[992px]:w-[50%] min-[768px]:w-[50%] w-full ">
              <div className="  h-full flex items-center justify-center flex-col text-center bg-[#fff] ">
                <div>
                  <img
                    src={image}
                    alt=""
                    className="rounded-md object-contain w-full h-full px-4 sm:px-0 md:px-0 "
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 pl-md-5 ftco-animate fadeInUp ftco-animated">
              <p className=" text-justify  px-4 sm:px-0 md:px-0 lg:px-0  ">
                CSF (Count Safety First), the name itself underscores the idea
                that safety should always be a top priority in various aspects
                of life, whether it's at work, at home, or on the road.
                Prioritizing safety means taking precautions and making informed
                decisions to minimize the risk of accidents, injuries, or harm
                to one-self and others. "CSF count safety first" is a reminder
                to always consider safety as a fundamental concern on the road
                while driving or crossing the roads. Obeying traffic rules,
                staying alert, using crosswalks and pedestrian signals, and
                being cautious when driving. CSF aims to digitally reach a vast
                audience, including corporate professionals, students, and
                drivers across the nation. Additionally, we plan to organize
                physical events, particularly in North India, to engage with the
                community on a personal level. The vision our honorable Minister
                Shri Nitin Gadkari Ji of Road Transport and Highway’s (MoRTH),
                to reduce accidents by 50% in 2030’ is the mission of CSF and
                its aim is to bring that vision into reality, by conducting the
                awareness program among the citizens. Communicating this vision
                effectively to the public is crucial for garnering support and
                encouraging responsible behavior.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className=" sm:container md:container ">
        <div className=" mx-auto sm:px-0 md:px-0 px-2 py-6 bg-white ">
          <div className="grid grid-cols-1 md:grid-cols-2   gap-10">
            <div>
              <img
                src={cahreperson}
                alt="Image"
                className="rounded-md object-contain w-full h-full px-2 sm:px-0 md:px-0"
              />
            </div>
            <div>
              <h2 className="text-[40px]    mb-4">Our Chairperson</h2>
              <p className="text-gray-700 text-sm leading-6 mt-8 px-2  sm:px-0 md:px-0">
                Ms. Maya Thakur is a result-driven, self-motivated and
                resourceful professional with an unparalleled proven track
                record, blessed with an entrepreneurial vision and path-
                breaking methods which enabled her to attain the glorious
                heights at the top level in higher education and the service
                industry at a young age by dint of commitment and hard work and
                nurtured effective leadership capabilities. Her strategic
                redirection of ICE(I) called performance with a purpose has been
                largely successful and involved creating long-term growth while
                leaving a positive impact on society and environment. During the
                course of her visits to the remote areas of different states of
                India, the Indian art and craft and the conditions of artisans
                especially women have pulled up the strings of her heart towards
                the cause of upliftment of these vulnerable groups. In order to
                contribute effectively for this cause she established,
                CharanSparsh Foundation to empower the roots of India. This will
                facilitate to seed the Indian Sanskar amongst the children and
                younger generations and thus turning communities by empowering
                the women folks With a fervent dedication to empowering women
                and enhancing community development, she leads skill training
                initiatives focused on uplifting women. Committed to the "Vocal
                for Local" movement, she directs her passion toward equipping
                women with vital skills, facilitating their success in both
                personal and professional spheres. Furthermore, as an ardent
                advocate for road safety awareness, she utilizes her expertise
                to develop impactful programs that enhance safety and well-being
                within communities. With a background in education, she brings a
                wealth of knowledge to her role, leading campaigns, workshops,
                and educational endeavors aimed at promoting road safety and
                preventing accidents. If one takes a closer look at her style of
                working, the two distinct virtues that define her are
                leadership, spirit and relentless will to keep doing good for
                women in need. She is the vocal supporter of the rights of
                women.
              </p>
            </div>
          </div>{" "}
          <div className="col-md-12 pl-md-5 ftco-animate fadeInUp ftco-animated">
            <p className=" text-justify  "></p>
          </div>
        </div>
      </div>
      <div className="bg-[#F6E8DD]">
        <div className="  sm:container md:container  ">
          <div className="   mx-auto  py-6 px-4 sm:px-0 md:px-0 lg:px-0  ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-extrabold  mb-4">
                  Indian Culture
                </h2>
                <p className="text-gray-700 text-sm leading-6">
                  Lorem ipsum dolor sit amet consectetur. Elementum sem
                  malesuada velit massa faucibus ornare eget. Varius venenatis
                  ut maecenas ultrices placerat condimentum nulla. Nibh vel
                  nullam donec urna in purus egestas est tellus. Bibendum
                  natoque et vitae sed magnis scelerisque congue amet. Non odio
                  elit ultrices habitasse malesuada diam in id sed. At eget
                  risus sed quis pulvinar habitant vitae vitae. Eget semper
                  vestibulum eu tristique et convallis elementum semper posuere.
                  Sed integer non velit justo varius amet. Vestibulum proin
                  justo dictum vestibulum quis at ut ut. Quis sem malesuada nec
                  et orci facilisi leo. Amet enim condimentum montes rhoncus
                  arcu scelerisque viverra risus ut.
                </p>
              </div>
              <div>
                <img
                  src={krishna}
                  alt="Image"
                  className="rounded-md object- w-full h-[408px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" sm:container  md:container  ">
        <div className=" mx-auto py-6 bg-white ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <img
                src={map}
                alt="Image"
                className="rounded-md object-cover w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold  mb-4 px-4 sm:px-0 md:px-0">
                Our Vision
              </h2>
              <p className="text-gray-700 text-sm leading-6 px-4 sm:px-0 md:px-0">
                Lorem ipsum dolor sit amet consectetur. Elementum sem malesuada
                velit massa faucibus ornare eget. Varius venenatis ut maecenas
                ultrices placerat condimentum nulla. Nibh vel nullam donec urna
                in purus egestas est tellus. Bibendum natoque et vitae sed
                magnis scelerisque congue amet. Non odio elit ultrices habitasse
                malesuada diam in id sed. At eget risus sed quis pulvinar
                habitant vitae vitae. Eget semper vestibulum eu tristique et
                convallis elementum semper posuere. Sed integer non velit justo
                varius amet. Vestibulum proin justo dictum vestibulum quis at ut
                ut. Quis sem malesuada nec et orci facilisi leo. Amet enim
                condimentum montes rhoncus arcu scelerisque viverra risus ut.
              </p>
              <ul className="list-disc text-sm text-gray-700 space-y-2 pl-8 sm:pl-4 md:pl-4 mt-6 ">
                <li className="">Discover innovative ideas.</li>
                <li>Create unique projects.</li>
                <li>Collaborate with like-minded individuals.</li>
                <li>Transform your visions into reality.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-12  hidden ">
        <div className="container mx-auto">
          <h2 className="text-gray-800 sm:text-4xl text-2xl font-extrabold text-center mb-16">
            Our core team member
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2  mx-auto gap-8">
            <div className="p-6 flex gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <img
                src={memberimage}
                className="w-16 h-16 bg-gray-100 p-3 rounded-full shrink-0"
                alt=""
              />
              <div>
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Rahul raj
                </h3>
                <p>Chief Executive Officer</p>
              </div>
            </div>
            <div className="p-6 flex gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <img
                src={memberimage}
                className="w-16 h-16 bg-gray-100 p-3 rounded-full shrink-0"
                alt=""
              />
              <div>
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Rahul raj
                </h3>
                <p>Chief Executive Officer</p>
              </div>
            </div>
            <div className="p-6 flex gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <img
                src={memberimage}
                className="w-16 h-16 bg-gray-100 p-3 rounded-full shrink-0"
                alt=""
              />
              <div>
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Rahul raj
                </h3>
                <p>Chief Executive Officer</p>
              </div>
            </div>
            <div className="p-6 flex gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <img
                src={memberimage}
                className="w-16 h-16 bg-gray-100 p-3 rounded-full shrink-0"
                alt=""
              />
              <div>
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Rahul raj
                </h3>
                <p>Chief Executive Officer</p>
              </div>
            </div>
            <div className="p-6 flex gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <img
                src={memberimage}
                className="w-16 h-16 bg-gray-100 p-3 rounded-full shrink-0"
                alt=""
              />
              <div>
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Rahul raj
                </h3>
                <p>Chief Executive Officer</p>
              </div>
            </div>{" "}
            <div className="p-6 flex gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <img
                src={memberimage}
                className="w-16 h-16 bg-gray-100 p-3 rounded-full shrink-0"
                alt=""
              />
              <div>
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Rahul raj
                </h3>
                <p>Chief Executive Officer</p>
              </div>
            </div>{" "}
            <div className="p-6 flex gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <img
                src={memberimage}
                className="w-16 h-16 bg-gray-100 p-3 rounded-full shrink-0"
                alt=""
              />
              <div>
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Rahul raj
                </h3>
                <p>Chief Executive Officer</p>
              </div>
            </div>
            <div className="p-6 flex gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <img
                src={memberimage}
                className="w-16 h-16 bg-gray-100 p-3 rounded-full shrink-0"
                alt=""
              />
              <div>
                <h3 className="text-gray-800 text-xl font-semibold mb-3">
                  Rahul raj
                </h3>
                <p>Chief Executive Officer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="  px-4 sm:px-0 md:px-0 lg:px-0 ">
        <div className="grid lg:grid-cols-3 md:grid-cols-2  mx-auto gap-8  py-4  sm:container md:container ">
          <div className="p-6 rounded-lg  shadow-md py-12">
            <div className="flex items-center">
              <img
                src="https://charansparshfoundation.com/images/logos/amity.png"
                className="w-20 h-20 rounded-full "
              />
              <div className="ml-6">
                <h4 className="text-gray-800 text-lg font-extrabold">
                  Amity University
                </h4>
                <p className="text-gray-800 text-sm  leading-normal">
                  The road safety workshop was incredibly informative, engaging,
                  and eye-opening. Our students gained valuable knowledge and
                  skills for safer driving.
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg  shadow-md py-12">
            <div className="flex items-center">
              <img
                src="https://charansparshfoundation.com/images/logos/NCU%20Logo-1.webp"
                className="w-20 h-20 rounded-full flex-wrap"
              />
              <div className="ml-6">
                <h4 className="text-gray-800 text-lg font-extrabold">
                  North Cap University
                </h4>
                <p className="text-gray-800 text-sm  leading-normal">
                  Thank you for the impactful road safety workshop. It was
                  well-received by our students, who appreciated the practical
                  tips and interactive sessions.
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="p-6 rounded-lg  shadow-md py-12">
            <div className="flex items-center">
              <img
                src="https://charansparshfoundation.com/images/logos/gautam_budh.png"
                className="w-20 h-20 rounded-full flex-wrap"
              />
              <div className="ml-6">
                <h4 className="text-gray-800 text-lg font-extrabold">
                  Gautam Buddha Univeristy
                </h4>{" "}
                <p className="text-gray-800 text-sm    leading-normal">
                  The road safety workshop was a resounding success! The content
                  was relevant, and the delivery was excellent. We look forward
                  to future collaborations.....
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
