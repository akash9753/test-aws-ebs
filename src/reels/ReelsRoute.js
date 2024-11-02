import express from "express";
import { Roles } from "../common/constants/constant.js";
import * as ReelsController from "./ReelsController.js";
import authenticate from "../common/middleware/authenticate.js";
import { canAccess } from "../common/middleware/canAccess.js";
import { asyncWrapper } from "../common/utility/wrapper.js";
import upload from "../common/middleware/multer.js";


const router = express.Router();

router.get(
  "/getAllReels",
  authenticate,
  canAccess([Roles.SUPER_ADMIN]),
  asyncWrapper(ReelsController.getAllReels)
);

router.get(
  "/queryReels",
  authenticate,
  canAccess([Roles.SUPER_ADMIN]),
  asyncWrapper(ReelsController.getAllReels)
);

router.post(
  "/upload-video",
  authenticate,
  canAccess([Roles.SUPER_ADMIN]),
  upload.single("video"),
  ReelsController.uploadVideo
);

export default router;
