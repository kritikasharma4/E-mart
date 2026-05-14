import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const HomeCat = ({ catData }) => (
  <div className="em-cats">
    <div className="em-container">
      <p className="em-cats-title">Shop by Category</p>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        breakpoints={{
          0:    { slidesPerView: 4 },
          480:  { slidesPerView: 5 },
          640:  { slidesPerView: 7 },
          900:  { slidesPerView: 9 },
          1200: { slidesPerView: 11 },
        }}
      >
        {catData.map((cat, i) => (
          <SwiperSlide key={i}>
            <Link to={`/cat/${encodeURIComponent(cat.name.toLowerCase())}`} className="em-cat-item">
              <div className="em-cat-img">
                <img src={cat.images?.[0] || "https://via.placeholder.com/72"} alt={cat.name} />
              </div>
              <span className="em-cat-name">{cat.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
);

export default HomeCat;
