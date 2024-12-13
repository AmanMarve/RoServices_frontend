import React from 'react';
import { FaWater, FaTools } from 'react-icons/fa';
import { MdOutlineLocalOffer, MdOutlineSupportAgent } from 'react-icons/md';

const Banner = () => {
  return (
    <div className="mt-5 md:mt-5">
      <div className="bg-blue-50 border border-blue-200 shadow-xl rounded-lg py-4">
        <div className="text-blue-800 flex mt-0 justify-center md:justify-center font-semibold text-[1.1rem] md:text-2xl lg:text-3xl ">
          Find the Perfect Solution for Your Home
        </div>
        <p className="text-center text-[11px] text-gray-600 text-base md:text-lg lg:text-md mb-4">
          High-quality products and exceptional services at your fingertips.
        </p>
        {/* Adjusted the flex direction and sizes for responsiveness */}
        <ul className="grid grid-cols-4 justify-center items-center text-center gap-3">
          <li className="flex flex-col items-center">
            <a href="#" className="flex flex-col items-center">
              <FaWater className="text-blue-600 w-7 h-7 mb-1 lg:w-10 lg:h-10" />
              <span className="text-blue-700 text-[10px] md:text-base">Water Purifiers</span>
            </a>
          </li>
          <li className="flex flex-col items-center">
            <a href="#" className="flex flex-col items-center">
              <FaTools className="text-blue-600 w-7 h-7 mb-1 lg:w-10 lg:h-10" />
              <span className="text-blue-700 text-[10px] md:text-base">RO Equipments</span>
            </a>
          </li>
          <li className="flex flex-col items-center">
            <a href="#" className="flex flex-col items-center">
              <MdOutlineLocalOffer className="text-blue-600 w-7 h-7 mb-1 lg:w-10 lg:h-10" />
              <span className="text-blue-700 text-[10px] md:text-base">Special Offers</span>
            </a>
          </li>
          <li className="flex flex-col items-center">
            <a href="#" className="flex flex-col items-center">
              <MdOutlineSupportAgent className="text-blue-600 w-7 h-7 mb-1 lg:w-10 lg:h-10" />
              <span className="text-blue-700 text-[10px] md:text-base">24/7 Support</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Banner;
