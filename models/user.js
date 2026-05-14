const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
