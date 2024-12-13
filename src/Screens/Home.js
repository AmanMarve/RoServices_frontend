import React from "react";
import Banner from "../components/Banner"
import Swiper from "../components/SlideShow"
import ImgCard from "../components/ImgCard";

const Home = () => {
 
  return (
    <div>
      <ImgCard />
      <Swiper />
      <Banner />
    </div>
  );
};

export default Home;
