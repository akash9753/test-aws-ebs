import UserModel from "./UserModel.js";



export const getList = async (req, res) => {
  try {
    const result = await UserModel.find({}, '-password -confirmPassword');
    const total= result.length;
    res.status(200).json({success:true,total,data:result});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};