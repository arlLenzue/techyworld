exports.render = function(req, res) {

	req.session.lastVisit = new Date();

	var user = req.user ? true : false

	res.render('index', { 
		title: 'TechyWorld'
	});
	
};