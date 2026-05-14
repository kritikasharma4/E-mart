import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft, FaTruck, FaShieldAlt, FaHeadset, FaGift } from "react-icons/fa";
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

const features = [
  { icon: <FaTruck />, title: "Free Delivery", sub: "On orders above ₹999" },
  { icon: <FaShieldAlt />, title: "Secure Payment", sub: "100% safe & protected" },
  { icon: <FaHeadset />, title: "24/7 Support", sub: "Dedicated support team" },
  { icon: <FaGift />, title: "Easy Returns", sub: "30-day hassle-free returns" },
];

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

      {/* Feature strips */}
      <div className="em-feature-strip">
        <div className="em-container">
          <div className="em-feature-grid">
            {features.map((f, i) => (
              <div key={i} className="em-feature-item">
                <div className="em-feature-icon">{f.icon}</div>
                <div>
                  <div className="em-feature-title">{f.title}</div>
                  <div className="em-feature-sub">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="em-home-products">
        <div className="em-container">

          {/* Featured */}
          <div className="em-section-head">
            <div className="left">
              <span className="em-section-tag">Handpicked</span>
              <h2>Featured Products</h2>
              <p>Don't miss our current offers — limited time</p>
            </div>
            <a href="#featured" className="em-view-all">View All <FaArrowRight /></a>
          </div>
          <div className="em-product-row" style={{ marginBottom: 56 }}>
            <Slider {...slickCfg}>
              {featured.map(p => (
                <div key={p._id}><ProductItem product={p} /></div>
              ))}
            </Slider>
          </div>

          {/* Promo banner between sections */}
          <div className="em-mid-promo">
            <div className="em-mid-promo-card" style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}>
              <div className="em-mid-promo-text">
                <span className="em-mid-promo-tag">Limited Time</span>
                <h3>Up to 40% Off</h3>
                <p>On electronics &amp; gadgets</p>
              </div>
              <div className="em-mid-promo-emoji">⚡</div>
            </div>
            <div className="em-mid-promo-card" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" }}>
              <div className="em-mid-promo-text">
                <span className="em-mid-promo-tag">New Season</span>
                <h3>Fashion Arrivals</h3>
                <p>Men, Women &amp; Kids collections</p>
              </div>
              <div className="em-mid-promo-emoji">👗</div>
            </div>
            <div className="em-mid-promo-card" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
              <div className="em-mid-promo-text">
                <span className="em-mid-promo-tag">Free Shipping</span>
                <h3>Orders Over ₹999</h3>
                <p>Delivered to your doorstep</p>
              </div>
              <div className="em-mid-promo-emoji">🚚</div>
            </div>
          </div>

          {/* New Arrivals */}
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
