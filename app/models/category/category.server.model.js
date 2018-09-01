var mongoose = require('mongoose');

var CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        default: 'uncategorized'
    },
    image:{
    	type: String,
    	default: 'https://www.cornellstore.com/c.4488804/b2c/img/no_image_available.jpeg' 
    },
    created: { 
		type: Date, 
		default: Date.now 
	}
}, { usePushEach: true });

mongoose.model('Categories', CategoriesSchema);

module.exports = CategoriesSchema;
