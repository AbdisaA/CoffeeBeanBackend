const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersControllers = {
  createUsers: async (req, res) => {
    try {
      const { name, email, phoneNo, address, password, confirmedPassword } =
        req.body;
      const profileImageFilename = req.files["profileImage"]
        ? req.files["profileImage"][0].filename
        : null;

      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
        return res.status(409).json("Email already existing in our records.");
      }

      if (password !== confirmedPassword) {
        return res.status(422).json("Passwords do not match!");
      }

      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS) || 10
      );
      const addUser = new User({
        name,
        email,
        phoneNo,
        address,
        password: hashedPassword,
        profileImage: profileImageFilename,
      });

      const saveUser = await addUser.save();
      res.status(201).json(saveUser);
    } catch (error) {
      console.log("errooorrr", error);
      return res.status(500).json({ message: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (!users.length) {
        return res.status(210).json([]);
      }

      return res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: "server error happened" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Account not Found " });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Your Password is Incorrect" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role?.name },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      res.status(200).json({ userId: user.id, token });
      console.log(token);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(217).json({ message: "user Not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },
  getUserByEmail: async (req, res) => {
    try {
      const user = await User.find({ email: req.params.email });
      if (!user) {
        res.status(217).json({ message: "user Not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
      console.log(error);
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect." });
      }

      if (newPassword !== confirmPassword) {
        return res.status(422).json({ message: "New passwords do not match." });
      }

      const hashedPassword = await bcrypt.hash(
        newPassword,
        parseInt(process.env.SALT_ROUNDS) || 10
      );
      await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });

      return res
        .status(200)
        .json({ message: "Password updated successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UsersControllers;
