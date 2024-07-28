import React, { useState } from "react";
import {
  FaDollarSign,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import Popup from "./popup";
interface CardProps {
  retreat_id: number;
  image: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  location: string;
  price: number;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  duration,
  date,
  location,
  price,
  retreat_id,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBookClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <img
        src={image}
        alt="Retreat"
        className="w-full h-28 md:h-56 object-cover rounded-t-3xl"
      />
      <div className="p-4 bg-transparent backdrop-blur-3xl border-b-2 border-black rounded-b-3xl flex flex-col flex-grow border-r-2">
        {title && (
          <div className="text-lg md:text-xl font-semibold text-center mb-2 truncate">
            {title}
          </div>
        )}
        <div className="flex flex-col gap-2 mb-4">
          {description && (
            <div className="flex items-start">
              <FaInfoCircle className="text-gray-600 mr-2" />
              <p className="text-sm text-gray-700 truncate">{description}</p>
            </div>
          )}
          <div className="flex justify-between items-center">
            {duration && (
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-600 mr-2" />
                <p className="text-sm text-gray-700">
                  Duration : {duration} days
                </p>
              </div>
            )}
            {location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-600 mr-2" />
                <p className="text-sm text-gray-700">{location}</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            {price !== undefined && (
              <div className="flex items-center">
                <FaDollarSign className="text-gray-600 mr-2" />
                <p className="text-sm text-gray-700">₹ {price}</p>
              </div>
            )}
            {date && (
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-600 mr-2" />
                <p className="text-sm text-gray-700">{date}</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-auto">
          <button
            className="w-full py-2 bg-rose-300 text-black font-semibold rounded-lg hover:bg-teal-400 transition duration-300"
            onClick={handleBookClick}
          >
            Book
          </button>
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Booking Confirmation"
        retreat_id={retreat_id}
        retreat_title={title}
        retreat_location={location}
        retreat_price={price}
        retreat_duration={duration}
      />
    </div>
  );
};

export default Card;
