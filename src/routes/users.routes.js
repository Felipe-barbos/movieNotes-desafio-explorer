const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UserAvatarController = require("../controllers/UserAvatarController");


const usersRoutes = Router();

const upload = multer(uploadConfig.MULTER);


const usersController = new UsersController();
const userAvatarController = new UserAvatarController();


usersRoutes.post("/create", usersController.create);

usersRoutes.put("/update/", ensureAuthenticated, usersController.update);

usersRoutes.get("/show/:id", ensureAuthenticated, usersController.showUser);

usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);



module.exports = usersRoutes;