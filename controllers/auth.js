const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

// function to allow users to register.
function register(req, res, next) {
  User.create(req.body)
    .then(user => {
      // Creates a token
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: `Thanks for registering at Stand Up Soirée ${user.username}!`,
        token,
        user
      });

    })
    .catch(next);
}

// logs user in - req.body.email is the email the user has entered in the form.

function login(req, res, next){
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'You are Unauthorized!' });
      }
      // token contains a payload (sub), secret(hides it), how long it will be stored in local(expires inxhours)
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: `Welcome back to Stand Up Soirée ${user.username}!`,
        token,
        user
      });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
