import PrefrenceTotalModel from "./PrefrenceTotalModel.js";

export const getPrefrenceTotalCount = async (req, res) => {
  try {
    const result = await PrefrenceTotalModel.find();
    const total= result.length;
    res.status(200).json({success:true,total,result});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





