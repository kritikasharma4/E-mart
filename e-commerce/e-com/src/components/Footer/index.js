import { FaTshirt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { CiDiscount1 } from "react-icons/ci";
import { GiPriceTag } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer=()=>{
  return(
    <footer>
      <div className="container">
        <div className="topInfo row">
          <div className="col d-flex align-items-center">
            <span><FaTshirt/></span>
            <span className="ml-2">Everyday Fresh Products</span>
          </div>
          <div className="col d-flex align-items-center">
            <span><TbTruckDelivery/></span>
            <span className="ml-2">Free delivery for order over $70</span>
          </div>
          <div className="col d-flex align-items-center">
            <span><CiDiscount1/></span>
            <span className="ml-2">Daily Mega discounts</span>
          </div>
          <div className="col d-flex align-items-center">
            <span><GiPriceTag/></span>
            <span className="ml-2">Best price on the market</span>
          </div>
        </div>



        <div className="row mt-5 linksWrap">
          <div className="col">
            <h5>FRUITS & VEGETABLES</h5>
            <ul>
              <li><Link to="#">Fresh Vegetables</Link></li>
              <li><Link to="#">Herbs &Seasonings</Link></li>
              <li><Link to="#">Fresh Fruits</Link></li>
              <li><Link to="#">Cuts & Sprouts</Link></li>
              <li><Link to="#">Exotic fruits and Veggies</Link></li>
              <li><Link to="#">Packaged Produce</Link></li>
              <li><Link to="#">Party Trays</Link></li>
              
            </ul>
          </div>
          <div className="col">
            <h5>BREAKFAST & DAIRY</h5>
            <ul>
              <li><Link to="#">Fresh Vegetables</Link></li>
              <li><Link to="#">Herbs &Seasonings</Link></li>
              <li><Link to="#">Fresh Fruits</Link></li>
              <li><Link to="#">Cuts & Sprouts</Link></li>
              <li><Link to="#">Exotic fruits and Veggies</Link></li>
              <li><Link to="#">Packaged Produce</Link></li>
              <li><Link to="#">Party Trays</Link></li>
              
            </ul>
          </div>
          <div className="col">
            <h5>MEAT & SEAFOOD</h5>
            <ul>
              <li><Link to="#">Fresh Vegetables</Link></li>
              <li><Link to="#">Herbs &Seasonings</Link></li>
              <li><Link to="#">Fresh Fruits</Link></li>
              <li><Link to="#">Cuts & Sprouts</Link></li>
              <li><Link to="#">Exotic fruits and Veggies</Link></li>
              <li><Link to="#">Packaged Produce</Link></li>
              <li><Link to="#">Party Trays</Link></li>
              
            </ul>
          </div>
          <div className="col">
            <h5>BEVERAGES</h5>
            <ul>
              <li><Link to="#">Fresh Vegetables</Link></li>
              <li><Link to="#">Herbs &Seasonings</Link></li>
              <li><Link to="#">Fresh Fruits</Link></li>
              <li><Link to="#">Cuts & Sprouts</Link></li>
              <li><Link to="#">Exotic fruits and Veggies</Link></li>
              <li><Link to="#">Packaged Produce</Link></li>
              <li><Link to="#">Party Trays</Link></li>
              
            </ul>
          </div>
          <div className="col">
            <h5>BREADS & BAKERY</h5>
            <ul>
              <li><Link to="#">Fresh Vegetables</Link></li>
              <li><Link to="#">Herbs &Seasonings</Link></li>
              <li><Link to="#">Fresh Fruits</Link></li>
              <li><Link to="#">Cuts & Sprouts</Link></li>
              <li><Link to="#">Exotic fruits and Veggies</Link></li>
              <li><Link to="#">Packaged Produce</Link></li>
              <li><Link to="#">Party Trays</Link></li>
              
            </ul>
          </div>
        </div>

        <div className="copyright mt-3 pb-3 pt-3 d-flex">
          <p className="mb-0">Copyright 2024. All rights reserved.</p>
          <ul className="list list-inline ml-auto mb-0">
            <li className="list-inline-item">
              <Link to="#"><FaFacebookSquare/></Link>
            </li>
            <li className="list-inline-item">
              <Link to="#"><FaInstagramSquare/></Link>
            </li>
            <li className="list-inline-item">
              <Link to="#"><FaXTwitter/></Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;