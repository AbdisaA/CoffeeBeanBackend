const UsersControllers = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.post("/", UsersControllers.createUsers);

module.exports = router;
