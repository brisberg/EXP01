var mongoose = require('mongoose')

function connect(connectionString) {
    mongoose.connect(connectionString)

    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', function callbck() {
        console.log('Mongoose connected at: ', connectionString)

        var schema = mongoose.Schema({
            name: String
        })

        var Model = mongoose.model('PilotTemplate', schema)

        var pilotTemplate = new Model({name: 'Brennan'})
        pilotTemplate.save(function(err) {
            if (err) return console.log('error:', err.message)

            console.log('it saved!:', pilotTemplate.name)
            getPilot()
        })

        function getPilot() {
            Model.find({name: 'Brennan'}, function(err, records) {
                if (err) return console.log('Error retrieving pilor:', err.message)

                console.log('We got found pillot', records[0].name, '!')
            })
        }
    })
}

module.exports = connect

connect('mongodb://localhost/exp01')