const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const sendNotification = async (userId, title, body, data = {}) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.fcmToken) return;

    const message = {
      notification: {
        title,
        body
      },
      data,
      token: user.fcmToken
    };

    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    console.error('Bildirim gönderme hatası:', error);
    throw error;
  }
};

module.exports = {
  sendNotification
}; 