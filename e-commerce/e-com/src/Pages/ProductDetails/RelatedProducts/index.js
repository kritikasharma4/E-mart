import Slider from "react-slick";
import { Button } from "@mui/material";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import ProductItem from "../../../components/ProductItem";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};

const RelatedProducts = (props) => {
  const productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div style={{ width: "100%", padding: "40px 0", backgroundColor: "#f9f9f9",}}>
      <div style={{ maxWidth: "1200px", margin: " auto", padding: "0 20px" }}>
        {/* Header Row */}
        <div className="d-flex align-items-center justify-content-between w-100 mb-3">
          <div className="info">
            <h2 className="mb-0 hd">{props.title}</h2>
            <p className="text-light text-sml mb-0">
              Do not miss the current offers until the end of June.
            </p>
          </div>
          <Button className="viewAllBtn">
            View All <FaArrowRight />
          </Button>
        </div>

        {/* Slider Section */}
        <div className="product_row w-100">
          <Slider {...productSliderOptions}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{ padding: "0 10px" }}>
                <ProductItem />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};


export default RelatedProducts;