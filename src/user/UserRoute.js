import express from "express";
const router = express.Router();
import * as UserController from "./UserController.js";
import authenticate from "../common/middleware/authenticate.js";
import { canAccess } from "../common/middleware/canAccess.js";
import { Roles } from "../common/constants/constant.js";

router.get(
  "/list",
  authenticate,
  canAccess([Roles.SUPER_ADMIN]),
  UserController.getList
);

export default router;