import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCat = ({ catData }) => {
  return (
    <section className="homeCatSection">
      <div className="container">
        <p className="sectionTitle">Shop by Category</p>
        <Swiper
          modules={[Navigation]}
          spaceBetween={12}
          slidesPerView={10}
          slidesPerGroup={3}
          navigation={true}
          className="homeCat"
          breakpoints={{
            0:    { slidesPerView: 4 },
            576:  { slidesPerView: 5 },
            768:  { slidesPerView: 7 },
            1024: { slidesPerView: 9 },
            1200: { slidesPerView: 10 },
          }}
        >
          {catData.map((cat, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/cat/${encodeURIComponent(cat.name.toLowerCase())}`}
                className="item"
              >
                <div className="img">
                  <img
                    src={cat.images?.[0] || "https://via.placeholder.com/72"}
                    alt={cat.name}
                  />
                </div>
                <h6>{cat.name}</h6>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
