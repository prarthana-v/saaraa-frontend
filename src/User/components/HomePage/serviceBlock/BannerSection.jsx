import React from "react";

const BannerSection = () => {
  return (
    <section
      className="py-24 sm:py-36 md:py-44 lg:py-48 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/duxafj5j5/image/upload/v1733393674/Ready_to_ship_WEB_n307oi.jpg')",
      }}
    >
      <div className="mx-20 p-0 flex flex-wrap lg:flex-nowrap items-center justify-end p-6 rounded-md">
        {/* Text Content */}
        <div className="hidden lg:flex lg:flex-col w-3/4 lg:w-1/2 p-6 text-left bg-white bg-opacity-60 m">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 leading-tight mb-4 montserrat-a tracking-tight">
            Lowest Prices, <br />
            <span className="text-pprimary montserrat-a">Best Quality</span>
          </h1>
          <p className="text-md lg:fs-18 text-gray-600 mb-6 crimson-pro tracking-wide">
            Experience the best in{" "}
            <span className="text-gray-900 underline-pprimary">renting clothes at affordable prices.</span>
            High-quality garments available for every occasion without
            breaking the bank.
          </p>
          <button className="px-7 py-3 bg-pprimary text-white rounded-sm hover:bg-gray-800 transition duration-300">
            Rent Now
          </button>
        </div>
      </div>
    </section>

  );
};

export default BannerSection;
