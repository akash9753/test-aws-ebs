// Category Schema
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

// Subcategory Schema
const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String },
}, { timestamps: true });

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

// Reel Schema
const reelSchema = new mongoose.Schema({
  videoLink: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  views: { type: Number, default: 0 },
  duration: { type: Number }, // in seconds
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

const Reel = mongoose.model('Reel', reelSchema);

export default Reel;