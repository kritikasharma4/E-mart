import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [value, setValue] = useState([100, 60000]);
  const [value2, setValue2] = useState(0);

  return (
    <>
      <div className="sidebar">
        <div className="sticky">
          <div className="filterBox">
            <h6>PRODUCT CATEGORIES</h6>

            <div className="scroll">
              <ul>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Men" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Women" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Beauty" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Kids" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Women" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Beauty" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Kids" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Women" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Beauty" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Kids" />
                </li>
              </ul>
            </div>
          </div>

          <div className="filterBox ">
            <h6>FILTER BY PRICE</h6>

            <RangeSlider
              value={value}
              onInput={setValue}
              min={100}
              max={60000}
              step={5}
            />

            <div className="d-flex pt-2 pb-2 priceRange">
              <span>
                From: <strong className="text-dark">Rs: {value[0]}</strong>
              </span>
              <span className="ml-auto">
                To: <strong className="text-dark">Rs: {value[1]}</strong>
              </span>
            </div>
          </div>

          <div className="filterBox">
            <h6>PRODUCT STATUS</h6>

            <div className="scroll">
              <ul>
                <li>
                  <FormControlLabel control={<Checkbox />} label="In Stock" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="On Sale" />
                </li>
              </ul>
            </div>
          </div>

          <div className="filterBox">
            <h6>BRANDS</h6>

            <div className="scroll">
              <ul>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Frito Lay" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Oreo" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Quaker" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Welch's" />
                </li>
                <li>
                  <FormControlLabel control={<Checkbox />} label="Nespresso" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <br />

        <Link to="#">
          <img
            src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg"
            className="w-100"
          ></img>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
