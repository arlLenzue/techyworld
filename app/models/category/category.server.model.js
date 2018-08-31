var mongoose = require('mongoose');

var CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        default: 'uncategorized'
    },
    image:String
}, { usePushEach: true });

mongoose.model('Categories', CategoriesSchema);

module.exports = CategoriesSchema;
