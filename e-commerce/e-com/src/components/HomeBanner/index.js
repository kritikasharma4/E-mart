import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  "https://cmsimages.shoppersstop.com/Top_Wear_web_fe093fc403/Top_Wear_web_fe093fc403.png",
  "https://cmsimages.shoppersstop.com/Kazo_Featured_Brands_Web_d249385aa5/Kazo_Featured_Brands_Web_d249385aa5.png",
  "https://cmsimages.shoppersstop.com/Handbags_web_272c87e83a/Handbags_web_272c87e83a.png",
  "https://cmsimages.shoppersstop.com/Denims_Main_Banners_web_7850ce853b/Denims_Main_Banners_web_7850ce853b.png",
  "https://cmsimages.shoppersstop.com/Luminous_Silk_2_5cc9e3171c/Luminous_Silk_2_5cc9e3171c.jpg",
];

const HomeBanner = () => (
  <div className="em-banner">
    <Slider dots infinite autoplay autoplaySpeed={3500} speed={600} slidesToShow={1} slidesToScroll={1}>
      {slides.map((src, i) => (
        <div key={i}>
          <img src={src} alt={`Banner ${i + 1}`} style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }} />
        </div>
      ))}
    </Slider>
  </div>
);

export default HomeBanner;
