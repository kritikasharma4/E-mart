import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import "react-inner-image-zoom/lib/styles.min.css";
import { useRef } from "react";

const ProductZoom = () => {
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };

  const goto = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  const images = [
    "https://api.spicezgold.com/download/file_1734527033961_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-0-202405282358.webp",
    "https://api.spicezgold.com/download/file_1734527033962_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-1-202405282358.jpg",
    "https://api.spicezgold.com/download/file_1734527033961_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-0-202405282358.webp",
  ];

  return (
    <div className="ProductZoom">
      <div className="productZoom position-relative">
        <span
          className="badge"
          style={{
            position: "absolute", top: "10px", left: "10px",
            backgroundColor: "#ff4d4f", color: "#fff",
            padding: "7px 10px", fontWeight: "bold", zIndex: 10,
          }}
        >
          23% Off
        </span>
        <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
          {images.map((src, i) => (
            <div className="item" key={i}>
              <InnerImageZoom zoomType="hover" zoomScale={1} src={src} />
            </div>
          ))}
        </Slider>
      </div>

      <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
        {images.map((src, i) => (
          <div className="item" key={i}>
            <img src={src} className="w-100" alt={`Product view ${i + 1}`} onClick={() => goto(i)} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductZoom;
