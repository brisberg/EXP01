/**
 * Created by Brandon Risberg on 4/28/2016.
 */
var path = require('path');
var packageJson = require('../../package.json')

//app helpers
exports.version = packageJson.version;
exports.root = __dirname
exports.appPath = function(path) {
    return root + '/' + path
}
exports.model = function(path) {
    return require(appPath("app/models/" + path))
}
exports.route = function(path) {
    return require(appPath("app/routes/" + path))
}
exports.util = function(path) {
    return require(appPath("app/utils/" + path))
}
exports.helper = function(path) {
    return require(appPath("app/helpers/" + path))
}