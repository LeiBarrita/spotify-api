import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/favorites", userController.favorites);
router.get("/playlists", userController.playlists);
router.get("/playlists/:id", userController.getPlaylistTracks);

export default router;
