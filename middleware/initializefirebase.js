const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const admin = require('firebase-admin');
const serviceAccount = require("../files_config/timetalk2nd-firebase-adminsdk-v0soj-b5903b628d.json");

const firebaseConfig = {
  apiKey: "AIzaSyBc93TUSXDwvadxfnmmwzXPnJztZUYay54",
  authDomain: "timetalk2nd.firebaseapp.com",
  projectId: "timetalk2nd",
  storageBucket: "timetalk2nd.appspot.com",
  messagingSenderId: "41288966978",
  appId: "1:41288966978:web:abd305f0f41abe0c3d9edb",
  measurementId: "G-09W5PDFVKN"
};

function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
//   const analytics = getAnalytics(app);
//   firebase.initializeApp(config);
//   initializeApp.analytics();
  //return analytics;
}

module.exports = initializeFirebase;
