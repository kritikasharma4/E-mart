import { useState, useEffect } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { fetchDataFromApi } from '../../utils/api';

const BRANDS = ['Nike', 'Adidas', 'H&M', 'Zara', 'Puma', "Levi's", 'Biba', 'Manyavar', 'Parachute', 'Dabur', 'Clarks', 'Vans'];

const Sidebar = ({ filters = {}, onChange, categoryId }) => {
  const [localPrice, setLocalPrice] = useState([filters.minPrice || 0, filters.maxPrice || 100000]);
  const [, setCategories] = useState([]);

  useEffect(() => {
    fetchDataFromApi('/api/category').then(data => {
      setCategories(Array.isArray(data) ? data : []);
    });
  }, []);

  const applyPrice = () => {
    onChange?.({ minPrice: localPrice[0], maxPrice: localPrice[1] });
  };

  const resetAll = () => {
    setLocalPrice([0, 100000]);
    onChange?.({ minPrice: 0, maxPrice: 100000, brand: '', inStock: false });
  };

  return (
    <div className="em-filter-panel">
      <div className="em-filter-head">
        <h3>Filters</h3>
        <button className="em-filter-reset" onClick={resetAll}>Clear all</button>
      </div>

      <div className="em-filter-group">
        <span className="em-filter-label">Price Range</span>
        <RangeSlider
          value={localPrice}
          onInput={setLocalPrice}
          min={0}
          max={100000}
          step={100}
        />
        <div className="em-price-range">
          <span>₹{localPrice[0].toLocaleString()}</span>
          <span>₹{localPrice[1].toLocaleString()}</span>
        </div>
        <button className="em-apply-price" onClick={applyPrice}>Apply</button>
      </div>

      <div className="em-filter-group">
        <span className="em-filter-label">Availability</span>
        <label className="em-check-row">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={e => onChange?.({ inStock: e.target.checked })}
          />
          <span>In Stock only</span>
        </label>
      </div>

      <div className="em-filter-group">
        <span className="em-filter-label">Brand</span>
        <div className="em-brand-list">
          {BRANDS.map(b => (
            <label key={b} className="em-check-row">
              <input
                type="radio"
                name="brand"
                checked={filters.brand === b}
                onChange={() => onChange?.({ brand: filters.brand === b ? '' : b })}
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
