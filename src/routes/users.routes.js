const { Router } = require("express");
const UsersController = require("../controllers/UsersController");


const usersRoutes = Router();


const usersController = new UsersController();


usersRoutes.post("/create", usersController.create);

usersRoutes.put("/update/:id", usersController.update);

usersRoutes.get("/show/:id", usersController.showUser);



module.exports = usersRoutes;