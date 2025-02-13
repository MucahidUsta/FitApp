const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const auth = require('../middleware/auth');

router.post('/', auth, workoutController.createWorkout);
router.get('/', auth, workoutController.getWorkouts);
router.put('/:id', auth, workoutController.updateWorkout);
router.delete('/:id', auth, workoutController.deleteWorkout);

module.exports = router; 