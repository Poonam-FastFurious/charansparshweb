function Cardnew() {
  return (
    <>
      <div className=" py-8">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"></div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold text-gray-700">
            Chic Cow Head Wall Art: Bring Nature Indoors!
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Upgrade Your Space with This Stylish, Nature-Inspired Accent Piece.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className=" rounded-lg  p-4 max-[575px]:w-full max-[575px]:m-auto">
              <img
                src="https://revivehome.in/cdn/shop/files/RH-WD-61_540x.jpg?v=1700558595"
                alt="Green Painted Wall Horse"
                className="w-full max-h-72 object-cover"
              />
              <h3 className="mt-4 text-center text-gray-700">
                Green Painted Wall Horse
              </h3>
              <p className="text-center text-gray-500">Rs. 3,100.00</p>
              <button className="block mx-auto mt-4 px-4 py-2 bg-yellow-200 text-gray-700 rounded hover:bg-yellow-300">
                Add to Cart
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://revivehome.in/cdn/shop/files/RH-WD-61_540x.jpg?v=1700558595"
                alt="White Painted Wall Horse"
                className="w-full h-56 object-cover"
              />
              <h3 className="mt-4 text-center text-gray-700">
                White Painted Wall Horse
              </h3>
              <p className="text-center text-gray-500">Rs. 3,100.00</p>
              <button className="block mx-auto mt-4 px-4 py-2 bg-yellow-200 text-gray-700 rounded hover:bg-yellow-300">
                Add to Cart
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://revivehome.in/cdn/shop/files/RH-WD-61_540x.jpg?v=1700558595"
                alt="Cow Head"
                className="w-full h-56 object-cover"
              />
              <h3 className="mt-4 text-center text-gray-700">Cow Head</h3>
              <p className="text-center text-gray-500">Rs. 3,100.00</p>
              <button className="block mx-auto mt-4 px-4 py-2 bg-yellow-200 text-gray-700 rounded hover:bg-yellow-300">
                Add to Cart
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://revivehome.in/cdn/shop/files/RH-WD-61_540x.jpg?v=1700558595"
                alt="Cow Head"
                className="w-full h-56 object-cover"
              />
              <h3 className="mt-4 text-center text-gray-700">Cow Head</h3>
              <p className="text-center text-gray-500">Rs. 3,100.00</p>
              <button className="block mx-auto mt-4 px-4 py-2 bg-yellow-200 text-gray-700 rounded hover:bg-yellow-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cardnew;
