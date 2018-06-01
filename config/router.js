const router = require('express').Router();
const events = require('../controllers/events');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');
const profile = require('../controllers/profile');

router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create);

router.route('/events/:id')
  .get(events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete);

router.route('/users')
  .get(users.userIndex);

router.route('/users/:id')
  .get(users.userShow)
  .delete(secureRoute, users.userDelete);

router.route('/profile/:id')
  .get(secureRoute, profile.show);


router.post('/events/:id/comments', secureRoute, events.commentCreate);
router.delete('/events/:id/comments/:commentId', secureRoute, events.commentDelete);


router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
