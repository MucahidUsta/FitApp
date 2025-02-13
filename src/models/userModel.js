const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Geçerli bir email adresi giriniz']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  avatar: String,
  level: {
    type: String,
    default: 'Başlangıç'
  },
  points: {
    type: Number,
    default: 0
  },
  fcmToken: String,
  stats: {
    workouts: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    hours: { type: Number, default: 0 }
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Şifre hashleme
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User; 