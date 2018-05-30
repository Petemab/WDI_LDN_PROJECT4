const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  text: {type: String, required: true },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

const placeSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  address: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  comments: [ commentSchema ]
});


const gigSchema = new mongoose.Schema({
  name: { type: String, required: 'This field is required' },
  image: { type: String },
  venue: { type: String },
  address: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  date: { type: String , required: 'This field is required'},
  startTime: { type: String },
  entryPrice: { type: String },
  ticketsAvailable: { type: Boolean },
  acts: [],
  description: { type: String },
  comments: []
});

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: 'This field is required' },
  gig: gigSchema,
  pub: placeSchema,
  restaurant: placeSchema,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: []
});



module.exports = mongoose.model('Event', eventSchema);
