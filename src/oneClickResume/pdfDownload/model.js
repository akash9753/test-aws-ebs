// models/Pdf.js
import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  }
});

const resumePdf = mongoose.model('Pdf', pdfSchema);

export default resumePdf;
