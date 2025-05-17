import moviesController from "../controllers/MoviesController.js"
import express from "express"
import multer from "multer";

const router = express.Router()

const upload = multer({dest: "public/"})

router.route("/")
.get(moviesController.getMovies)
.post(upload.single("image"), moviesController.postMovies)

router.route("/:id")
.delete(moviesController.deleteMovies)
.put(upload.single("image"), moviesController.putMovies)

export default router;