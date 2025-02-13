const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const auth = require('../middleware/auth');

router.post('/posts', auth, socialController.createPost);
router.post('/posts/:id/like', auth, socialController.likePost);

module.exports = router; 