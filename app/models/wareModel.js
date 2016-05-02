/**
 * Created by Brandon Risberg on 4/30/2016.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: { type: String, unique: true },
    baseValue: Number,
});

var Model = mongoose.model('wares', schema);

module.exports = Model;