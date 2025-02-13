const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  duration: Number,
  calories: Number,
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['planned', 'completed', 'missed'],
    default: 'planned'
  }
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout; 