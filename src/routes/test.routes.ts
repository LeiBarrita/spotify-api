import { Request, Response, Router } from "express";
import * as testController from "../controllers/test.controller";

const router = Router();

router.get("/", testController.helloWorld);
router.get("/favorites", testController.favorites);
router.get("/token", testController.token);
router.get("/login", testController.login);

export default router;
