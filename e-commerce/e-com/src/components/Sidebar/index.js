import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const categories = ["Men", "Women", "Kids", "Beauty", "Electronics", "Sports"];
const brands = ["Nike", "Adidas", "H&M", "Zara", "Puma", "Levi's"];

const Sidebar = () => {
  const [priceRange, setPriceRange] = useState([100, 60000]);

  return (
    <div className="em-filter-panel">
      <h3>Filters</h3>

      <div className="em-filter-group">
        <span className="em-filter-label">Categories</span>
        <ul style={{ maxHeight: 220, overflowY: "auto" }}>
          {categories.map(c => (
            <li key={c}>
              <FormControlLabel control={<Checkbox size="small" />} label={c} />
            </li>
          ))}
        </ul>
      </div>

      <div className="em-filter-group">
        <span className="em-filter-label">Price Range</span>
        <RangeSlider value={priceRange} onInput={setPriceRange} min={100} max={60000} step={100} />
        <div className="em-price-range">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="em-filter-group">
        <span className="em-filter-label">Availability</span>
        <ul>
          <li><FormControlLabel control={<Checkbox size="small" />} label="In Stock" /></li>
          <li><FormControlLabel control={<Checkbox size="small" />} label="On Sale" /></li>
        </ul>
      </div>

      <div className="em-filter-group">
        <span className="em-filter-label">Brands</span>
        <ul>
          {brands.map(b => (
            <li key={b}>
              <FormControlLabel control={<Checkbox size="small" />} label={b} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
