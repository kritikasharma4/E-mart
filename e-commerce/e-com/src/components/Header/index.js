import { Link } from "react-router-dom";
import Logo from "../../Assets/images/e-com.png";
import Button from "@mui/material/Button";
import CountryDropdown from "../CountryDropdown";
import { FaUserAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const { countryList } = useContext(MyContext); // ✅ Better destructuring
  const navigate = useNavigate();


  return (
    <div className="headerWrapper">
      <div className="top-strip bg-purple">
        <div className="container">
          <p className="mb-0 mt-0 text-center">
            Have a great time <b>shopping</b> on our platform!
          </p>
        </div>
      </div>

      <header className="header">
        <div className="container">
          <div className="row align-items-center">
            <div className="logoWrapper col-sm-2 d-flex align-items-center">
              <Link to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>

            <div className="part2 col-sm-10 d-flex align-items-center">
              <div
                className="d-flex align-items-center flex-grow-1 gap-2"
                style={{ width: "100%" }}
              >
                {/* ✅ Render dropdown only when countries are available */}
                <CountryDropdown />

                {countryList?.length > 0 && <CountryDropdown />}

                <SearchBox />

                <div className="part3 d-flex align-items-center ml-auto">
                  {
                    MyContext.isLogin!==true? 
                    <Link to="/SignIn">
                    <Button className="btn-blue btn-lg btn-big btn-round mr-3">SignIn</Button></Link> :
                    <Button
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "50px",
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      color: "#000",
                      ml: 8,
                      backgroundColor: "#fff",
                      padding: 0,
                      "& svg": {
                        fontSize: "22px",
                      },
                    }}
                  >
                    <FaUserAlt />
                  </Button>
                  }
                  
                  <div className="ml-auto cartTab">
                    <span className="price">$3.29</span>
                    <Button
                      className="circle"
                      onClick={() => navigate("/cart")}
                    >
                      <FaCartShopping />
                    </Button>
                    <span className="count d-flex align-items-center justify-content-center">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Navigation />
    </div>
  );
};

export default Header;
