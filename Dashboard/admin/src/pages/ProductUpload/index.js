import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { fetchDataFromApi, postData } from "../../utils/api";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";

const ProductUpload = () => {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [catData, setCatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
    oldPrice: 0,
    category: "",
    countInStock: 0,
    rating: 0,
    isFeatured: false,
  });

  useEffect(() => {
    fetchDataFromApi("/api/category")
      .then((res) => {
        if (Array.isArray(res)) {
          setCatData(res);
        } else {
          console.warn("Expected category data to be an array", res);
          setCatData([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCatData([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = type === "number" ? parseFloat(value) : value;
    if (name === "isFeatured") val = value === "true";
    setFormFields((prev) => ({ ...prev, [name]: val }));
  };

  const handleAddImage = () => {
    const trimmed = imageUrl.trim();
    const isValidUrl = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(trimmed);

    if (!trimmed) {
      toast.warning("⚠️ Image URL cannot be empty.");
    } else if (!isValidUrl) {
      toast.error("❌ Invalid image URL format.");
    } else {
      setImages((prev) => [...prev, trimmed]);
      setImageUrl("");
    }
  };

  const validateForm = () => {
    const {
      name,
      description,
      brand,
      price,
      oldPrice,
      category,
      countInStock,
    } = formFields;

    if (!name || !description || !brand || !price || !category || !countInStock) {
      toast.error("❌ Please fill all required fields.");
      return false;
    }

    if (images.length === 0) {
      toast.error("❌ At least one image is required.");
      return false;
    }

    if (oldPrice > 0 && price >= oldPrice) {
      toast.error("❌ Discounted price must be less than original price.");
      return false;
    }

    return true;
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const productData = { ...formFields, images };
    setIsLoading(true);

    try {
      const response = await postData("/api/products/create", productData);

      if (response && response._id) {
        toast.success("✅ Product uploaded successfully!");

        setFormFields({
          name: "",
          description: "",
          brand: "",
          price: 0,
          oldPrice: 0,
          category: "",
          countInStock: 0,
          rating: 0,
          isFeatured: false,
        });
        setImages([]);
      } else {
        toast.error("❌ Upload failed: " + (response?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Upload failed:", err.message);
      toast.error("❌ Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-upload-container d-flex">
      <form onSubmit={addProduct} className="content w-100 p-4">
        <div className="card shadow border-0 p-3 mb-4">
          <h4 className="hd mb-0">Product Upload</h4>
          <small className="text-muted">Dashboard / Products / Upload</small>
        </div>

        <div className="card shadow border-0 p-4">
          <h5 className="hd mb-3">Basic Information</h5>

          <div className="mb-3">
            <label className="form-label fw-bold">Product Name*</label>
            <input
              type="text"
              name="name"
              value={formFields.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description*</label>
            <textarea
              name="description"
              rows="4"
              value={formFields.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Category*</label>
              <select
                className="form-select"
                name="category"
                value={formFields.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {catData.map((cat, i) => (
                  <option key={cat._id || i} value={cat._id || cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Brand*</label>
              <input
                type="text"
                className="form-control"
                name="brand"
                value={formFields.brand}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Discounted Price*</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formFields.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Original Price (MRP)</label>
              <input
                type="number"
                className="form-control"
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Is Featured</label>
              <select
                className="form-select"
                name="isFeatured"
                value={formFields.isFeatured}
                onChange={handleChange}
              >
                <option value="false">None</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Product Stock*</label>
              <input
                type="number"
                className="form-control"
                name="countInStock"
                value={formFields.countInStock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label fw-bold">Ratings</label>
              <Rating
                name="rating"
                value={formFields.rating}
                precision={0.5}
                max={5}
                onChange={(event, newValue) => {
                  setFormFields((prev) => ({
                    ...prev,
                    rating: newValue,
                  }));
                }}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Image URL*</label>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                />
                <Button
                  variant="outlined"
                  onClick={handleAddImage}
                  type="button"
                >
                  Add Image
                </Button>
              </div>
            </div>
          </div>

          <div className="d-grid">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              style={{
                backgroundColor: "#0057ff",
                fontWeight: 600,
                padding: "12px 0",
                fontSize: "1rem",
              }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  <AiOutlineCloudUpload />
                )
              }
            >
              {isLoading ? "Uploading..." : "PUBLISH AND VIEW"}
            </Button>
          </div>
        </div>
      </form>

      {/* Image Preview */}
      <div className="image-preview-sticky p-3">
        {images.map((img, i) => (
          <div className="preview-box mb-3 position-relative" key={i}>
            <img src={img} alt="preview" className="preview-img" />
            <button
              className="btn btn-sm btn-danger position-absolute top-0 end-0"
              onClick={() =>
                setImages((prev) => prev.filter((_, index) => index !== i))
              }
              style={{ transform: "translate(30%, -30%)" }}
              type="button"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductUpload;
