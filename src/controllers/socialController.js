const Post = require('../models/postModel');
const User = require('../models/userModel');
const { sendNotification } = require('../services/notificationService');

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      user: req.user._id,
      content: req.body.content,
      type: req.body.type
    });

    await post.save();

    // Takipçilere bildirim gönder
    const user = await User.findById(req.user._id);
    user.followers.forEach(async (followerId) => {
      await sendNotification(
        followerId,
        'Yeni Gönderi',
        `${user.name} yeni bir gönderi paylaştı!`
      );
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Gönderi bulunamadı' });
    }

    // Like ekle/çıkar
    const likeIndex = post.likes.indexOf(req.user._id);
    if (likeIndex === -1) {
      post.likes.push(req.user._id);
      
      // Gönderi sahibine bildirim gönder
      if (post.user.toString() !== req.user._id.toString()) {
        await sendNotification(
          post.user,
          'Yeni Beğeni',
          `${req.user.name} gönderinizi beğendi!`
        );
      }
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 