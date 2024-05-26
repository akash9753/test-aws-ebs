import express from "express";
import * as PrefrenceTotalController from "./PrefrenceTotalController.js";
import { asyncWrapper } from "../common/utility/wrapper.js";
import authenticate from "../common/middleware/authenticate.js";
import { canAccess } from "../common/middleware/canAccess.js";
import { Roles } from "../common/constants/constant.js";

const router = express.Router();

router.get(
  "/prefrenceTotalCount",
  authenticate,
  canAccess([Roles.SUPER_ADMIN,Roles.USER]),
  asyncWrapper(PrefrenceTotalController.getPrefrenceTotalCount)
);

router.post(
  "/prefrenceUpdate",
  authenticate,
  canAccess([Roles.USER]),
  asyncWrapper(PrefrenceTotalController.mealPrefrenceUpdate)
);

export default router;
