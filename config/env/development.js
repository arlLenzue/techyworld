module.exports = { 
	db: 'mongodb://localhost/mystore',
	sessionSecret: 'developmentSessionSecret',
	facebook: { 
		clientID: 'sampleID', 
		clientSecret:'sampleSecret',
		callbackURL: 'http://localhost:5000/oauth/facebook/callback' 
	}

};