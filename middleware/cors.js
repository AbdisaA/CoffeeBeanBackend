// corsMiddleware.js
const cors = require("cors");

const corsOptions = {
  origin: "*", // Change this to your desired origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Add any additional methods you need
  allowedHeaders: ["Content-Type", "Authorization"], // Add any additional headers you need
};

module.exports = cors(corsOptions);
