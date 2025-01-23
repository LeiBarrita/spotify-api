import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.get("/", authController.login);
router.get("/token", authController.token);

export default router;
