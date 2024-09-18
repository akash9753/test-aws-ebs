import express from "express";
const router = express.Router();
import * as downloadPdf from "./Controller.js";

import { asyncWrapper } from "../../common/utility/wrapper.js";
import authenticate from "../../common/middleware/authenticate.js";
import { canAccess } from "../../common/middleware/canAccess.js";
import { Roles } from "../../common/constants/constant.js";



router.get(
  "/downloadPdf",
  // authenticate,
  // canAccess([Roles.SUPER_ADMIN, Roles.USER]),
  asyncWrapper(downloadPdf.generateAndSavePdf)
);





export default router;
