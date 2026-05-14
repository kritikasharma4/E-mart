import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/", sub: [] },
  {
    label: "Men", to: "#", sub: [
      { label: "Clothing", to: "/" },
      { label: "Footwear", to: "/" },
      { label: "Watches", to: "/" },
      { label: "Accessories", to: "/" },
    ]
  },
  {
    label: "Women", to: "#", sub: [
      { label: "Clothing", to: "/" },
      { label: "Footwear", to: "/" },
      { label: "Watches", to: "/" },
      { label: "Bags", to: "/" },
    ]
  },
  {
    label: "Kids", to: "#", sub: [
      { label: "Boys", to: "/" },
      { label: "Girls", to: "/" },
      { label: "Toys", to: "/" },
    ]
  },
  { label: "Electronics", to: "#", sub: [
      { label: "Mobiles", to: "/" },
      { label: "Laptops", to: "/" },
      { label: "Cameras", to: "/" },
    ]
  },
  { label: "Beauty", to: "#", sub: [
      { label: "Skincare", to: "/" },
      { label: "Makeup", to: "/" },
      { label: "Fragrances", to: "/" },
    ]
  },
  { label: "Contact Us", to: "#", sub: [] },
];

const Navigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="nav">
      <div className="container">
        <button className="allCatTab" onClick={() => setSidebarOpen(true)}>
          <IoMenu />
          <span className="text">All Categories</span>
          <FaAngleDown />
        </button>

        <div className="navPart2">
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>
                  {link.label}
                  {link.sub.length > 0 && <FaAngleDown style={{ marginLeft: 4, fontSize: 11 }} />}
                </Link>
                {link.sub.length > 0 && (
                  <ul className="submenu">
                    {link.sub.map((s) => (
                      <li key={s.label}><Link to={s.to}>{s.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 499 }} onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`sidebarNav ${sidebarOpen ? "open" : ""}`}>
        <div className="head">
          <h2>All Categories</h2>
          <button className="closeBtn" onClick={() => setSidebarOpen(false)}><IoClose /></button>
        </div>
        <ul>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} onClick={() => setSidebarOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
