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
  },{
    gig: {
      name: 'Tom Allen',
      image: 'https://i.guim.co.uk/img/media/d7428a87e15c1a6b0725d17a8b0a7ff5175372ee/1161_971_1824_1094/master/1824.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=d6eea9ebba20a21ea226b262fa942fc0',
      venue: 'The 99 Comedy Club'
    }
  }
  ])
    .then(events => console.log(`${events.length} events created`))

    // return User
    //.create 

    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());

});
