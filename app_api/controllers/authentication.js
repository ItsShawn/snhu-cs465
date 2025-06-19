const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

const register = async function(req, res) {
  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    await user.save();
    const token = user.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async function(req, res) {
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) return res.status(400).json(err);
      if (user) {
        const token = user.generateJwt();
        res.status(200).json({ token });
      } else {
        res.status(401).json(info);
      }
    })(req, res);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { register, login };
