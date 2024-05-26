import express from "express";
const router = express.Router();
import * as AuthController from "./AuthController.js";
import { asyncWrapper } from "../common/utility/wrapper.js";
import authenticate from "../common/middleware/authenticate.js";


router.post("/register", asyncWrapper(AuthController.register));

router.post("/login", asyncWrapper(AuthController.login));

router.get("/self", authenticate, asyncWrapper(AuthController.self));

router.post("/logout", authenticate, asyncWrapper(AuthController.logout));

export default router;
