const { Router } = require("express");
const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.router");


const routes = Router();


routes.use("/users", usersRoutes);
routes.use("/movienotes", movieNotesRoutes);


module.exports = routes;