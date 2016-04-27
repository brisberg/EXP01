/**
 * Created by Brandon Risberg on 4/27/2016.
 */

var mongoose = require('mongoose')

var schema = mongoose.Schema({
    id: Number,
    name: String
})

var Model = mongoose.model('PilotTemplate', schema)

module.exports = Model