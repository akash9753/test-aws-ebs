import PrefrenceTotalModel from "./PrefrenceTotalModel.js";

export const getPrefrenceTotalCount = async (req, res) => {
  const result = await PrefrenceTotalModel.find();
  const total = result.length;
  res.status(200).json({ success: true, total, data: result });
};

export const mealPrefrenceUpdate = async (req, res) => {
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // io.emit("mealPreferenceUpdated", updatedMealTotal);

  res.json({ status: "success", data: updatedPrefrence });
};
