import React from "react";
import Banner from "../components/Banner"
import Swiper from "../components/SlideShow"
import ImgCard from "../components/ImgCard";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/product'); // Replace with your API URL
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <ImgCard />
      <Swiper />
      <Banner />
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img src={image.image} alt={`Image ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Home;
