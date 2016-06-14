var mongoose = require('mongoose');
var logger = require('winston');

function connect(connectionString) {
    mongoose.connect(connectionString);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callbck() {
        logger.info('Mongoose connected at: ', connectionString);
    });
}

module.exports = connect;
