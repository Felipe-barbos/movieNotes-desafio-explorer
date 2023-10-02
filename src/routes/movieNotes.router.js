const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();


movieNotesRoutes.post("/create/:user_id", movieNotesController.create);

movieNotesRoutes.get("/:id", movieNotesController.show);

movieNotesRoutes.delete("/delete/:id", movieNotesController.delete);

movieNotesRoutes.get("/", movieNotesController.index);


module.exports = movieNotesRoutes;