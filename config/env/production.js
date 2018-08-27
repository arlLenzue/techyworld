module.exports = { 
	db: process.env.MONGODB_URI || 'mongodb://localhost/bucketlist',
	sessionSecret: 'developmentSessionSecret',
	facebook: { 
		clientID: process.env.ClientID || '', 
		clientSecret: process.env.ClientSecret || '',
		callbackURL: process.env.FBCallback || 'https://bucketlister.herokuapp.com/oauth/facebook/callback' 
	}

};