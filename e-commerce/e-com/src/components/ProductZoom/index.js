import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import "react-inner-image-zoom/lib/styles.min.css";
import { useContext, useRef } from "react";
import { MyContext } from "../../App";

const ProductZoom = () => {

  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const context=useContext(MyContext);

  var settings2 = {
      dots: false,
      infinite: false,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: false,
      arrows: false,
    };
  
    var settings = {
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

  return (
    <div className="ProductZoom">
      <div className="productZoom position-relative">
        <span
          className="badge"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "#ff4d4f", // red color for discount
            color: "#fff",
            padding: "7px 10px",
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          23% Off
        </span>
        <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
          <div className="'item">
            <InnerImageZoom
              zoomType="hover"
              zoomScale={1}
              src={`https://api.spicezgold.com/download/file_1734527033961_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-0-202405282358.webp`}
            />
          </div>
          <div className="'item">
            <InnerImageZoom
              zoomType="hover"
              zoomScale={1}
              src={`https://api.spicezgold.com/download/file_1734527033962_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-1-202405282358.jpg`}
            />
          </div>
          <div className="'item">
            <InnerImageZoom
              zoomType="hover"
              zoomScale={1}
              src={`https://api.spicezgold.com/download/file_1734527033961_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-0-202405282358.webp`}
            />
          </div>
        </Slider>
      </div>

      <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
        <div className="item">
          <img
            src={`https://api.spicezgold.com/download/file_1734527033961_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-0-202405282358.webp`}
            className="w-100"
            onClick={() => goto(0)}
          />
        </div>
        <div className="item">
          <img
            src={`https://api.spicezgold.com/download/file_1734527033962_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-1-202405282358.jpg`}
            className="w-100"
            onClick={() => goto(1)}
          />
        </div>
        <div className="item">
          <img
            src={`https://api.spicezgold.com/download/file_1734527033961_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-0-202405282358.webp`}
            className="w-100"
            onClick={() => goto(2)}
          />
        </div>
      </Slider>
    </div>
  );
};

export default ProductZoom;
