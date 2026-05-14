import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import HomeBanner from "../../components/HomeBanner";
import HomeCat from "../../components/HomeCat";
import ProductItem from "../../components/ProductItem";
import { fetchDataFromApi } from "../../utils/api";

const Arrow = ({ dir, onClick }) => (
  <button className={`em-arrow ${dir}`} onClick={onClick}>
    {dir === "prev" ? <FaArrowLeft /> : <FaArrowRight />}
  </button>
);

const slickCfg = {
  dots: false, infinite: false, speed: 400,
  slidesToShow: 4, slidesToScroll: 1,
  nextArrow: <Arrow dir="next" />, prevArrow: <Arrow dir="prev" />,
  responsive: [
    { breakpoint: 1100, settings: { slidesToShow: 3 } },
    { breakpoint: 800,  settings: { slidesToShow: 2 } },
    { breakpoint: 500,  settings: { slidesToShow: 1 } },
  ],
};

const Home = () => {
  const [catData, setCatData] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/api/category").then(r => {
      setCatData(Array.isArray(r) ? r : r.categories || []);
    });
    fetchDataFromApi("/api/products/featured").then(r => {
      setFeatured(Array.isArray(r) ? r : r.products || []);
    });
    fetchDataFromApi("/api/products?limit=24&skip=0").then(r => {
      const all = r.products || [];
      setLatest(all.filter(p => !p.isFeatured).slice(0, 16));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HomeBanner />
      {catData.length > 0 && <HomeCat catData={catData} />}

      <div className="em-home-products">
        <div className="em-container">

          {/* Featured */}
          <div style={{ display: "flex", gap: 24, marginBottom: 56, alignItems: "flex-start" }}>
            <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="em-promo-img">
                <img src="https://api.spicezgold.com/download/file_1734525757507_NewProject(34).jpg" alt="promo" />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="em-section-head">
                <div className="left">
                  <span className="em-section-tag">Handpicked</span>
                  <h2>Featured Products</h2>
                  <p>Don't miss our current offers — limited time</p>
                </div>
                <a href="#featured" className="em-view-all">View All <FaArrowRight /></a>
              </div>
              <div className="em-product-row">
                <Slider {...slickCfg}>
                  {featured.map(p => (
                    <div key={p._id}><ProductItem product={p} /></div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* New Arrivals */}
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="em-promo-img">
                <img src="https://cmsimages.shoppersstop.com/CHOPARD_Web_b075612cad/CHOPARD_Web_b075612cad.jpg" alt="promo" />
              </div>
              <div className="em-promo-img">
                <img src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg" alt="promo" />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="em-section-head">
                <div className="left">
                  <span className="em-section-tag">Just In</span>
                  <h2>New Arrivals</h2>
                  <p>Fresh picks added this season</p>
                </div>
                <a href="#latest" className="em-view-all">View All <FaArrowRight /></a>
              </div>
              <div className="em-product-row">
                <Slider {...slickCfg}>
                  {latest.map(p => (
                    <div key={p._id}><ProductItem product={p} /></div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Newsletter */}
      <div className="em-newsletter">
        <div className="em-container">
          <div className="em-newsletter-inner">
            <span className="em-newsletter-tag">Newsletter</span>
            <h3>Get ₹200 off your first order</h3>
            <p>Subscribe for exclusive deals, new arrivals, and early access to our biggest sales.</p>
            <div className="em-newsletter-form">
              <input type="email" placeholder="Enter your email address…" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
