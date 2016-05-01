/**
 * Created by Brandon Risberg on 4/27/2016.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String
});

var Model = mongoose.model('pilots', schema);

module.exports = Model;