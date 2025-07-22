import ProductZoom from "../../components/ProductZoom";
import Rating from "@mui/material/Rating";
import QuantityDrop from "../../components/QuantityDrop";
import Button from "@mui/material/Button";
import { IoCart } from "react-icons/io5";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import ProductTabs from "../../components/ProductTabs";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const [activeSize, setActiveSize] = useState(0);

  const handleSizeSelect = (index) => {
    setActiveSize(index);
  };

  return (
    <section className="productDetails section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-5">
            <ProductZoom />
          </div>

          <div className="col-md-7 mt-5" style={{ marginLeft: "30px" }}>
            <div className="container">
              <h2 className="hd text-capitalize">
                All Natural Italian Style Chicken Meatballs
              </h2>

              <ul className="list list-inline d-flex align-items-center">
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <span className="text-light">Brands: </span>
                    <span style={{ marginLeft: "5px" }}>Welch's</span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <Rating
                      name="read-only"
                      value={3.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <span className="text-light cursor ml-2">1 Review</span>
                  </div>
                </li>
              </ul>

              <div className="d-flex info mb-3">
                <span className="oldPrice">$20.00</span>
                <span className="netPrice text-danger ms-3">$14.00</span>
              </div>

              <span className="badge badge-success">IN STOCKS</span>

              <p className="mt-3">
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum orem ipsum lorem
                ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum orem
                ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                lorem ipsum orem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                ipsum lorem.
              </p>

              <div className="productSize d-flex align-items-center mt-3">
                <span>Size / Weight:</span>
                <ul className="list list-inline mb-0 ps-4">
                  {[50, 100, 200, 300, 400].map((weight, index) => (
                    <li className="list-inline-item" key={index}>
                      <a
                        className={`tag ${
                          activeSize === index ? "active" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSizeSelect(index)}
                      >
                        {weight}g
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d-flex align-items-center mt-4">
                <QuantityDrop />
                <Button
                  className="btn-lg btn-big btn-round ms-3"
                  style={{ background: "#2bbef9", color: "#fff" }}
                >
                  <IoCart /> &nbsp; Add to Cart
                </Button>

                <Tooltip title="Add to Wishlist" placement="top">
                  <Button className="btn-lg btn-big btn-circle ms-3">
                    <FaRegHeart />
                  </Button>
                </Tooltip>

                <Tooltip title="Add to compare" placement="top">
                  <Button className="btn-lg btn-big btn-circle ms-3">
                    <IoGitCompareOutline />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div style={{ marginTop: "40px", marginLeft: "0px" }}>
        <ProductTabs />
        </div>

        <br />

        <div style={{ marginTop: "40px", marginLeft: "30px" }}>
          <RelatedProducts title="RELATED PRODUCTS" />
        </div>

        <div style={{ marginTop: "40px", marginLeft: "30px" }}>
          <RelatedProducts title="RECENTLY VIEWED PRODUCTS" />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
