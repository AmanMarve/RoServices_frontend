import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ImgCard = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    async function getData() {
        const response = await fetch("http://localhost:5000/api/product/getProductList"); // Custom API
        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
            console.log(error);
        }

        if (response.ok) {
            setData(result);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <div>
                {/* For larger screens */}
                <div className="hidden md:flex h-full justify-center shadow-xl rounded-lg mr-5 ml-5 mt-2 mb-5 border">
                    <div className="flex items-center gap-6 mb-4">
                        {data.filter((ele) => ele.subcategory === "RO purifier").map((ele) => (
                            <div key={ele.id} className="h-2/1 hover:-translate-y-3 transition duration-500 delay-500 hover:border-blue-400 p-3 mt-4 rounded-xl border-gray-400 border">
                                <div className="flex justify-center h-32 w-36">
                                    <img className="flex w-23 h-32" src={ele.image} alt="card-img" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* For mobile view */}
                <div className="md:hidden flex h-full w-full justify-center shadow-xl rounded-lg  mt-2 mb-5 border p-2 overflow-hidden">
                    <Link className="flex items-center gap-1"> {/* Use gap for spacing */}
                        {data.filter((ele) => ele.subcategory === "RO purifier").map((ele) => (
                            <div key={ele.id} className="flex flex-col items-center"> {/* Center images */}
                                <div className="flex justify-center h-14 w-14 mb-1 overflow-hidden"> {/* Smaller fixed size */}
                                    <img className="w-full h-full object-contain" src={ele.image} alt="mobile-view-card" /> {/* Keep images contained */}
                                </div>
                            </div>
                        ))}
                    </Link>
                </div>



            </div>
        </>
    );
};

export default ImgCard;
