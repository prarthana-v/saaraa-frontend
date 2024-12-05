import React from "react";
import { FaRegGem, FaShippingFast, FaLock, FaHeadset } from "react-icons/fa";

const ServiceBlock = () => {
  const services = [
    {
      icon: <FaRegGem />,
      title: "Best Quality",
      description: "We provide top-notch quality in every service we offer.",
    },
    {
      icon: <FaShippingFast />,
      title: "Low Rate",
      description: "Get your orders delivered to your doorstep on time.",
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
      description: "Your transactions are safe and secure with us.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "We are here to help you anytime, anywhere.",
    },
  ];

  return (
    <section className="py-md-12 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="py-2 px-1 px-sm-2 py-lg-3 px-lg-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition duration-300"
            >
              <div className="text-3xl md:text-4xl text-gray-700 mb-3 ">{service.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-sm md:text-md text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBlock;
