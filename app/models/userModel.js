/**
 * Created by Brandon Risberg on 4/27/2016.
 */

var mongoose = require('mongoose'),
    validate = require('mongoose-validate'),
    bcrypt   = require('bcrypt-nodejs'),
    passportLocalMongoose = require('passport-local-mongoose');

var SALT_WORK_FACTOR = 10;
var REQUIRED_PASSWORD_LENGTH = 8;

function validateStringLength(value) {
    return value && value.length >= REQUIRED_PASSWORD_LENGTH;
}

var schema = mongoose.Schema({
    name: String,
    passwordHash: {type: String, required: true, validate: [validateStringLength, 'is too short (minimum is ' + REQUIRED_PASSWORD_LENGTH + ' characters']},
    email: {type: String, required: true, unique: true, validate: [validate.email, 'is not a valid email address']}
});

schema.pre('save', function(next) {
    var self = this;

    if (!self.isModified('passwordHash')) return next;

    bcrypt.hash(self.passwordHash, bcrypt.genSaltSync(SALT_WORK_FACTOR), null, function(err, hash) {
        if (err) return next(err);

        self.passwordHash = hash;
        next();
    });
});

schema.plugin(passportLocalMongoose);

var Model = mongoose.model('users', schema);

module.exports = Model;
