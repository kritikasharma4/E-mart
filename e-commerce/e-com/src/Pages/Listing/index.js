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
    <section className="product_Listing_Page">
      <div className="container">
        <div className="productListing-row">
          <div className="sidebarWrapper">
            <Sidebar />
          </div>

          <div className="content_right">
            <img
              src="https://cmsimages.shoppersstop.com/The_Beauty_Spotlight_Hp_web_0448ce73db/The_Beauty_Spotlight_Hp_web_0448ce73db.jpg"
              className="banner-img"
              alt="Category banner"
            />

            <div className="listingToolbar">
              <div className="viewBtns">
                <Button className={productView === "one" ? "act" : ""} onClick={() => setProductView("one")} title="List view">
                  <IoMdMenu />
                </Button>
                <Button className={productView === "four" ? "act" : ""} onClick={() => setProductView("four")} title="Grid view">
                  <CgMenuGridR />
                </Button>
                <Button className={productView === "three" ? "act" : ""} onClick={() => setProductView("three")} title="3-column view">
                  <TfiLayoutGrid4Alt />
                </Button>
              </div>

              <div className="showByFilter">
                <Button onClick={handleClick}>
                  Show {perPage} <VscTriangleDown style={{ marginLeft: 4 }} />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openDropdown}
                  onClose={handleClose}
                  MenuListProps={{ "aria-labelledby": "show-per-page" }}
                >
                  {[10, 20, 30, 40].map(n => (
                    <MenuItem key={n} onClick={() => { setPerPage(n); handleClose(); }}>{n}</MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            <div className={`productListing ${productView}`}>
              {loading ? (
                <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>Loading products...</p>
              ) : products.length === 0 ? (
                <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>No products found in this category.</p>
              ) : (
                products.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              )}
            </div>

            <div className="d-flex align-items-center justify-content-center mt-4">
              <Pagination count={10} color="primary" size="large" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
