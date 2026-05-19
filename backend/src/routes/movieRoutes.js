import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
} from "../controllers/movieController.js";
import { protect } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import upload from "../config/multer.js";
import uploadToCloudinary from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieById);

router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "backdrop", maxCount: 1 },
  ]),
  uploadToCloudinary,
  createMovie,
);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "backdrop", maxCount: 1 },
  ]),
  uploadToCloudinary,
  updateMovie,
);
router.delete("/:id", protect, adminOnly, deleteMovie);

export default router;
