const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// JWT Token oluşturma
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Email kontrolü
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Bu email adresi zaten kullanımda' });
    }

    // Yeni kullanıcı oluştur
    const user = new User({
      email,
      password,
      name
    });

    await user.save();

    // Token oluştur
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    // Token oluştur
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Güvenli güncellemeler
    const allowedUpdates = ['name', 'avatar', 'fcmToken'];
    Object.keys(updates).forEach(update => {
      if (allowedUpdates.includes(update)) {
        user[update] = updates[update];
      }
    });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 