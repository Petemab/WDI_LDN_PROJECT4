const Event = require('../models/event');


function EventIndexRoute(req, res, next) {
  Event
    .find()
    .exec()
    .then(events => res.json(events))
    .catch(next);
}




module.exports = {
  index: EventIndexRoute

};
