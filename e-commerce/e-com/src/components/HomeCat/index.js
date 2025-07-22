import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom"; // using Link, not navigate

const HomeCat = ({ catData }) => {
  return (
    <section className="homeCat">
      <div className="container">
        <h2 className="mb-3 hd">Featured Categories</h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={10}
          slidesPerGroup={3}
          navigation={true}
          className="mySwiper"
        >
          {catData.map((cat, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/cat/${encodeURIComponent(cat.name.toLowerCase())}`}
                className="item text-center cursor"
                style={{ backgroundColor: cat.color || "#f0f0f0" }}
              >
                <img
                  src={cat.images?.[0] || "https://via.placeholder.com/50"}
                  alt={cat.name}
                  style={{ width: "50px", height: "50px" }}
                />
                <h6 className="mt-2">{cat.name}</h6>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
