const mongoose = require('mongoose');
const User = require('./User');

const UserSchema = new mongoose.Schema({
    
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  doctor_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  patient_name: {
    type: String,
    required: [true, 'Patient name is required'],
    minlength: 3,
    maxlength: 50
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    minlength: 3,
    maxlength: 50
  },
  
  phone: {
    type: String,
    required: [true, 'phone is required'],
    minlength: 5,
    maxlength: 13,
  },
  appointment_datetime:{
    type: Date,
    required:[true, 'Date is required']
  },
  
},
{
  versionKey: false,
  timestamps: true
});



module.exports = mongoose.model('Appointment', AppointmentSchema);