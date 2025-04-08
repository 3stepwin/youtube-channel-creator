// Firebase configuration
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
  : null;

// If service account is provided, initialize with it
// Otherwise, initialize with application default credentials
if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
} else {
  // For local development, you can use a local emulator or test project
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'youtube-channel-creator',
    databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://youtube-channel-creator.firebaseio.com'
  });
}

const db = admin.firestore();
const storage = admin.storage();

module.exports = {
  admin,
  db,
  storage
};
