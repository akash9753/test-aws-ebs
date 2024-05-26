import PrefrenceTotalModel from "./PrefrenceTotalModel.js";

export const getPrefrenceTotalCount = async (req, res) => {
  const result = await PrefrenceTotalModel.find();
  const total = result.length;
  res.status(200).json({ success: true, total, data: result });
};
