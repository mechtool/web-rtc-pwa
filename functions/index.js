const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://web-rtc-pwa.firebaseio.com',
});
exports.searchContacts = functions.https.onRequest((request, response) => {
	let usersBase = admin.auth(),
		input = request.query.input;
	usersBase.listUsers().then(resp => {
		if(input === 'all') {
			response.json(resp.users)
		}
		else if(resp.users.length){
			 response.json(resp.users.some(user => {
				return user.email === input || user.displayName.toLowerCase() === input.toLowerCase() || (user.phoneNumber && user.phoneNumber === input);
			}))
		}else response.json([]);
		response(input)
	
	}).catch(err => {
		response.send(err);
	});
});
/*		getUserByEmail(input),
	   usersBase.getUserByPhoneNumber(input),*/
