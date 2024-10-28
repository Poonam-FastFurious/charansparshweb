function Offer() {
  return (
    <div className="px-12 sm:w-[75%] md:w-[75%] w-[100%]  mx-auto  py-16">
      <div className="grid md:grid-cols-2 items-center gap-16">
        <div className="max-md:order-1 max-w-lg">
          <h3 className="text-xl font-semibold mb-4">
            Excited to work together on own team?
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            itaque nemo, fuga corrupti magnam a molestias nulla optio aliquid
            placeat, unde quaerat ratione neque.
          </p>
          <button
            type="button"
            className="bg-[#FF9343] hover:bg-[#FF9343] text-white rounded-full px-5 py-2.5 mt-8 transition-all"
          >
            Learn More
          </button>
        </div>
        <div>
          <img
            src="https://readymadeui.com/contact.webp"
            className="w-full object-contain rounded-md shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] mt-12  sm:mt-0 "
          />
        </div>
      </div>
    </div>
  );
}

export default Offer;
