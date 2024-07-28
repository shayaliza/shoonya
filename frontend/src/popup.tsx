import React, { useState } from "react";
import { createBooking } from "./fetch";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  retreat_id: number;
  retreat_title: string;
  retreat_location: string;
  retreat_price: number;
  retreat_duration: string;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  retreat_id,
  retreat_title,
  retreat_location,
  retreat_price,
  retreat_duration,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    const bookingData = {
      user_id: 0,
      user_name: name,
      user_email: email,
      user_phone: phoneNumber,
      retreat_id: retreat_id,
      retreat_title: retreat_title,
      retreat_location: retreat_location,
      retreat_price: retreat_price,
      retreat_duration: retreat_duration,
      payment_details: "Paid",
      booking_date: new Date().toISOString().split("T")[0],
    };

    console.log("Booking Data:", bookingData);

    try {
      const response = await createBooking(bookingData);
      console.log("Booking response:", response);
      onClose(); // Close the popup on success
    } catch (error: any) {
      console.error("Error creating booking:", error);
      setErrorMessage(error.response?.data?.detail || "An error occurred");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 md:w-3/5 w-11/12  mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-4xl"
          >
            &times;
          </button>
        </div>
        <div className="mb-4">
          <div className="text-gray-700 mb-2">
            <strong>Title:</strong> {retreat_title}
          </div>
          <div className="text-gray-700 mb-2">
            <strong>Location:</strong> {retreat_location}
          </div>
          <div className="text-gray-700 mb-2">
            <strong>Duration:</strong> {retreat_duration} days
          </div>
          <div className="text-gray-700 mb-2">
            <strong>Price:</strong> ₹{retreat_price}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Enter Your Details</h3>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-teal-400"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-teal-400"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-teal-400"
              placeholder="Your Phone Number"
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 font-semibold">
              {errorMessage}
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-rose-300 text-black font-semibold rounded-lg hover:bg-teal-400 transition duration-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
