const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {type: String },
  email: {type: String },
  password: {type: String },
  image: {type: String},
  favecomics: {type: String }

});

//virtual so I can get the events to display on the user's profile
userSchema.virtual('events', {
  localField: '_id',
  foreignField: 'user',
  ref: 'Event'
});

//sets virtuals to true - obviously
userSchema.set('toJSON', {
  virtuals: true
});


module.exports = mongoose.model('User', userSchema);
