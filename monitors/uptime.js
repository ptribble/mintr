var os = require('os');

var Uptime = {};

Uptime.monitor = function(history, callback) {
    callback(1000*(os.uptime()));
};

Uptime.history = false;
Uptime.frequency = 1;

module.exports = Uptime;
