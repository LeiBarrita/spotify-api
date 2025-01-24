import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/favorites", userController.favorites);

export default router;
