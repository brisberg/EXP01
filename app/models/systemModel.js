/**
 * Created by Brandon Risberg on 4/30/2016.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    subTitle: String,
    population: Number,
    wares: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'wares'}
    ]
});

var Model = mongoose.model('systems', schema);

module.exports = Model;
