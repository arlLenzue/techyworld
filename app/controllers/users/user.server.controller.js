var User = require('mongoose').model('User'); 

var User = require('mongoose').model('User'),
	passport = require('passport');


var getErrorMessage = function(err) { 
	var message = ''; 

	if (err.code) { 
		switch (err.code) { 
			case 11000: 
			case 11001: message = 'Username already exists'; 
			break;
			default: message = 'Something went wrong'; 
		} 
	} else { 
		for (var errName in err.errors) { 
			if (err.errors[errName].message) 
				message = err.errors[errName].message; 
		} 
	} 

	return message; 

}; 

exports.isAdmin = function(req, res, next) { 
	if(req.user && (req.user.role == "Admin" || req.user.username == "admin")){
		res.json(true);
	}else{
		res.json(false);
	}
};

exports.list = function(req, res, next) { 
	User.find({}, function(err, users) { 
		if (err) { 
			return next(err); 
		} else { 
			res.json(users); 
		} 
	}); 
};

exports.update = function(req, res, next) {

	var local = "5b1bb7816f56252fd0074fd4";
	var fb = "5afc3d3251c52700040ed166";
	var gmail = "5afaffa07c32e30004200f14";
	var userid = req.user._id;
	
	User.findByIdAndUpdate(req.body._id, req.body, 
		function(err, user) { 
			if (err) { 
				return next(err); 
			} else { 
				if(userid == local || userid == fb || userid == gmail){
					return res.redirect('/#/dashboard/users');
				}else{
					return next("You are not authorized to perform this operation")
				}
				
			} 
		}); 
};

exports.getUser = function(req, res){
	if(req.user){

		var user = {};
		user.id = req.user.id;
		user.firstName = req.user.firstName;
		user.lastName = req.user.lastName;
		user.email = req.user.email;
		user.username = req.user.username;
		user.contact = req.user.contact;

		res.json(user);

	}else{

		res.json(null);

	}
	
}

exports.renderSignin = function(req, res, next) { 
	if (!req.user) { 
		res.render('signin', { 
			title: 'Sign-in Form', 
			messages: req.flash('error') || req.flash('info') 
		}); 
	} else { 
		return res.redirect('/'); 
	} 
}; 

exports.renderSignup = function(req, res, next) { 
	if (!req.user) {
		res.render('signup', { 
			title: 'Sign-up Form', 
			messages: req.flash('error') 
		}); 
	} else { 
		return res.redirect('/'); 
	} 
}; 

exports.signup = function(req, res, next) { 
	if (!req.user) { 
		var user = new User(req.body); 
		var message = null; 

		user.provider = 'local'; 

		user.save(function(err) { 
			if (err) { 
				var message = getErrorMessage(err); 
				req.flash('error', message); 
				return res.redirect('/signup'); 
			} 

			req.login(user, function(err) { 
				if (err) 
					return next(err);
				return res.redirect('/'); 
			}); 
		}); 
	} else { 
		return res.redirect('/'); 
	} 
}; 

exports.signout = function(req, res) { 
	req.logout(); res.redirect('/'); 
};

exports.saveOAuthUserProfile = function(req, profile, done) { 
	User.findOne({ 
		provider: profile.provider, 
		providerId: profile.providerId }, 
		function(err, user) { 
			if (err) { 
				return done(err); 
			} else { 
				if (!user) { 

					var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : ''); 

					User.findUniqueUsername(possibleUsername, null, function(availableUsername) { 
						profile.username = availableUsername;
						user = new User(profile); 
						user.save(function(err) { 
							if (err) { 
								var message = _this.getErrorMessage(err); 
								req.flash('error', message); 
								return res.redirect('/signup'); 
							} 

							return done(err, user); 
						}); 
					}); 
				} else { 
					return done(err, user); 
				} 
			} 
		}); 
};