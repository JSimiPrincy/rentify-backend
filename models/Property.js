// models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  nearbyHospitals: String,
  nearbyColleges: String,
  sellerId: mongoose.Schema.Types.ObjectId,
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Property', propertySchema);
