import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import config from "../Api/api";

const BookApp = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !address || !contact || !date) {
      toast.error("Please fill in all fields");
      return;
    }

    const addUser = { name, address, contact, date };
    console.log("userAdded Successfully");
    const response = await fetch(`${config.apiUrl}api/customer/inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
      toast.error("API ERROR");
      console.log(error)
    }

    if (response.ok) {
      setName("");
      setAddress("");
      setContact("");
      setDate("");
      setError("");
      console.log(addUser);
      toast.success("Appointment booked successfully");
    }
  };

  return (
    <div className="flex flex-col bg-[#F7F7F7] lg:flex-row items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Image Section - Only visible on large screens */}
      <div className="hidden lg:block w-full lg:w-1/2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbkgrLgXtmQI0GD-Ob7rTSxyJ_zzxh3UDZw&s"
          alt="Appointment Illustration"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-gray-300 max-w-lg mx-auto rounded-lg p-6">
        <h2 className="text-xl md:text-3xl font-semibold text-center mb-2 md:mb-4">
          Book An Appointment
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <label className="block">
            Name:
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-400 rounded p-2 w-full mt-1"
              type="text"
              placeholder="Enter name"
            />
          </label>
          <label className="block">
            Address:
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-2 border-gray-400 rounded p-2 w-full mt-1"
              type="text"
              placeholder="Enter address"
            />
          </label>
          <label className="block">
            Contact:
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="border-2 border-gray-400 rounded p-2 w-full mt-1"
              type="number"
              placeholder="Enter contact"
            />
          </label>
          <label className="block">
            Date:
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-2 border-gray-400 rounded p-2 w-full mt-1"
              type="date"
            />
          </label>
          <button className="bg-black text-white font-bold px-2 h-14 py-2 rounded w-full mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>

  );
};

export default BookApp;
