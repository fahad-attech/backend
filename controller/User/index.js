const express = require("express");
const { User, Todos } = require("../../models");
const router = express.Router();

//user is prepended route Name
// router.use((req,res,next)=>{
//     //validate
//     //condition true
//     next()
// })
router
  .route("/")
  .get(async (req, res) => {
    //get all the users list
    const users = await User.findAll();
    res.json(users);
  })
  .post(async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const oldUser = await User.findOne({ where: { email } });
      if (oldUser) return res.status(409).send("Email Already Exists");
      const newUser = await User.create({ name, email, password, role });
      res.json(newUser);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  })
  .put((req, res) => {
    res.send("Put Route");
  })
  .delete((req, res) => {
    res.send("Delete Route");
  });

module.exports = router;
