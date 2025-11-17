const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  
  // CORS
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).send('');
  }

  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ error: 'Missing topic or message' });
  }

  const payload = {
    notification: {
      title: 'تحديث انتخابي',
      body: message
    },
    data: {
      body: message,
      timestamp: Date.now().toString()
    }
  };

  try {
    const response = await admin.messaging().sendToTopic(topic, payload);
    console.log('✅ Notification sent successfully:', response);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('❌ Error sending notification:', error);
    return res.status(500).json({ error: error.message });
  }
});
