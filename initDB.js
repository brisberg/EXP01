/**
 * Created by Brandon Risberg on 4/28/2016.
 */

var express = require('express');
var path = require('path');

var app = express();

// db bootstrap (development only)
if (app.get('env') === 'development') {
    require('./app/config/database')('mongodb://localhost/exp01');


    var Ware = require('./app/models/wareModel');
    var Pilot = require('./app/models/pilotModel');
    var User = require('./app/models/userModel');
    var System = require('./app/models/systemModel');

    console.log('initDB');

    console.log('dropping Wares');
    Ware.remove({})
    .then(function() {
        console.log('dropping Pilots');
        return Pilot.remove({})
    }).then(function() {
        console.log('dropping Users');
        return User.remove({})
    }).then(function() {
        console.log('dropping Systems');
        return System.remove({})
    }).then(function() {

            console.log('\ninserting Wares');
            // wares
            console.log('saving Trillium');
            var trillium = new Ware({name:'Trillium', baseValue:400});
            trillium.save();
            console.log('saving Dalaxian Wheat');
            var dalaxianWheat = new Ware({name:'Dalaxian Wheat', baseValue:50});
            dalaxianWheat.save();
            console.log('saving Microchips');
            var microchips = new Ware({name:'Microchips', baseValue:1000});
            microchips.save();

            console.log('\ninserting Systems');
            // systems
            console.log('saving Earth');
            var earth = new System({ name: 'Earth', subTitle: 'the Sol System', population: 8.54, wares:
                [
                    trillium,
                    microchips
                ]});
            earth.save();

            // pilots
            console.log('saving Brennen');
            var brennen = new Pilot({name: 'Brennen', inventory: [
                { ware: trillium, quantity: 5 },
                { ware: dalaxianWheat, quantity: 240 }
            ]});
            brennen.save();
            console.log('saving Xin\'ui');
            var xin = new Pilot({name: 'Xin\'ui', inventory: [
                { ware: dalaxianWheat, quantity: 120 }
            ]});
            xin.save();
            console.log('saving Karas');
            var karas = new Pilot({name: 'Karas', inventory: [
                { ware: microchips, quantity: 8 }
            ]});
            karas.save();
            console.log('saving Bria');
            var bria = new Pilot({name: 'Bria'});
            bria.save();

            console.log('\ninserting Users');
            // users
            console.log('saving Brandon');
            var brandon = new User({name: 'Brandon', email: 'brandon@example.com', passwordHash:'password'});
            brandon.save();
    });
}
else {
    console.log('Only run initDb in development');
}
