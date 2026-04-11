const express = require("express");
const router = express.Router();
const { login,register,isAdminExist } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/isAdminExist", isAdminExist);

module.exports = router;