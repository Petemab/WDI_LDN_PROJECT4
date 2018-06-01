const User = require('../models/user');


function userShowRoute(req, res, next) {
  User
    .findById(req.currentUser)
    //remember to populate the comments!!!!!
    .populate('events')
    .exec()
    .then(event => {
      if(!event) return res.sendStatus(404);
      res.json(event);
    })
    .catch(next);
}


function updateRoute(req, res, next){
  User
    .findById(req.currentUser)
    .then(user => {
      if(!user) return res.sendStatus(404);
      return Object.assign(user, req.body);
    })
    .then(user =>  user.save())
    .then(user => res.json(user))
    .catch(next);
}


module.exports = {
  show: userShowRoute,
  update: updateRoute
};
