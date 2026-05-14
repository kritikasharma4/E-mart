import HomeBanner from "../../components/HomeBanner";
import { Button } from "@mui/material";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductItem from "../../components/ProductItem";
import HomeCat from "../../components/HomeCat";
import { fetchDataFromApi } from "../../utils/api";

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}><FaArrowRight /></div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}><FaArrowLeft /></div>
);

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ]
};

const Home = () => {
  const [catData, setCatData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      const categories = Array.isArray(res) ? res : res.categories || [];
      setCatData(categories);
    });

    fetchDataFromApi("/api/products/featured").then(setFeaturedProducts);

    fetchDataFromApi("/api/products?limit=20&skip=0").then((res) => {
      const all = res.products || [];
      setNewProducts(all.filter(p => !p.isFeatured));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HomeBanner />
      {catData?.length > 0 && <HomeCat catData={catData} />}

      <section className="homeProducts">
        <div className="container">

          {/* Featured Products */}
          <div className="row align-items-start mb-5">
            <div className="col-md-3 d-none d-md-block">
              <div className="promoImg">
                <img
                  src="https://api.spicezgold.com/download/file_1734525757507_NewProject(34).jpg"
                  alt="Featured promo"
                />
              </div>
            </div>
            <div className="col-md-9">
              <div className="sectionHeader">
                <div className="left">
                  <span className="tag">Handpicked</span>
                  <h2>Featured Products</h2>
                  <p>Don't miss our current offers — limited time deals</p>
                </div>
                <Button className="viewAllBtn">View All <FaArrowRight style={{ marginLeft: 6 }} /></Button>
              </div>
              <div className="product_row w-100">
                <Slider {...sliderSettings}>
                  {featuredProducts.map(product => (
                    <div key={product._id} style={{ padding: "0 8px" }}>
                      <ProductItem product={product} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* New Arrivals */}
          <div className="row align-items-start">
            <div className="col-md-3 d-none d-md-block">
              <div className="promoImg mb-3">
                <img
                  src="https://cmsimages.shoppersstop.com/CHOPARD_Web_b075612cad/CHOPARD_Web_b075612cad.jpg"
                  alt="New arrivals promo"
                />
              </div>
              <div className="promoImg">
                <img
                  src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg"
                  alt="New arrivals promo 2"
                />
              </div>
            </div>
            <div className="col-md-9">
              <div className="sectionHeader">
                <div className="left">
                  <span className="tag">Just In</span>
                  <h2>New Arrivals</h2>
                  <p>Fresh picks added to our catalogue this season</p>
                </div>
                <Button className="viewAllBtn">View All <FaArrowRight style={{ marginLeft: 6 }} /></Button>
              </div>
              <div className="product_row w-100">
                <Slider {...sliderSettings}>
                  {newProducts.map(product => (
                    <div key={product._id} style={{ padding: "0 8px" }}>
                      <ProductItem product={product} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Newsletter */}
      <section className="newsLetterSection">
        <div className="container">
          <div className="inner">
            <span className="tag">Newsletter</span>
            <h3>Get ₹200 off your first order</h3>
            <p>Subscribe for exclusive deals, new arrivals, and early access to our biggest sales.</p>
            <div className="input-wrap">
              <input type="email" placeholder="Enter your email address..." />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
