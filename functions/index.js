const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://web-rtc-pwa.firebaseio.com',
});
exports.getContacts = functions.https.onRequest((request, response) => {
	
 });
