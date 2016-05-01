/**
 * Created by Brandon Risberg on 4/27/2016.
 */

var mongoose = require('mongoose'),
    validate = require('mongoose-validate');

var schema = mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true, validate: [validate.email, 'is not a valid email address']}
});

var Model = mongoose.model('users', schema);

module.exports = Model;