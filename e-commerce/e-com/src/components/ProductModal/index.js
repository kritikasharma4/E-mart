import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompare } from "react-icons/io5";


import "react-inner-image-zoom/lib/styles.min.css";
import QuantityDrop from "../QuantityDrop";

import ProductZoom from "../ProductZoom";
import { useContext } from "react";
import { MyContext } from "../../App";

const ProductModal = (props) => {
  const context=useContext(MyContext);
  return (
    <>
      <Dialog
        open={true}
        onClose={() => context.setIsOpenProductModal(false)}
        className="productModal"
      >
        <Button className="close_" onClick={() => context.setIsOpenProductModal(false)}>
          <IoClose />
        </Button>
        <h4 className="mb-1">All Natural Italian-style chicken Meatballs</h4>
        <div className="  brand-rating d-flex align-items-center mr-4">
          <div className="d-flex align-items-center mr-4">
            <span>Brands:</span>
            <span className="ml-2">
              <b>welch's</b>
            </span>
          </div>
          <Rating
            name="read-only"
            size="small"
            value={5}
            readOnly
            precision={0.5}
          />
          <hr />
        </div>
        <hr />
        <div className="row  mt-2 productDetailsModal">
          <div className="col-md-5">
            <ProductZoom/>
          </div>
          <div className="col-md-7">
            <div className="d-flex info align-items-center mb-3">
              <span className="oldPrice lg mr-2">$9.35</span>
              <span className="netPrice text-danger lg">$7.25</span>
            </div>

            <span className="badge bg-success">In Stock</span>

            <p className="mt-3">
              lorem ipsum orem ipsum orem ipsum orem ipsum orem ipsum orem ipsum
              v orem ipsum orem ipsum orem ipsum orem ipsum.
            </p>

            <div className="d-flex align-items-center">
              <QuantityDrop />
              <Button className="btn-blue btn-lg btn-big btn-round">
                Add to Cart
              </Button>
            </div>

            <div
              className="d-flex align-items-center mt-5 actions"
              style={{ gap: "12px"}}
            >
              <Button
                variant="outlined"
                startIcon={<FaRegHeart />}
                sx={{
                  color: "#000",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  fontSize: "13px",
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "6px 18px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  lineHeight: 1.2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "rgba(0, 0, 0, 0.3)",
                  },
                  "& svg": {
                    fontSize: "16px",
                  },
                }}
              >
                Add to Wishlist
              </Button>
              <Button
                variant="outlined"
                startIcon={<IoGitCompare />}
                sx={{
                  color: "#000",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  fontSize: "13px",
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "6px 18px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  lineHeight: 1.2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "rgba(0, 0, 0, 0.3)",
                  },
                  "& svg": {
                    fontSize: "16px",
                  },
                }}
              >
                Compare
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductModal;
