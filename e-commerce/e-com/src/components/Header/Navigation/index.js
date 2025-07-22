import Button from "@mui/material/Button";
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { IoIosTv } from "react-icons/io";
import { GiCakeSlice } from "react-icons/gi";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaBlogger } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";

const Navigation = () => {

  const [isOpenSidebarVal,setisOpenSidebarVal]=useState();

  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-2 navPart1">
            <div className="catWrapper">
              <Button className="allCatTab align-items-center" onClick={()=>setisOpenSidebarVal(!isOpenSidebarVal)}>
                <span className="icon1" style={{ marginRight: "8px" }}>
                  <IoMenu />
                </span>
                <span className="text">All CATEGORIES</span>
                <span className="icon2" style={{ marginLeft: "8px" }}>
                  <FaAngleDown />
                </span>
              </Button>
              <div className={`sidebarNav ${isOpenSidebarVal ? "open" : ""}`}>
                <ul>
                  <li><Link to="/">
                    <Button>Men<SlArrowRight className="ml-auto"/></Button>
                  </Link>
                  <div className="submenu">
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  </div>
                  </li>
                <li><Link to="/">
                    <Button>Women<SlArrowRight className="ml-auto"/></Button>
                  </Link>
                  <div className="submenu">
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  </div>
                  </li>
                  <li><Link to="/">
                    <Button>Watches</Button>
                  </Link></li>
                  <li><Link to="/">
                    <Button>Kids</Button>
                  </Link></li>
                  <li><Link to="/">
                    <Button>clothing</Button>
                  </Link></li>
                  <li><Link to="/">
                    <Button>Footwear</Button>
                  </Link></li>
                  <li><Link to="/">
                    <Button>Beauty</Button>
                  </Link></li>
                </ul>
              </div>

            </div>
          </div>

          <div className="col-sm-10 navPart2 d-flex align-items-center">
            <ul className="list list-inline w-100 ml-auto">
              <li className="list-inline-item">
                <Link to="/">
                  <IoHome /> &nbsp; Home
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <GiClothes /> &nbsp;Men
                </Link>
                <div className="submenu">
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <IoIosTv /> &nbsp;Women
                </Link>
                <div className="submenu">
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <GiCakeSlice /> &nbsp;Beauty
                </Link>
                <div className="submenu">
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <MdLocalGroceryStore /> &nbsp;Watches
                </Link>
                <div className="submenu">
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <FaBlogger /> &nbsp;Kids
                </Link>
                <div className="submenu">
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <IoMdContact /> &nbsp;Contact Us
                </Link>
                <div className="submenu">
                  <Link to="/">
                    <Button>clothing</Button>
                  </Link>
                  <Link to="/">
                    <Button>Footwear</Button>
                  </Link>
                  <Link to="/">
                    <Button>Watches</Button>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
