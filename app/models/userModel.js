/**
 * Created by Brandon Risberg on 4/27/2016.
 */

var mongoose = require('mongoose')

var schema = mongoose.Schema({
    id: Number,
    name: String,
    email: String
})

var Model = mongoose.model('UserModel', schema)

module.exports = Model