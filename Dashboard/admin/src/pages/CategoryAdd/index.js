import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { postData } from "../../utils/api";

const CategoryUpload = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    images: "",
    color: "",
  });

  const [loading, setLoading] = useState(false);

  const changeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const { name, images, color } = formFields;
    return name.trim() !== "" && images.trim() !== "" && color.trim() !== "";
  };

  const addCategory = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    const formattedData = {
      ...formFields,
      images: [formFields.images],
    };

    try {
      const res = await postData("/api/category/create", formattedData);
      console.log("Response:", res);
      alert("Category created successfully!");

      // Reset form
      setFormFields({ name: "", images: "", color: "" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content w-100 p-4">
      {/* Header Section */}
      <div className="card shadow border-0 p-3 mb-4">
        <h4 className="hd mb-0">Add Category</h4>
        <small className="text-muted">Dashboard / Category / Add Category</small>
      </div>

      {/* Form Section */}
      <form onSubmit={addCategory}>
        <div className="card shadow border-0 p-4">
          <div className="mb-3">
            <label className="form-label fw-bold">Category Name</label>
            <input
              type="text"
              name="name"
              value={formFields.name}
              onChange={changeInput}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Image URL</label>
            <input
              type="text"
              name="images"
              value={formFields.images}
              onChange={changeInput}
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Color</label>
            <input
              type="text"
              name="color"
              value={formFields.color}
              onChange={changeInput}
              className="form-control"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              style={{
                backgroundColor: "#0057ff",
                fontWeight: 600,
                padding: "12px 0",
                fontSize: "1rem",
              }}
              startIcon={<AiOutlineCloudUpload />}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "PUBLISH AND VIEW"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryUpload;
