var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');
var settings = require('../settings');
mongoose.connect(settings.url,{useMongoClient: true});

mongoose.model('User', new Schema(models.User));
mongoose.model('Article', new Schema(models.Article));
global.Model = function (type) {
    return mongoose.model(type);
}
//172.17.11.33