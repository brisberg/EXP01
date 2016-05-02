/**
 * Created by Brandon Risberg on 4/27/2016.
 */

var mongoose = require('mongoose');
var Ware = require('./wareModel');

var schema = mongoose.Schema({
    name: String,
    inventory: [
      {ware: {type: mongoose.Schema.Types.ObjectId, ref: 'wares'}, quantity: Number}
    ],
});

var Model = mongoose.model('pilots', schema);

module.exports = Model;
