import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import QuantityDrop from '../../components/QuantityDrop';
import { IoClose } from "react-icons/io5";
import  Button  from '@mui/material/Button';


const Cart = () => {
  return (
    <section className="section cartPage">
      <div className="container">
      <h2 className="hd mb-0">Your Cart</h2>
            <p>
              There are <b>3</b> products in your cart
            </p>
        <div className="row">
          <div className="col-md-9 pr-5">
            

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th width="40%">Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td >
                    <Link to="/product/1">
                      <div className="d-flex align-items-center cartItemimgWrapper">
                        <div className="imgWrapper">
                          <img src="https://api.spicezgold.com/download/file_1734788009997_lay-s-american-style-cream-onion-potato-chips-82-g-product-images-o491696354-p590121272-0-202410031824.webp" className="w-100"/>
                        </div>

                        <div className="info px-3">
                          <h6>Field Roast chao cheese Creamy original.</h6>
                          <Rating name="read-only" value={4.5} precision={0.5} size='small' readOnly />
                        </div>
                      </div>
                      </Link>
                    </td>
                    <td >$7.25</td>
                    <td className="quantity-col"><QuantityDrop/></td>
                    <td>$7.25</td>
                    <td>
                      <span className='remove'><IoClose/></span>
                    </td>
                  </tr>
                  <tr>
                    
                    <td >
                    <Link to="/product/1">
                      <div className="d-flex align-items-center cartItemimgWrapper">
                        <div className="imgWrapper">
                          <img src="https://api.spicezgold.com/download/file_1734788009997_lay-s-american-style-cream-onion-potato-chips-82-g-product-images-o491696354-p590121272-0-202410031824.webp" className="w-100"/>
                        </div>

                        <div className="info px-3">
                          <h6>Field Roast chao cheese Creamy original.</h6>
                          <Rating name="read-only" value={4.5} precision={0.5} size='small' readOnly />
                        </div>
                      </div>
                      </Link>
                    </td>
                    <td >$7.25</td>
                    <td className="quantity-col"><QuantityDrop/></td>
                    <td>$7.25</td>
                    <td>
                      <span className='remove'><IoClose/></span>
                    </td>
                  </tr>
                  <tr>
                    
                    <td >
                    <Link to="/product/1">
                      <div className="d-flex align-items-center cartItemimgWrapper">
                        <div className="imgWrapper">
                          <img src="https://api.spicezgold.com/download/file_1734788009997_lay-s-american-style-cream-onion-potato-chips-82-g-product-images-o491696354-p590121272-0-202410031824.webp" className="w-100"/>
                        </div>

                        <div className="info px-3">
                          <h6>Field Roast chao cheese Creamy original.</h6>
                          <Rating name="read-only" value={4.5} precision={0.5} size='small' readOnly />
                        </div>
                      </div>
                      </Link>
                    </td>
                    <td >$7.25</td>
                    <td className="quantity-col"><QuantityDrop/></td>
                    <td>$7.25</td>
                    <td>
                      <span className='remove'><IoClose/></span>
                    </td>
                  </tr>
                  <tr>
                    
                    <td >
                    <Link to="/product/1">
                      <div className="d-flex align-items-center cartItemimgWrapper">
                        <div className="imgWrapper">
                          <img src="https://api.spicezgold.com/download/file_1734788009997_lay-s-american-style-cream-onion-potato-chips-82-g-product-images-o491696354-p590121272-0-202410031824.webp" className="w-100"/>
                        </div>

                        <div className="info px-3">
                          <h6>Field Roast chao cheese Creamy original.</h6>
                          <Rating name="read-only" value={4.5} precision={0.5} size='small' readOnly />
                        </div>
                      </div>
                      </Link>
                    </td>
                    <td >$7.25</td>
                    <td className="quantity-col"><QuantityDrop/></td>
                    <td>$7.25</td>
                    <td>
                      <span className='remove'><IoClose/></span>
                    </td>
                  </tr>
                  <tr>
                    
                    <td >
                    <Link to="/product/1">
                      <div className="d-flex align-items-center cartItemimgWrapper">
                        <div className="imgWrapper">
                          <img src="https://api.spicezgold.com/download/file_1734788009997_lay-s-american-style-cream-onion-potato-chips-82-g-product-images-o491696354-p590121272-0-202410031824.webp" className="w-100"/>
                        </div>

                        <div className="info px-3">
                          <h6>Field Roast chao cheese Creamy original.</h6>
                          <Rating name="read-only" value={4.5} precision={0.5} size='small' readOnly />
                        </div>
                      </div>
                      </Link>
                    </td>
                    <td >$7.25</td>
                    <td className="quantity-col"><QuantityDrop/></td>
                    <td>$7.25</td>
                    <td>
                      <span className='remove'><IoClose/></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-3">
            <div className='card border p-3 cartDetails'>
              <h4>CART TOTALS</h4>

              <div className='d-flex align-items-center mb-3'>
                <span>Subtotal</span>
                <span className='ml-auto text-red ' style={{fontWeight:"bold"}}>$12.31</span>
              </div>

              <div className='d-flex align-items-center mb-3'>
                <span>Shipping</span>
                <span className='ml-auto'><b>Free</b></span>
              </div>

              <div className='d-flex align-items-center mb-3'>
                <span>Estimate for</span>
                <span className='ml-auto'><b>United Kingdom</b></span>
              </div>

              <div className='d-flex align-items-center mb-3'>
                <span>Total</span>
                <span className='ml-auto text-red' style={{fontWeight:"bold"}}>$12.31</span>
              </div>

              <Button className='bg-red btn-lg btn-big ml-3' style={{background:"#2bbef9", color:"#fff"}}>Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
