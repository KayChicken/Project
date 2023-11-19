const Router = require("express");
const router = new Router();
const User = require("../../models/User");

router.post("/login", (req, res) => {
  const { login, password } = req.body;
  const findUser = User.find;
});

router.post("/registration", async (req, res) => {
  try {
    const { login, password } = req.body;
    const createUser = new User({
      login: login,
      password: password,
    });
    const saveUser = await createUser.save();
    res.json({ message: "succesful" });
  } catch (e) {
    res.json({ message: "failed" });
  }
});

module.exports = router;
