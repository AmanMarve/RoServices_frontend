import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <h1 className="text-lg font-semibold text-center mb-6">Contact Us</h1>

      <div className="flex flex-col md:flex-row justify-center gap-12 text-center">

        <div>
          <MdOutlineMailOutline className="h-8 w-8 mx-auto mb-2" />
          <h5 className="text-md font-bold">Mail Us</h5>
          <p className="text-sm text-gray-300">ganeshderkar@gmail.com</p>
        </div>

        <div>
          <IoCallOutline className="h-8 w-8 mx-auto mb-2" />
          <h5 className="text-md font-bold">Call Us</h5>
          <p className="text-sm text-gray-300">9049384729</p>
        </div>

        <div>
          <IoLocationOutline className="h-8 w-8 mx-auto mb-2" />
          <h5 className="text-md font-bold">Address</h5>
          <p className="text-sm text-gray-300">Babupeth, Chandrapur, MH</p>
        </div>

      </div>

      <div className="text-center text-sm text-gray-400 mt-6">
        © 2024 Ganesh Derkar. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
