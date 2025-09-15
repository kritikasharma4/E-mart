import Button from "@mui/material/Button";
import { SlArrowDown } from "react-icons/sl";
import Dialog from "@mui/material/Dialog";
import { IoClose } from "react-icons/io5";
import React, { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Slide from "@mui/material/Slide";
import { MyContext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India");

  const { countryList } = useContext(MyContext);

  useEffect(() => {
    setFilteredList(countryList); // initialize filtered list
  }, [countryList]);

  const selectCountry = (index) => {
    setSelectedTab(index);
    setSelectedCountry(filteredList[index].country);
    setIsOpenModal(false);
  };

  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = countryList.filter((item) =>
      item.country.toLowerCase().includes(keyword)
    );
    setFilteredList(filtered);
  };

  // Show truncated country name for UI
  const displayCountry =
    selectedCountry && selectedCountry.length > 10
      ? selectedCountry.substring(0, 10) + "..."
      : selectedCountry || "Select Location";

  return (
    <>
      <Button className="CountryDrop" onClick={() => setIsOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">{displayCountry}</span>
        </div>
        <span className="ml-auto">
          <SlArrowDown />
        </span>
      </Button>

      <Dialog
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        className="LocationModal"
        TransitionComponent={Transition}
      >
        <div style={{ padding: "1rem" }}>
          <h4>Choose your delivery Location</h4>
          <p>Enter your address and we will specify the offer for your Area.</p>
          <Button className="close_" onClick={() => setIsOpenModal(false)}>
            <IoClose />
          </Button>

          <div className="headerSearch">
            <input
              type="text"
              placeholder="Search your Area..."
              onChange={filterList}
            />
            <Button className="searchBtn">
              <FaSearch />
            </Button>
          </div>

          <ul className="CountryList mt-3">
            {filteredList && filteredList.length > 0 ? (
              filteredList.map((item, index) => (
                <li key={index}>
                  <Button
                    onClick={() => selectCountry(index)}
                    className={selectedTab === index ? "active" : ""}
                  >
                    {item.country}
                  </Button>
                </li>
              ))
            ) : (
              <li>No countries found.</li>
            )}
          </ul>
        </div>
      </Dialog>
    </>
  );
};

export default CountryDropdown;

