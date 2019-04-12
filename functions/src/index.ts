import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });

  const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
