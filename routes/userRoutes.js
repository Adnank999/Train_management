

const express = require("express");
const { createUser, login } = require("../Controllers/userController");


const router = express.Router();

router.post("/create",createUser);
router.get("/login",login)



module.exports = { userRoutes: router };