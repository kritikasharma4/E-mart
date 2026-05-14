import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Men",  to: "#", sub: ["Clothing","Footwear","Watches","Accessories"] },
  { label: "Women",to: "#", sub: ["Clothing","Footwear","Handbags","Jewellery"] },
  { label: "Kids", to: "#", sub: ["Boys","Girls","Toys","School Bags"] },
  { label: "Electronics", to: "#", sub: ["Mobiles","Laptops","Tablets","Cameras"] },
  { label: "Beauty",to: "#", sub: ["Skincare","Makeup","Fragrances","Hair Care"] },
  { label: "Contact Us", to: "#" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="navBar">
        <div className="container navInner">
          {/* All categories pill */}
          <button className="allCatBtn" onClick={() => setOpen(true)}>
            <IoMenu size={18} />
            <span>All Categories</span>
            <FaAngleDown size={12} />
          </button>

          {/* Horizontal nav links */}
          <ul className="navLinks">
            {navLinks.map((link) => (
              <li key={link.label} className="navItem">
                <Link to={link.to} className="navLink">
                  {link.label}
                  {link.sub && <FaAngleDown size={10} style={{ marginLeft: 3 }} />}
                </Link>
                {link.sub && (
                  <ul className="navDropdown">
                    {link.sub.map((s) => (
                      <li key={s}><Link to="/" className="navDropItem">{s}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div className="sideOverlay" onClick={() => setOpen(false)} />
      )}

      {/* Slide-in sidebar */}
      <div className={`mobileSidebar ${open ? "open" : ""}`}>
        <div className="sidebarHead">
          <span>Browse Categories</span>
          <button onClick={() => setOpen(false)}><IoClose size={22} /></button>
        </div>
        <ul className="sidebarLinks">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="sidebarLink" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
