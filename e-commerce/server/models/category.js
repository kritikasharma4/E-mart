const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  color: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema); // ✅ Model name capitalized (convention)

module.exports = Category; // ✅ Export the model directly
