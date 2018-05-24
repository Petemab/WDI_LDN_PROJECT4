const mongoose = require('mongoose');


const placeSchema = new mongoose.Schema({
  name: {type: String },
  image: {type: String},
  address: {type: String},
  location: {
    lat: {type: Number},
    lng: {type: Number}
  }
});


const gigSchema = new mongoose.Schema({
  name: {type: String},
  image: {type: String},
  venue: {type: String},
  address: {type: String},
  location: {
    lat: {type: Number},
    lng: {type: Number}
  },
  date: {type: Date },
  startTime: {type: Number},
  entryprice: {type: String},
  ticketsAvailable: { type: Boolean},
  description: {type: String }
});

const eventSchema = new mongoose.Schema({
  gig: gigSchema,
  pub: placeSchema,
  restaurant: placeSchema,
  user: { type: mongoose.Schema.ObjectId }
});



module.exports = mongoose.model('Event', eventSchema);
