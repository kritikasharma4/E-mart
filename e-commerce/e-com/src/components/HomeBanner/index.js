import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeBanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container mt-3">
      <div className="homeBannerSection">
        <Slider {...settings}>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/Top_Wear_web_fe093fc403/Top_Wear_web_fe093fc403.png"
              alt="Home Banner"
              className="banner-img"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/Kazo_Featured_Brands_Web_d249385aa5/Kazo_Featured_Brands_Web_d249385aa5.png"
              alt="Home Banner"
              className="banner-img"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/Handbags_web_272c87e83a/Handbags_web_272c87e83a.png"
              alt="Home Banner"
              className="banner-img"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/Denims_Main_Banners_web_7850ce853b/Denims_Main_Banners_web_7850ce853b.png"
              alt="Home Banner"
              className="banner-img"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/Luminous_Silk_2_5cc9e3171c/Luminous_Silk_2_5cc9e3171c.jpg"
              alt="Home Banner"
              className="banner-img"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/SS_Fragrance_Affair_Top_carousel_web_3062361137/SS_Fragrance_Affair_Top_carousel_web_3062361137.jpg"
              alt="Home Banner"
              className="banner-img"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HomeBanner;
