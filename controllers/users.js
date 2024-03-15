const User = require("../models/Users");
const bcrypt = require("bcrypt");
const UsersControllers = {
  createUsers: async (req, res) => {
    try {
      const { name, email, phoneNo, address, password, confirmedPassword } =
        req.body;

      const emailCheck = await User.findOne({ eamil: email });
      if (emailCheck) {
        return res.status(210).json("Email already Existing in our record");
      }

      if (password !== confirmedPassword) {
        return res.status(210).json("Password Doesnot matched !");
      }
      const hashedPassword = await bcrypt.hash(password, 10); // Hash with 10 salt rounds

      const addUser = new User({
        name,
        email,
        phoneNo,
        address,
        password: hashedPassword,
      });

      const saveUser = await addUser.save();
      res.status(201).json(saveUser);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

module.exports = UsersControllers;
