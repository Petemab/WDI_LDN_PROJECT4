const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: {type: String, required: 'This field is required'},
  email: {type: String, required: 'This field is required' },
  password: {type: String, required: 'This field is required' },
  image: {type: String},
  faveComedians: [{type: String }]

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

//m u v tidies up our errors for us
userSchema.plugin(require('mongoose-unique-validator'));

//compares the 2 passwords - the hashed one saved in the local storage and the password that's submitted
userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

//virtual is something createdbut not stored - underscore implies that the passwordconfirm is temporary
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

//Before (pre) any function 'saves' something, run this function to encrypt the password before it is stored:
userSchema.pre('validate', function checkPassword(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});


module.exports = mongoose.model('User', userSchema);
