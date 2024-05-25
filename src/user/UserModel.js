import mongoose from "mongoose";

const PrefrenceTotalSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    dayName: { type: String, required: true },
    lunch: { type: [String] },
    breakfast: { type: [String] },
    dinner: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const PrefrenceTotal = mongoose.model("PrefrenceTotal", PrefrenceTotalSchema);

export default PrefrenceTotal;
