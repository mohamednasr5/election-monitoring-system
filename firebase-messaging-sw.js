// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

// نفس إعدادات المشروع بالظبط
firebase.initializeApp({
  apiKey: "AIzaSyCxxXV_6CEo1fTp3rRbfwfYbe7WH0Cyg38",
  authDomain: "elahmadiya.firebaseapp.com",
  databaseURL: "https://elahmadiya-default-rtdb.firebaseio.com",
  projectId: "elahmadiya",
  storageBucket: "elahmadiya.firebasestorage.app",
  messagingSenderId: "594580767620",
  appId: "1:594580767620:web:f5be3b87d4c704854e53d1"
});

// تفعيل الميسجينج داخل الـ service worker
const messaging = firebase.messaging();

// استقبال الإشعارات في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log("📬 إشعار في الخلفية:", payload);

  const title = payload.notification.title || "رسالة جديدة";
  const options = {
    body: payload.notification.body,
    icon: "/icon.png"   // تقدر تعدلها أو تلغي السطر
  };

  self.registration.showNotification(title, options);
});
