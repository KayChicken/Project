const Router = require("express");
const router = new Router();
const User = require("../../models/User");

router.post("/login", async (req, res) => {

  try {
    const hashPassword = req.body.password
    const login = req.body.login
    const findUser = await User.findOne({ login: login });
    if (!findUser) {
      return res.status(400).json({ "message": "Неверный логин или пароль" })
    }
    const isValid = findUser.password === hashPassword

    if (!isValid) {
      return res.status(400).json({ "message": "Неверный логин или пароль" })
    }

    const { password, ...userData } = findUser._doc
    return res.status(200).json(userData)
  }

  catch (e) {
    console.log(e)
    return res.status(400).json({ "message": "Произошла ошибка" })
  }

});

router.post("/registration", async (req, res) => {
  try {
    const username = req.body.username
    const login = req.body.login
    const hashPassword = req.body.password
    const findUser = await User.findOne({ login: login })
    if (findUser) {
      return res.status(400).json({ "message": "Такой аккаунт уже существует" })
    }
    const createUser = new User({
      username: username,
      login: login,
      password: hashPassword,
    });
    const saveUser = await createUser.save();
    const { password, ...userData } = saveUser._doc
    res.status(200).json(userData);
  } catch (e) {
    console.log(e)
    res.status(404).json({ message: "failed" });
  }
});

module.exports = router;
