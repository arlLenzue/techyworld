var mongoose = require('mongoose'), 
	crypto = require('crypto'), 
	Schema = mongoose.Schema; 

var UserSchema = new Schema({
	firstName: String, 
	lastName: String, 
	role: { 
		type: String, 
		enum: ['Admin', 'User'],
		default: "User"
	},
	email: { 
		type: String, 
		match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
		unique: true, 
		required: 'Email is required'
	}, 
	username: { 
		type: String, 
		unique: true, 
		required: 'Username is required', 
		trim: true 
	}, 
	password: { 
		type: String, 
		validate: [ 
			function(password) { 
				return password.length >= 6; 
			}, 'Password should be at least 6 characters'
		]
	},
	provider: { 
		type: String,
		required: 'Provider is required' 
	}, 
	providerId:String, 
	providerData: {},
	created: { 
		type: Date, 
		default: Date.now 
	},
	contact: {
        name: String,
        address: String,
        phone: Number,
        email: String
    }
}); 

UserSchema.virtual('fullName').get(function() { 
	return this.firstName + ' ' + this.lastName; 
}).set(function(fullName) { 
	var splitName = fullName.split(' '); 
	this.firstName = splitName[0] || ''; this.lastName = splitName[1] || '';
}); 


UserSchema.methods.authenticate = function(password) { 
	return this.password === password; 
}; 
	
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) { 
	var _this = this; 
	var possibleUsername = username + (suffix || ''); 
	_this.findOne({ username: possibleUsername }, 
		function(err, user) { 
			if (!err) { 
				if (!user) { 
					callback(possibleUsername); 
				} else { 
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				} 
			} else { 
				callback(null); 
			} 
		}); 
}; 

UserSchema.set('toJSON', { getters: true, virtuals: true }); 

mongoose.model('User', UserSchema);