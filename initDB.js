/**
 * Created by Brandon Risberg on 4/28/2016.
 */

var express = require('express');
var path = require('path');
var logger = require('winston');

var app = express();

// db bootstrap (development only)
if (app.get('env') === 'development') {
    require('./app/config/database')('mongodb://localhost/exp01');


    var Ware = require('./app/models/wareModel');
    var Pilot = require('./app/models/pilotModel');
    var User = require('./app/models/userModel');
    var System = require('./app/models/systemModel');

    var docs = {};

    logger.info('initDB');

    logger.info('dropping Wares');
    Ware.remove({})
    .then(function() {
        logger.info('dropping Pilots');
        return Pilot.remove({});
    }).then(function() {
        logger.info('dropping Users');
        return User.remove({});
    }).then(function() {
        logger.info('dropping Systems');
        return System.remove({});
    }).then(function() {

            // wares
            logger.info('inserting Wares');
            logger.info('\tadding Trillium');
            docs.trillium = new Ware({name:'Trillium', baseValue:400});
            logger.info('\tadding Dalaxian Wheat');
            docs.dalaxianWheat = new Ware({name:'Dalaxian Wheat', baseValue:50});
            logger.info('\tadding Microchips');
            docs.microchips = new Ware({name:'Microchips', baseValue:1000});

            // systems
            logger.info('inserting Systems');
            logger.info('\tadding Earth');
            docs.earth = new System({ name: 'Earth', subTitle: 'the Sol System', population: 8.54, wares:
                [
                    docs.trillium,
                    docs.microchips
                ]});

            // pilots
            logger.info('inserting Pilots');
            logger.info('\tadding Brennen');
            docs.brennen = new Pilot({name: 'Brennen', cash: 10000, inventory: [
                { ware: docs.trillium, quantity: 5 },
                { ware: docs.dalaxianWheat, quantity: 240 }
            ]});
            logger.info('\tadding Xin\'ui');
            docs.xin = new Pilot({name: 'Xin\'ui', cash: 4000, inventory: [
                { ware: docs.dalaxianWheat, quantity: 120 }
            ]});
            logger.info('\tadding Karas');
            docs.karas = new Pilot({name: 'Karas', cash: 5000, inventory: [
                { ware: docs.microchips, quantity: 8 }
            ]});
            logger.info('\tadding Bria');
            docs.bria = new Pilot({name: 'Bria', cash: 20000});

            // users
            logger.info('inserting Users');
            logger.info('\tadding Brandon');
            docs.brandon = new User({name: 'Brandon', email: 'brandon@example.com', passwordHash:'password'});

            // Write to db
            logger.info('Saving all docs');
            return global.Promise.all(Object.keys(docs).map(function(doc) {
                logger.info('\tsaving ' + doc + '');
                return docs[doc].save();
            }));
    }).then(function() {
        process.exit();
    });
}
else {
    logger.error('Only run initDb in development');
}
