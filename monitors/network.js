var exec = require('child_process').exec;
var async = require('async');
var os = require('os');

var Memory = {};

Memory.monitor = function(history, callback) {
  exec('kstat -p "::mac:*bytes64"', function(error, result) {
    if (error) {
      console.log(
        'Mintr uses `kstat` to get network information, which your ' +
        'OS does not support.'
      );
      console.log(error);
      callback({});
      return;
    }

    var data = {
      in: 0,
      out: 0,
    };

    var lines = result.split('\n');
    for (var x = 0; x < lines.length; x++) {
      var localAmt = lines[x];
      if (localAmt.indexOf(':rbytes64') !== -1) {
	  data.in += parseInt(localAmt.split(/\s+/)[1]);
      }
      if (localAmt.indexOf(':obytes64') !== -1) {
	  data.out += parseInt(localAmt.split(/\s+/)[1]);
      }

    }

    data.timestamp = Date.now();

    // Now calculate speeds
    if (history.length > 0) {
      var amountBack = 1;
      var index = history.length - amountBack;
      var lastTimestamp = history[index].timestamp;
      var lastOut = history[index].out;
      var lastIn = history[index].in;

      var elapsedTime = data.timestamp - lastTimestamp;
      var deltaOut = data.out - lastOut;
      var deltaIn = data.in - lastIn;

      data.outSpeed = deltaOut / elapsedTime * 1000;
      data.inSpeed = deltaIn / elapsedTime * 1000;
    } else {
      data.outSpeed = 0;
      data.inSpeed = 0;
    }

    callback(data);
  });
};

Memory.history = true;
Memory.maxHistory = 3600;
Memory.frequency = 20;

module.exports = Memory;
