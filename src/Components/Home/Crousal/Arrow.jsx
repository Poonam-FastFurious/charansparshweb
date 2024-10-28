/* eslint-disable react/prop-types */
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -right-8 transform -translate-y-1/2 cursor-pointer bg-[#FA8232] rounded-full p-2 z-10"
      onClick={onClick}
    >
      <TbChevronRight className="text-white text-2xl" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -left-8 transform -translate-y-1/2 cursor-pointer bg-[#FA8232] rounded-full p-2 z-10"
      onClick={onClick}
    >
      <TbChevronLeft className="text-white text-2xl" />
    </div>
  );
};

export { NextArrow, PrevArrow };
