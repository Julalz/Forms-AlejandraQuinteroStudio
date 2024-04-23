const express = require("express");

const createAccount = require("../controllers/users/createUserController");
const LoginUser = require("../controllers/users/loginUserController");
const validateAuth = require("../middlewares/validateAuth");
const userProfile = require("../controllers/users/userProfile");
const findFichaByServiceController = require("../controllers/users/fichaServicesController");

const router = express.Router();

router.route("/signup").post(createAccount);
router.route("/login").post(LoginUser);

router.route("/profile").all(validateAuth).get(userProfile);

module.exports = router;
