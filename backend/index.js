// Required modules and middleware
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const ItemModel = require("./models/Items");
const seedRouter = require("./routes/seed.js");
const productRouter = require("./routes/productRoutes.js");
const slugRouter = require("./routes/slugRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // parse incoming JSON data
dotenv.config(); // Load environment variables from .env file
app.use(express.json()); // parse incoming JSON data
app.use(cors()); // allow Cross-Origin Resource Sharing (CORS)

// Connect to MongoDB database
try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB Connected");
} catch (err) {
  console.log("MongoDB error");
}

// Define routes for different API endpoints
app.use("/api/user", userRouter);
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/slug", slugRouter);

// Route for user registration
app.post("/register", async (req, res) => {
  // Hash the user's password using bcrypt with a salt factor of 10
  const newPassword = await bcrypt.hash(req.body.password, 10);

  // Check if the user's email already exists in the database
  const existing = await User.findOne({ email: req.body.email });

  // Creates new user if email does not exist
  if (existing) {
    res.status(409).send("Email is already in use");
  } else {
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
      });
      res.status(200).send("New user created");
    } catch (err) {
      res.status(404).send({ message: "Error with registration", error: err });
    }
  }
});

// Route for user login
app.post("/login-user", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res
      .status(404)
      .send({ auth: false, message: "Email or password incorrect" });
  } else {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Checks for username password match
    if (passwordMatch) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET
      );
      res
        .status(200)
        .json({
          auth: true,
          token: token,
          email: user.email,
          name: user.name,
          user_id: user._id,
        });
    } else {
      res
        .status(404)
        .json({ auth: false, message: "Email or password incorrect" });
    }
  }
});

// Start the server and listen on port 3019
app.listen(3019, () => {
  console.log("server running at port 3019");
});
