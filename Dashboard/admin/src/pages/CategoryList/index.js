import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchDataFromApi,
  updateCategory,
  deleteCategory,
} from "../../utils/api";
import { Modal, Box, TextField, Button } from "@mui/material";

const CategoryList = () => {
  const [catData, setCatData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    images: [""],
    color: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = catData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(catData.length / itemsPerPage);

  const handleOpen = (item) => {
    setEditData({
      id: item._id,
      name: item.name || "",
      images: item.images || [""],
      color: item.color || "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = {
        name: editData.name,
        images: [editData.images[0]],
        color: editData.color,
      };

      await updateCategory(editData.id, updated);

      const res = await fetchDataFromApi("/api/category");
      setCatData(res);
      setCurrentPage(1);
      handleClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await deleteCategory(id);
      const res = await fetchDataFromApi("/api/category");
      setCatData(res);
      setCurrentPage(1);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchDataFromApi("/api/category")
      .then((res) => {
        const categories = Array.isArray(res) ? res : res.categories || [];
        setCatData(categories);
        setCurrentPage(1);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);
  

  return (
    <div className="content w-100 p-4">
      <div className="card shadow border-0 p-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="hd mb-0">Category List</h3>
          <nav>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Category
              </li>
            </ol>
          </nav>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="bg-primary text-white text-uppercase">
              <tr>
                <th scope="col"><input type="checkbox" /></th>
                <th scope="col">UID</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Color</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No categories found
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={item._id || index}>
                    <td><input type="checkbox" /></td>
                    <td>#{indexOfFirstItem + index + 1}</td>
                    <td>
                      <div className="fw-bold">{item.name}</div>
                      <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                        {item.description || "No description"}
                      </div>
                    </td>
                    <td>
                      <img
                        src={item.images?.[0] || "https://via.placeholder.com/40x40.png?text=Img"}
                        alt="category"
                        className="rounded"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </td>
                    <td>{item.color || "-"}</td>
                    <td>
                      <button className="btn btn-sm btn-success me-1" onClick={() => handleOpen(item)}>✏️</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>🗑</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            variant="outlined"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>

        {/* Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: 2,
          }}>
            <h4>Edit Category</h4>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Category Name"
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Category Image"
                name="images"
                value={editData.images[0]}
                onChange={(e) =>
                  setEditData({ ...editData, images: [e.target.value] })
                }
              />
              <TextField
                fullWidth
                margin="normal"
                label="Category Color"
                name="color"
                value={editData.color}
                onChange={handleChange}
              />
              <div className="d-flex justify-content-end mt-3">
                <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
                <Button variant="contained" type="submit">Submit</Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
