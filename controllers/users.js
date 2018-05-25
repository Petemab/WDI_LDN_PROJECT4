const User = require('../models/user');


function userIndexRoute(req, res, next) {
  User
    .find()
    .exec()
    //what do I populate this with?
    // .populate()
    .then(users => res.json(users))
    .catch(next);
}

function userShowRoute(req, res, next) {
  User
    .findById(req.params.id)
    //remember to populate the comments!!!!!
    .populate('events')
    .exec()
    .then(event => {
      if(!event) return res.sendStatus(404);
      res.json(event);
    })
    .catch(next);
}

function userDeleteRoute(req, res, next){
  User
    .findById(req.params.id)
    .then(user => {
      if(!user) return res.sendStatus(404);
      return user.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  userIndex: userIndexRoute,
  userShow: userShowRoute,
  userDelete: userDeleteRoute
};
