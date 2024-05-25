import express from "express";
const router = express.Router();
import * as PrefrenceTotalController from "./PrefrenceTotalController.js";

router.get(
  "/prefrenceTotalCount",
  PrefrenceTotalController.getPrefrenceTotalCount
);

export default router;
