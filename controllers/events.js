const Event = require('../models/event');

function indexRoute(req, res, next) {
  Event
    .find()
    .exec()
    .then(events => res.json(events))
    .catch(next);
}

function showRoute(req, res, next) {
  Event
    .findById(req.params.id)
    //remember to populate the comments!!!!!
    .populate('comments.user')
    .exec()
    .then(event => {
      if(!event) return res.sendStatus(404);
      res.json(event);
    })
    .catch(next);
}


function createRoute(req, res, next){
  // remember to this add to attach user to the newly created event once I've done log in and register  ----- req.body.user = req.currentUser
  req.body.user = req.currentUser;
  Event
    .create(req.body)
    // if I ever refer to this project in future - REMEMBER BODY PARSER!!!!!
    .then(event => res.status(201).json(event))
    .catch(next);

}

function updateRoute(req, res, next){
  Event
    .findById(req.params.id)
    //remember to populate
    .then(event => {
      if(!event) return res.sendStatus(404);
      return Object.assign(event, req.body);
    })
    .then(event => event.save())
    .then(event => res.json(event))
    .catch(next);
}

function deleteRoute(req, res, next){
  Event
    .findById(req.params.id)
    .then(event => {
      if(!event) return res.sendStatus(404);
      return event.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}


function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser;
  Event
    .findById(req.params.id)
    .populate('comments.user')
    .exec()
    .then(event => {
      event.comments.push(req.body);
      return event.save();
    })
    .then(event => res.json(event))
    .catch(next);
}

function commentDeleteRoute(req, res, next) {
  Event.findById(req.params.id)
    .populate('comments.user')
    .exec()
    .then(event => {
      const comment = event.comments.id(req.params.commentId);
      if(!comment.user._id.equals(req.currentUser._id)) {
        throw new Error('Unauthorized');
      }
      comment.remove();
      return event.save();
    })
    .then(event => res.json(event))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
};
