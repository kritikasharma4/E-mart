import Sidebar from "../../components/Sidebar";
import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { VscTriangleDown } from "react-icons/vsc";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem";
import Pagination from "@mui/material/Pagination";
import { fetchDataFromApi } from "../../utils/api";

const Listing = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState("four");
  const [products, setProducts] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const openDropdown = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    setLoading(true);
    const url = id
      ? `/api/products?category=${id}&limit=${perPage}&skip=0`
      : `/api/products?limit=${perPage}&skip=0`;
    fetchDataFromApi(url).then((res) => {
      setProducts(res.products || (Array.isArray(res) ? res : []));
      setLoading(false);
    });
  }, [id, perPage]);

  return (
    <>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            <Sidebar />

            <div className="content_right">
              <img
                src="https://cmsimages.shoppersstop.com/The_Beauty_Spotlight_Hp_web_0448ce73db/The_Beauty_Spotlight_Hp_web_0448ce73db.jpg"
                className="w-100"
                alt="banner"
                style={{ borderRadius: 12, maxHeight: 180, objectFit: "cover" }}
              />

              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex align-items-center btnWrapper">
                  <Button
                    className={productView === "one" ? "act" : ""}
                    onClick={() => setProductView("one")}
                  >
                    <IoMdMenu />
                  </Button>
                  <Button
                    className={productView === "four" ? "act" : ""}
                    onClick={() => setProductView("four")}
                  >
                    <CgMenuGridR />
                  </Button>
                  <Button
                    className={productView === "three" ? "act" : ""}
                    onClick={() => setProductView("three")}
                  >
                    <TfiLayoutGrid4Alt />
                  </Button>
                </div>

                <div className="ml-auto showByFilter">
                  <Button onClick={handleClick}>
                    Show {perPage}
                    <VscTriangleDown />
                  </Button>
                  <Menu
                    className="w-100 showPerPageDropdown"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openDropdown}
                    onClose={handleClose}
                    MenuListProps={{ "aria-labelledby": "basic-button" }}
                  >
                    <MenuItem onClick={() => { setPerPage(10); handleClose(); }}>10</MenuItem>
                    <MenuItem onClick={() => { setPerPage(20); handleClose(); }}>20</MenuItem>
                    <MenuItem onClick={() => { setPerPage(30); handleClose(); }}>30</MenuItem>
                    <MenuItem onClick={() => { setPerPage(40); handleClose(); }}>40</MenuItem>
                  </Menu>
                </div>
              </div>

              <div className={`productListing ${productView}`}>
                {loading ? (
                  <p className="text-center w-100 py-5">Loading products...</p>
                ) : products.length === 0 ? (
                  <p className="text-center w-100 py-5">No products found.</p>
                ) : (
                  products.map((product) => (
                    <ProductItem key={product._id} product={product} itemView={productView} />
                  ))
                )}
              </div>

              <div className="d-flex align-items-center justify-content-center mt-5">
                <Pagination count={10} color="primary" size="large" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
