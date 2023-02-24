import React from "react";

const ChartFilter = ({ text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center cursor-pointer ${
        active
          ? "bg-green-600 border-green-700 text-gray-100"
          : "border-green-300 text-green-300"
      } transition duration-200 hover:bg-green-600 hover:text-gray-100 hover:border-green-700`}
    >
      {text}
    </button>
  );
};

export default ChartFilter;
