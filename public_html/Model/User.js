const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const address = require('./Address');

const UserSchema = new mongoose.Schema({
    
  firstname: {
    type: String,
    required: [true, 'Firstname is required'],
    minlength: 3,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
    minlength: 3,
    maxlength: 50
  },
  usertype: {
    type: String //user, doctor, admin
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  website: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 255
  },
  addresses:[address],
  phone:[],
  user_type:{
    type: Number
  },
},
{
  versionKey: false,
  timestamps: true
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password, storedPassword) {
  return bcrypt.compareSync(password, storedPassword);
};

module.exports = mongoose.model('User', UserSchema);