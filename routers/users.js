const UsersControllers = require("../controllers/users");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Function to create the destination folder if it doesn't exist
function createDestinationFolder(destination) {
  const folderPath = path.resolve(destination);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Create folder recursively
  }
}
const createMulterMiddleware = require("../middleware/multer");
createDestinationFolder("uploads/");
const uploadMiddleware = createMulterMiddleware("uploads/"); // Specify the destination folder

router.post(
  "/",
  uploadMiddleware.fields([{ name: "profileImage", maxCount: 1 }]),
  UsersControllers.createUsers
);
router.get("/", UsersControllers.getAllUsers);
router.post("/login", UsersControllers.login);
router.get("/:id", UsersControllers.getUserById);
router.get("/email/:email", UsersControllers.getUserByEmail);
router.put("/password/:id", UsersControllers.updatePassword);
module.exports = router;
