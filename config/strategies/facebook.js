var passport = require('passport'), 
	url = require('url'), 
	FacebookStrategy = require('passport-facebook').Strategy, 
	config = require('../config'), 
	users = require('../../app/controllers/users/user.server.controller'); 

module.exports = function() { 
	passport.use(new FacebookStrategy({ 
		clientID: config.facebook.clientID, 
		clientSecret: config.facebook.clientSecret, 
		callbackURL: config.facebook.callbackURL, 
		passReqToCallback: true,
		profileFields: ['id', 'emails', 'name', 'displayName','profileUrl'],
		enableProof: true
	}, 
		function(req, accessToken, refreshToken, profile, done) {
			var splitName = profile.displayName.split(' ');  
			var providerData = profile._json; providerData.accessToken = accessToken; providerData.refreshToken = refreshToken;
			var providerUserProfile = { 
				firstName: profile.name.givenName || splitName[0], 
				lastName: profile.name.familyName || splitName[1], 
				fullName: profile.displayName, 
				email: profile.emails ? profile.emails[0].value : '', 
				username: profile.username || profile.displayName, 
				provider: 'facebook', 
				providerId: profile.id, 
				providerData: providerData 
			}; 

		users.saveOAuthUserProfile(req, providerUserProfile, done); 
	})); 
};
