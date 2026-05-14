import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { CiDiscount1 } from "react-icons/ci";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-features">
          <div className="footer-feature">
            <TbTruckDelivery />
            <div className="text">
              <h6>Free Delivery</h6>
              <p>On orders over ₹999</p>
            </div>
          </div>
          <div className="footer-feature">
            <RiSecurePaymentLine />
            <div className="text">
              <h6>Secure Payment</h6>
              <p>100% safe transactions</p>
            </div>
          </div>
          <div className="footer-feature">
            <CiDiscount1 />
            <div className="text">
              <h6>Daily Deals</h6>
              <p>Mega discounts every day</p>
            </div>
          </div>
          <div className="footer-feature">
            <MdSupportAgent />
            <div className="text">
              <h6>24/7 Support</h6>
              <p>We're here to help you</p>
            </div>
          </div>
        </div>

        <div className="row pb-4">
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Shop</h5>
            <ul>
              <li><Link to="#">Electronics</Link></li>
              <li><Link to="#">Fashion</Link></li>
              <li><Link to="#">Home & Living</Link></li>
              <li><Link to="#">Sports</Link></li>
              <li><Link to="#">Beauty</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Company</h5>
            <ul>
              <li><Link to="#">About Us</Link></li>
              <li><Link to="#">Careers</Link></li>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">Press</Link></li>
              <li><Link to="#">Partners</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Support</h5>
            <ul>
              <li><Link to="#">Help Center</Link></li>
              <li><Link to="#">Returns</Link></li>
              <li><Link to="#">Track Order</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Contact</h5>
            <ul>
              <li><Link to="#">sharmakritika247k@gmail.com</Link></li>
              <li><Link to="#">+91 98765 43210</Link></li>
              <li><Link to="#">New Delhi, India</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} E-Mart. All rights reserved.</p>
          <div className="footer-socials">
            <Link to="#" aria-label="Facebook"><FaFacebookSquare /></Link>
            <Link to="#" aria-label="Instagram"><FaInstagramSquare /></Link>
            <Link to="#" aria-label="Twitter"><FaXTwitter /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
