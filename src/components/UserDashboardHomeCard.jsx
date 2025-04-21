import React from "react";
import { FaCheckCircle, FaStar, FaClock } from "react-icons/fa"; // Import icons for each card

const Card = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      <div className={`absolute top-4 right-4 text-4xl ${color}`}>{icon}</div>
      <h3 className="text-lg  font-medium mb-4">{title}</h3>
      <p className="text-4xl text-primary font-bold mb-4">{value}</p>
    </div>
  );
};

export default Card;
