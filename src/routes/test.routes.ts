import { Request, Response, Router } from "express";
import * as testController from "../controllers/test.controller";

const router = Router();

router.get("/", testController.login);
router.get("/favorites", testController.favorites);
router.get("/token", testController.token);
router.get("/home", testController.helloWorld);

export default router;
