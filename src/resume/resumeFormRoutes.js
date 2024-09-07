import express from "express";
const router = express.Router();
import * as ResumeFromController from "./resumeFormController.js";
import uploadImage from "./helper/fileHelper.js";
import { asyncWrapper } from "../common/utility/wrapper.js";
import authenticate from "../common/middleware/authenticate.js";
import { canAccess } from "../common/middleware/canAccess.js";
import { Roles } from "../common/constants/constant.js";
// Define routes for your ResumeFrom model


router.get(
  "/allResumeByUserId/:id",
  authenticate,
  canAccess([Roles.SUPER_ADMIN, Roles.USER]),
  asyncWrapper(ResumeFromController.getAllResumesByUserId)
);
router.get(
  "/byResumeId/:id",
  authenticate,
  canAccess([Roles.SUPER_ADMIN, Roles.USER]),
  asyncWrapper(ResumeFromController.getResumeResumeId)
);
router.post(
  "/formInfo",
  authenticate,
  canAccess([Roles.SUPER_ADMIN, Roles.USER]),
//   uploadImage.any(),
  asyncWrapper(ResumeFromController.createResume)
);

router.delete(
  "/deleteByResumeId/:id",
  authenticate,
  canAccess([Roles.SUPER_ADMIN, Roles.USER]),
  asyncWrapper(ResumeFromController.deleteByResumeId)
);
router.patch(
  "/updateResume/:id",
  authenticate,
  uploadImage.any(),
  canAccess([Roles.SUPER_ADMIN, Roles.USER]),
  asyncWrapper(ResumeFromController.updateResume)
);
export default router;
