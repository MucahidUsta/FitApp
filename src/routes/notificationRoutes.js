const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/token', auth, async (req, res) => {
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