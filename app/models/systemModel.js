/**
 * Created by Brandon Risberg on 4/30/2016.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    subTitle: String,
    population: Number,
    wares: [{
        name: String,
        baseValue: Number,
    }]
});

var Model = mongoose.model('systems', schema);

module.exports = Model;