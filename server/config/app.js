var express = require('./express');
var mongoose = require('mongoose');
    
module.exports.start = function() {
  var port = (process.env.PORT || 8080);
  var app = express.init();
  app.listen(port, function() {
    console.log('App listening on port', port);
  });
};