const express = require("express");
const corsMiddleware = require("./middleware/cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const UserRouters = require("./routers/users");
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(corsMiddleware);

app.use("/api/users/", UserRouters);

mongoose
  .connect("mongodb://localhost:27017/CoffeeBeansDB", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Define a schema
    const Schema = mongoose.Schema;
    const TestSchema = new Schema({
      name: String,
    });

    // Compile model from schema
    const TestModel = mongoose.model("TestModel", TestSchema);
    let testDoc;
    // Create an instance of model
    const TestMod = TestModel.findOne({ name: "Test Document" });
    if (!TestMod) {
      testDoc = new TestModel({ name: "Test Document" });

      // Save the new model instance
      testDoc
        .save()
        .then((doc) => {
          console.log("Document saved successfully:", doc);
        })
        .catch((err) => {
          console.error("Error saving document:", err);
        });
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
