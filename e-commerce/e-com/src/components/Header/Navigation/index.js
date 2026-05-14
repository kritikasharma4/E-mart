import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

const links = [
  { label: "Home", to: "/" },
  { label: "Men",  to: "#", sub: ["Clothing","Footwear","Watches","Accessories"] },
  { label: "Women",to: "#", sub: ["Clothing","Footwear","Handbags","Jewellery"] },
  { label: "Kids", to: "#", sub: ["Boys","Girls","Toys","School Bags"] },
  { label: "Electronics", to: "#", sub: ["Mobiles","Laptops","Tablets","Cameras"] },
  { label: "Beauty", to: "#", sub: ["Skincare","Makeup","Fragrances","Hair Care"] },
  { label: "Contact Us", to: "#" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="em-nav">
        <div className="em-nav-inner em-container">
          <button className="em-cat-btn" onClick={() => setOpen(true)}>
            <IoMenu /> <span className="em-cat-btn-label">All Categories</span>
          </button>
          <ul className="em-navlinks">
            {links.map(l => (
              <li key={l.label}>
                <Link to={l.to} className="em-navlink">
                  {l.label} {l.sub && <FaAngleDown size={10} />}
                </Link>
                {l.sub && (
                  <ul className="em-dropdown">
                    {l.sub.map(s => <li key={s}><Link to="/">{s}</Link></li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {open && <div className="em-overlay" onClick={() => setOpen(false)} />}
      <div className={`em-sidebar-nav ${open ? "open" : ""}`}>
        <div className="em-sidebar-head">
          <h3>Browse Categories</h3>
          <button className="em-sidebar-close" onClick={() => setOpen(false)}><IoClose /></button>
        </div>
        <div className="em-sidebar-links">
          {links.map(l => (
            <Link key={l.label} to={l.to} className="em-sidebar-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
