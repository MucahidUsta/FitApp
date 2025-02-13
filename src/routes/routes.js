const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const workoutController = require('../controllers/workoutController');
const socialController = require('../controllers/socialController');

// User routes
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.put('/users/profile', auth, userController.updateProfile);

// Workout routes
router.post('/workouts', auth, workoutController.createWorkout);
router.get('/workouts', auth, workoutController.getWorkouts);
router.put('/workouts/:id', auth, workoutController.updateWorkout);
router.delete('/workouts/:id', auth, workoutController.deleteWorkout);

// Social routes
router.post('/social/posts', auth, socialController.createPost);
router.post('/social/posts/:id/like', auth, socialController.likePost);

// Notification routes
router.post('/notifications/token', auth, async (req, res) => {
  try {
    const { fcmToken } = req.body;
    req.user.fcmToken = fcmToken;
    await req.user.save();
    res.status(200).send({ message: 'Token başarıyla kaydedildi' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router; 