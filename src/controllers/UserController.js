const jwt = require("jsonwebtoken");
const User = require("../models/User");


const register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      password
    } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.redirect("/register");
    }

    

    var user = new User();
    user.fullName = fullName;
    user.username = username;
    user.setPassword(password);
    console.log(password)
    // await user.save();
    res.status(200).json({ user });

    // res.redirect('/login');
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User
      .findOne({ username })
      .select("username fullName password salt id");

    if (!user) return res.status(404).json({ error: "User not exist"});

    if (!user.validPassword(password))
      return res.status(500).json({error: "Wrong password"});

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    user.password = undefined;
    user.salt = undefined;

    res.redirect('/').json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) return res.status(404).json({ msg: 'User not found'});

    return res.status(200).json({ user, token: req.token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, getInfo }