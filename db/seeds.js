const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Event = require('../models/event');


mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Event.create([{
    gig: {
      name: 'Katherine Ryan',
      image: 'https://static1.squarespace.com/static/59777fa59de4bbf784e37191/5977cca3bebafb498e72096d/59781bc6197aea7639aa9868/1501043655963/Katherine-Ryan-2-1-835x1253.jpg?format=300w',
      venue: 'Comedy Store'
    }
  }, {
    gig: {
      name: 'Rose Matafeo',
      image: 'https://sohotheatre.com/wp-content/uploads/2017/10/Sassy-best-friend-sep.jpg',
      venue: 'The Enterprise'
    }
  }])
    .then(events => console.log(`${events.length} events created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());

});
