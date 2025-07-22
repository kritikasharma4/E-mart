import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Button,
  MenuItem,
} from "@mui/material";
import { deleteProduct, updateProduct } from "../../utils/api";
import { fetchDataFromApi } from "../../utils/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    limit: 12,
    skip: 0,
    category: "",
    brand: "",
    search: "",
  });
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "success",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products`,
        { params: filters }
      );
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        msg: "Failed to fetch products",
        severity: "error",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetchDataFromApi("/api/category");
      const categories = Array.isArray(res) ? res : res.categories || [];
      setCategories(categories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
      setToast({
        open: true,
        msg: "Failed to load categories",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "All" || value === undefined ? "" : value,
      skip: 0,
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setToast({
          open: true,
          msg: "Product deleted successfully",
          severity: "success",
        });
        fetchProducts();
      } catch (err) {
        setToast({ open: true, msg: "Delete failed", severity: "error" });
      }
    }
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, skip: filters.limit * (page - 1) }));
  };

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <div className="content w-100 p-4">
      <div className="card shadow border-0 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="hd mb-0">Product List</h3>
          <Link to="/upload" className="btn btn-primary">
            + Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="row cardFilters mb-3">
          <div className="col-md-3">
            <h4>SHOW BY</h4>
            <select
              className="form-select"
              name="limit"
              onChange={handleChange}
            >
              {[12, 24, 48].map((val) => (
                <option key={val} value={val}>
                  {val} Rows
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <h4>SEARCH BY</h4>
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="name / brand"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table bestSellingTable">
            <thead>
              <tr>
                <th>UID</th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>RATING</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id}>
                  <td>{prod._id?.slice(-4)}</td>
                  <td>
                    <div className="productInfo">
                      <img src={prod.images[0]} width="50" alt="product" />
                      <div>
                        <div className="title">{prod.name}</div>
                        <div className="subtitle">{prod.description}</div>
                      </div>
                    </div>
                  </td>
                  <td>{prod.category?.name || "-"}</td>
                  <td>{prod.brand}</td>
                  <td>
                    {prod.oldPrice && prod.price < prod.oldPrice ? (
                      <>
                        <span className="text-muted text-decoration-line-through me-2">
                          ₹{prod.oldPrice.toFixed(2)}
                        </span>
                        <span className="text-danger fw-bold">
                          ₹{prod.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-dark fw-bold">
                        ₹{prod.price.toFixed(2)}
                      </span>
                    )}
                  </td>

                  <td>{prod.countInStock}</td>
                  <td>{prod.rating}</td>
                  <td>
                    <Link
                      to={`/product/${prod._id}`}
                      className="btn btn-sm btn-light me-1"
                    >
                      👁
                    </Link>
                    <button
                      className="btn btn-sm btn-success me-1"
                      onClick={() => setEditProduct(prod)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(prod._id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination d-flex justify-content-end align-items-center mt-3">
          <span className="ms-3">
            Page {filters.skip / filters.limit + 1} of {totalPages}
          </span>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.severity}>{toast.msg}</Alert>
      </Snackbar>

      {/* Edit Modal */}
      <Dialog
        open={!!editProduct}
        onClose={() => setEditProduct(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent dividers>
          {editProduct && (
            <>
              <TextField
                fullWidth
                label="Name"
                margin="dense"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Description"
                margin="dense"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                label="Brand"
                margin="dense"
                value={editProduct.brand}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, brand: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Old Price"
                type="number"
                margin="dense"
                value={editProduct.oldPrice || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, oldPrice: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                margin="dense"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Stock"
                type="number"
                margin="dense"
                value={editProduct.countInStock}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    countInStock: e.target.value,
                  })
                }
              />
              <TextField
                select
                fullWidth
                label="Category"
                margin="dense"
                value={editProduct.category?._id || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    category: categories.find(
                      (cat) => cat._id === e.target.value
                    ),
                  })
                }
              >
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                fullWidth
                label="Image URL"
                margin="dense"
                value={editProduct.images?.[0] || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, images: [e.target.value] })
                }
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditProduct(null)} disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              try {
                setIsUpdating(true);

                if (
                  editProduct.oldPrice &&
                  Number(editProduct.oldPrice) <= Number(editProduct.price)
                ) {
                  setToast({
                    open: true,
                    msg: "Old Price should be greater than Price",
                    severity: "warning",
                  });
                  setIsUpdating(false);
                  return;
                }

                await updateProduct(editProduct._id, {
                  name: editProduct.name,
                  description: editProduct.description,
                  brand: editProduct.brand,
                  oldPrice: editProduct.oldPrice,
                  price: editProduct.price,
                  countInStock: editProduct.countInStock,
                  category: editProduct.category?._id,
                  images: editProduct.images,
                });
                setToast({
                  open: true,
                  msg: "Product updated successfully",
                  severity: "success",
                });
                setEditProduct(null);
                fetchProducts();
              } catch (err) {
                console.error(err);
                setToast({
                  open: true,
                  msg: "Update failed",
                  severity: "error",
                });
              } finally {
                setIsUpdating(false);
              }
            }}
            disabled={isUpdating}
            variant="contained"
            color="primary"
          >
            {isUpdating ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
