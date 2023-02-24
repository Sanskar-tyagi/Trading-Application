import React, { useContext } from "react";
import StockContext from "../utils/Stockcontext";

const SearchResults = ({ results }) => {
  const { setStockSymbol } = useContext(StockContext);

  return (
    <ul
      className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-gray-800  custom-scrollbar custom-scrollbar-dark`}
    >
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className={` text-white cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-green-600  transition duration-300`}
            onClick={() => setStockSymbol(item.symbol)}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
