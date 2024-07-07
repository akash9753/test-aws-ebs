import { io } from "../../server.js";
import PrefrenceTotalModel from "./PrefrenceTotalModel.js";
import createHttpError from "http-errors";

export const getPrefrenceTotalCount = async (req, res) => {
  const result = await PrefrenceTotalModel.find();
  const total = result.length;
  res.status(200).json({ success: true, total, data: result });
};

export const mealPrefrenceUpdate = async (req, res, next) => {
  const { mealdayId, prefrence, value } = req.body;

  if (!mealdayId || !prefrence || typeof value !== "boolean") {
    return next(createHttpError(400, "id, prefrence, and value are required"));
  }

  const userId = req.auth.userId;
  if (!userId) {
    return next(createHttpError(400, "Invalid userId"));
  }

  const update = value
    ? { $addToSet: { [prefrence]: userId } }
    : { $pull: { [prefrence]: userId } };

  const updatedPrefrence = await PrefrenceTotalModel.findByIdAndUpdate(
    mealdayId,
    update,
    { new: true }
  );

  if (!updatedPrefrence) {
    return next(createHttpError(404, "Prefrence total not found"));
  }

  const updatedMealTotal =  await PrefrenceTotalModel.find();
  
  io.emit("mealPreferenceUpdated", updatedMealTotal);

  res.json({ status: "success", data: updatedPrefrence });
};


export const updateMenu = async (req, res, next) => {
  const { id, breakfastMenu, lunchMenu, dinnerMenu } = req.body;

  if (!id) {
    return next(createHttpError(400, "id is required"));
  }

  const updateData = {};
  if (breakfastMenu) updateData.breakfastMenu = breakfastMenu;
  if (lunchMenu) updateData.lunchMenu = lunchMenu;
  if (dinnerMenu) updateData.dinnerMenu = dinnerMenu;

  if (Object.keys(updateData).length === 0) {
    return next(createHttpError(400, "No valid fields provided to update"));
  }

  try {
    const updatedMenu = await PrefrenceTotalModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedMenu) {
      return next(createHttpError(404, "Prefrence total not found"));
    }

    res.json({ status: "success", data: updatedMenu });
  } catch (error) {
    next(error);
  }
};