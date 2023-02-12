const express = require("express");
const auth = require("../utils/auth");
const {
  userLoginController,
  updateUserController,
  userRegisterController,
  getUsersController,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/users/login", userLoginController);

router.get("/users/verify", auth, (req, res) => res.json(res.locals.user));

router.get("/users", auth, getUsersController);

router.put("/users/:id", auth, updateUserController);

router.post("/users/register", userRegisterController);

module.exports = router;
