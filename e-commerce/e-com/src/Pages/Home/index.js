import HomeBanner from "../../components/HomeBanner";
import { Button } from "@mui/material";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductItem from "../../components/ProductItem";
import HomeCat from "../../components/HomeCat";
import { IoMailOpenOutline } from "react-icons/io5";
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
      const nonFeatured = all.filter(p => !p.isFeatured);
      setNewProducts(nonFeatured);
    });
  }, []);

  return (
    <>
      <HomeBanner />
      {catData?.length !== 0 && <HomeCat catData={catData} />}

      <section className="homeProducts">
        <div className="container">
          <div className="row">
            {/* Featured Products */}
            <div className="col-md-3">
              <img src="https://api.spicezgold.com/download/file_1734525757507_NewProject(34).jpg" alt="logo" className="cursor img-fluid" />
            </div>

            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center justify-content-between w-100 mb-3">
                <div className="info">
                  <h2 className="mb-0 hd">FEATURED PRODUCTS</h2>
                  <p className="text-light text-sml mb-0">Do not miss the current offers until the end of June.</p>
                </div>
                <Button className="viewAllBtn">View All <FaArrowRight /></Button>
              </div>
              <div className="product_row w-100">
                <Slider {...sliderSettings}>
                  {featuredProducts.map(product => (
                    <ProductItem key={product._id} product={product} />
                  ))}
                </Slider>
              </div>
            </div>

            {/* New Products */}
            <div className="col-md-3 mt-5">
              <img src="https://cmsimages.shoppersstop.com/CHOPARD_Web_b075612cad/CHOPARD_Web_b075612cad.jpg" alt="logo" className="cursor mb-3 img-fluid" />
              <img src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg" alt="logo" className="cursor mt-5 img-fluid" />
            </div>

            <div className="col-md-9 productRow mt-5">
              <div className="d-flex align-items-center justify-content-between w-100 mb-3">
                <div className="info">
                  <h2 className="mb-0 hd">NEW PRODUCTS</h2>
                  <p className="text-light text-sml mb-0">Try something new THIS SUMMER!</p>
                </div>
                <Button className="viewAllBtn">View All <FaArrowRight /></Button>
              </div>
              <div className="product_row w-100">
                <Slider {...sliderSettings}>
                  {newProducts.map(product => (
                    <ProductItem key={product._id} product={product} />
                  ))}
                </Slider>
              </div>

              <div className="d-flex mt-4 mb-5 bannerSec">
                <div className="banner">
                  <img src="https://api.spicezgold.com/download/file_1734532742018_NewProject(22).jpg" alt="logo" className="cursor w-100" />
                </div>
                <div className="banner">
                  <img src="https://i.pinimg.com/736x/17/50/c6/1750c64b06c2529747308b9b9c63cf04.jpg" alt="logo" className="cursor w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">$20 discount for your first order</p>
              <h3 className="text-white">Join our newsletter and get...</h3>
              <p className="text-light">Join our email subscription now to get updates <br /> on promotions and coupons.</p>
              <form>
                <IoMailOpenOutline />
                <input type="text" placeholder="Your Email Address..." />
                <Button style={{ color: "#fff" }}>Subscribe</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img src="https://fullstack-ecommerce.netlify.app/static/media/newsletter.5931358dd220a40019fc.png" alt="logo" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
