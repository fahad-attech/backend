const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../../models");

//pre route /login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if all exists
    if (!(email && password)) {
      return res.status(400).send("All (email, password) fields are required");
    }
    //check if it exists in users tabel if yes return it
    const IsRegistered = await User.findOne({
      where: {
        email,
      },
    });
    //compare the hashed password and normal to check match
    if (
      IsRegistered &&
      (await bcrypt.compare(password, IsRegistered.password))
    ) {
      const token = jwt.sign(
        {
          userId: IsRegistered.id,
          email: IsRegistered.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      IsRegistered.token = "okokok";
      return res.status(200).json({ token });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    //check if all exists
    if (!(name && email && password)) {
      return res
        .status(400)
        .send("All(name, email, password) fields are required");
    }
    //check if it exists in users tabel if yes return it
    const IsRegistered = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });
    console.log("ISREGISTERED:", IsRegistered);
    if (!!IsRegistered) {
      return res.status(409).send("User already registered please login");
    }
    //hash password and stores the User.
    console.log("process.env.HASH_SALTS", process.env.HASH_SALTS);
    // const salt = await bcrypt.genSalt(process.env.HASH_SALTS || 10);
    // console.log("hashedPassword", typeof salt, salt);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(
      {
        name,
        email,
        role,
        password: hashedPassword,
      },
    );
    console.log("New User: ", newUser);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
module.exports = router;
