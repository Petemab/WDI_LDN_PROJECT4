const router = require('express').Router();
const events = require('../controllers/events');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

router.route('/events')
  .get(events.index)
  .post(events.create);

router.route('/events/:id')
  .get(events.show)
  .put(events.update)
  .delete(events.delete);

router.route('/users')
  .get(users.userIndex);

router.route('/users/:id')
  .get(users.userShow)
  .delete(users.userDelete);

router.post('/events/:id/comments', events.commentCreate);
router.delete('/events/:id/comments/:commentId', events.commentDelete);


router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
