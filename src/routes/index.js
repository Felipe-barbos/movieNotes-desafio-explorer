const { Router } = require("express");
const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.router");
const sessionsRoutes = require("./sessions.routes");


const routes = Router();


routes.use("/users", usersRoutes);
routes.use("/movienotes", movieNotesRoutes);
routes.use("/sessions", sessionsRoutes);


module.exports = routes;