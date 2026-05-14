import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const cols = [
  { title: "Shop", links: ["Electronics","Fashion","Home & Living","Sports","Beauty","Books"] },
  { title: "Company", links: ["About Us","Careers","Press","Blog","Partners","Investors"] },
  { title: "Support", links: ["Help Center","Returns Policy","Track Order","Shipping Info","Privacy Policy","Terms of Service"] },
];

const Footer = () => (
  <footer className="em-footer">
    {/* Feature strip */}
    <div className="em-footer-features">
      {[
        { Icon: TbTruckDelivery, h: "Free Delivery",    p: "On orders over ₹999" },
        { Icon: RiSecurePaymentLine, h: "Secure Payment", p: "100% safe transactions" },
        { Icon: CiDiscount1, h: "Daily Deals",      p: "Mega discounts every day" },
        { Icon: MdSupportAgent, h: "24/7 Support",    p: "Always here to help" },
      ].map(({ Icon, h, p }) => (
        <div className="em-footer-feat" key={h}>
          <Icon />
          <div><h6>{h}</h6><p>{p}</p></div>
        </div>
      ))}
    </div>

    {/* Links */}
    <div className="em-footer-body">
      <div className="em-container" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32 }}>
        <div>
          <h5 style={{ fontSize: 22, fontWeight: 900, color: "var(--brand)", letterSpacing: -1, marginBottom: 12 }}>
            e<span style={{ color: "#fff" }}>mart</span>
          </h5>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 220 }}>
            Your one-stop destination for fashion, electronics, beauty and more — delivered to your door.
          </p>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <h5>{col.title}</h5>
            <ul className="em-footer-links">
              {col.links.map(l => <li key={l}><Link to="#">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom bar */}
    <div className="em-container">
      <div className="em-footer-bottom">
        <p>© {new Date().getFullYear()} E-Mart. All rights reserved.</p>
        <div className="em-footer-socials">
          <Link to="#" aria-label="Facebook"><FaFacebookF /></Link>
          <Link to="#" aria-label="Instagram"><FaInstagram /></Link>
          <Link to="#" aria-label="Twitter"><FaXTwitter /></Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
