const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController.js")

router.get("/whoami", usersController.whoami);
router.post("/login", usersController.login);
router.get("/logout", usersController.logout);
router.post("/register", usersController.register);
router.put("/edit", usersController.editUser);
router.post("/favorite", usersController.addFavorite);
router.get("/favorite/:id", usersController.getFavorites);
router.delete("/favorite", usersController.deleteFavorite);

module.exports = router