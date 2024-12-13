import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../Api/api";

const ImgCard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true; // To prevent setting state after unmounting

    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}api/product/getProductList`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch data");
        }

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          console.error("Error fetching data:", err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup on component unmount
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <div>
        {/* For larger screens */}
        <div className="hidden md:flex h-full justify-center shadow-xl rounded-lg mr-5 ml-5 mt-2 mb-5 border">
          <div className="flex items-center gap-6 mb-4">
            {data
              .filter((ele) => ele.subcategory === "RO purifier")
              .map((ele) => (
                <div
                  key={ele.id}
                  className="h-2/1 hover:-translate-y-3 transition duration-500 delay-500 hover:border-blue-400 p-3 mt-4 rounded-xl border-gray-400 border"
                >
                  <div className="flex justify-center h-32 w-36">
                    <img
                      className="flex w-23 h-32"
                      src={ele.image}
                      alt={ele.name || "Product"}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* For mobile view */}
        <div className="md:hidden flex h-full w-full justify-center shadow-xl rounded-lg mt-2 mb-5 border p-2 overflow-hidden">
          <Link className="flex items-center gap-1">
            {data
              .filter((ele) => ele.subcategory === "RO purifier")
              .map((ele) => (
                <div key={ele.id} className="flex flex-col items-center">
                  <div className="flex justify-center h-14 w-14 mb-1 overflow-hidden">
                    <img
                      className="w-full h-full object-contain"
                      src={ele.image}
                      alt={ele.name || "Product"}
                    />
                  </div>
                </div>
              ))}
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mt-4">
            Failed to load data: {error}
          </div>
        )}
      </div>
    </>
  );
};

export default ImgCard;
