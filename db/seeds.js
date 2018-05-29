const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Event = require('../models/event');
const User = require('../models/user');


mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Event.create([
    {
      eventName: 'Funny Night',
      gig: {
        name: 'Katherine Ryan',
        image: 'https://static1.squarespace.com/static/59777fa59de4bbf784e37191/5977cca3bebafb498e72096d/59781bc6197aea7639aa9868/1501043655963/Katherine-Ryan-2-1-835x1253.jpg?format=300w',
        venue: 'Comedy Store',
        address: '1a Oxendon St, London SW1Y 4EE',
        location: {
          lat: 51.509980 ,
          lng: -0.132331
        },
        date: '2018-06-01',
        startTime: 20.00,
        entryprice: '5',
        ticketsAvailable: true,
        acts: ['Katherine Ryan', 'Dane Baptiste'],
        description: 'Katherine Ryan return to the Comedy Store for more Canadian jokes',
        comments: [ {
          text: 'This is always a great night'
        }]
      },
      pub: {
        name: 'The Broken Bottle',
        image: 'http://i.dailymail.co.uk/i/pix/2012/04/16/article-2130366-129DEBDE000005DC-340_964x641.jpg',
        address: '10 Brick Road',
        location: {
          lat: 51.5014,
          lng: 0.1419
        },
        comments: [ {
          text: 'The most dangerous pub in London'
        }

        ]
      }
    }, {
      eventName: 'Big Night Out',
      gig: {
        name: 'Rose Matafeo',
        image: 'https://sohotheatre.com/wp-content/uploads/2017/10/Sassy-best-friend-sep.jpg',
        venue: 'The Enterprise',
        address: '23 Oliver Road, Walthamstow',
        location: {
          lat: 51.582818,
          lng: -0.003243
        },
        date: '2018-06-06',
        startTime: 20.30,
        entryprice: '10',
        ticketsAvailable: true,
        acts: ['Rose Matafeo', 'Simon Brodkin'],
        description: 'Rose Matafeo returns with her current show I Tell Jokes And That',
        comments: [{
          text: 'Always got some good acts here' },
        {
          text: 'Looking forward to this one'}
        ]
      },
      restaurant: {
        name: 'The Ivy',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/The_Ivy_%2814136045781%29.jpg/220px-The_Ivy_%2814136045781%29.jpg',
        address: '1-5 West St, London WC2H 9NQ',
        location: {
          lat: 51.512946,
          lng: -0.128246
        },
        comments: [{
          text: 'Bit pricey'
        }]
      }
    },{
      eventName: 'The Same Old Nonsense',
      gig: {
        name: 'Tom Allen',
        image: 'https://i.guim.co.uk/img/media/d7428a87e15c1a6b0725d17a8b0a7ff5175372ee/1161_971_1824_1094/master/1824.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=d6eea9ebba20a21ea226b262fa942fc0',
        venue: 'The 99 Comedy Club',
        address: '1 Leicester Pl, London WC2H 7BP',
        location: {
          lat: 51.510963,
          lng: -0.130244
        },
        date: '2018-08-06',
        startTime: 20.00,
        entryprice: '12',
        ticketsAvailable: true,
        acts: ['Tom Allen', 'Arthur Smith'],
        description: 'Tom tells it like it is',
        comments: [{
          text: 'Love this guy'},{
          text: 'Not sure about this one'}
        ]
      },
      pub: {
        name: 'The Sherlock Holmes',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/00/12/e0/4d/the-sherlock-holmes-pub.jpg',
        address: '10 Northumberland St, London WC2N 5DB',
        location: {
          lat: 51.507367,
          lng: -0.125204
        },
        comments: [{
          text: 'Gets a bit busy'}, {
          text: 'Way too far from the gig'}
        ]
      }
    }
  ])
    .then(events => console.log(`${events.length} events created`));

  User
    .create([{
      username: 'Billy111',
      email: 'bill@bill',
      password: 'bill',
      passwordConfirmation: 'bill',
      image: 'http://cdn.smosh.com/wp-content/uploads/bloguploads/strange-mugshot-neck.jpg',
      faveComedians: ['Michael McIntyre', 'Roy Chubby Brown']
    },{
      username: 'Sarah',
      email: 'sarah@ga.co',
      password: 'sara',
      passwordConfirmation: 'sara',
      image: 'https://i.guim.co.uk/img/media/db8e8f0dfd7a5dcfad713ea4fd5382e5ff1324b3/0_685_4342_3977/master/4342.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=642cdbb0be7fca163c38b7b19716249b',
      faveComedians: ['Dawn French', 'Frankie Boyle']
    },{
      username: 'Moon',
      email: 'moon@moon',
      password: 'moon',
      passwordConfirmation: 'moon',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Lyudmila_Putina_Portrait2.jpg/220px-Lyudmila_Putina_Portrait2.jpg',
      faveComedians: ['Michael McIntyre', 'Roy Chubby Brown']
    }
    ])
    .then(users => {
      console.log(`${users.length} users created`);
      Event.create([{eventName: 'hello'}])
        .then(console.log('event created'));
    })

    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());

});
