// multerMiddleware.js
const multer = require("multer");

// Function to create multer middleware with custom options
function createMulterMiddleware(destination) {
  // Define storage configuration for Multer
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination); // Use the provided destination
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Customize filename if needed
    },
  });

  // Define multer options
  return multer({ storage: storage });
}

// Export the function to create Multer middleware
module.exports = createMulterMiddleware;
