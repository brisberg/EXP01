/**
 * Created by Brandon Risberg on 4/27/2016.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    _id: Number,
    name: String
});

var Model = mongoose.model('PilotModel', schema);

module.exports = Model;