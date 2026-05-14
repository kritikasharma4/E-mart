import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import "react-inner-image-zoom/lib/styles.min.css";
import { useRef } from "react";

const FALLBACK = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";

const ProductZoom = ({ images = [], discount = 0 }) => {
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const imgs = images.length ? images : [FALLBACK];

  const goto = (index) => {
    zoomSlider.current?.slickGoTo(index);
    zoomSliderBig.current?.slickGoTo(index);
  };

  return (
    <div className="em-product-zoom">
      <div className="em-pz-main">
        {discount > 0 && (
          <span className="em-pz-badge">{discount}% Off</span>
        )}
        <Slider dots={false} infinite={false} speed={700} slidesToShow={1} slidesToScroll={1} arrows={false} ref={zoomSliderBig}>
          {imgs.map((src, i) => (
            <div key={i}>
              <InnerImageZoom zoomType="hover" zoomScale={1.5} src={src} />
            </div>
          ))}
        </Slider>
      </div>
      {imgs.length > 1 && (
        <Slider dots={false} infinite={false} speed={400} slidesToShow={Math.min(5, imgs.length)} slidesToScroll={1} arrows ref={zoomSlider} className="em-pz-thumbs">
          {imgs.map((src, i) => (
            <div key={i} className="em-pz-thumb" onClick={() => goto(i)}>
              <img src={src} alt="" />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductZoom;
