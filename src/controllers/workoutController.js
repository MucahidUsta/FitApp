const Workout = require('../models/workoutModel');
const { sendNotification } = require('../services/notificationService');

exports.createWorkout = async (req, res) => {
  try {
    const workout = new Workout({
      ...req.body,
      user: req.user._id
    });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id })
      .sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ error: 'Antrenman bulunamadı' });
    }

    Object.keys(req.body).forEach(update => {
      workout[update] = req.body[update];
    });

    await workout.save();
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ error: 'Antrenman bulunamadı' });
    }

    res.json({ message: 'Antrenman silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 