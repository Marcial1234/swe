var request = require('request');

module.exports = function(req, res, next) {
  if (req.body.address) {
    var options = {
      key: process.env.GOOGLE_KEY, 
      address: req.body.address
    }
    request({
      url: 'https://maps.googleapis.com/maps/api/geocode/json', 
      qs: options
      }, function(error, response, body) {
        if (error) {
          res.status(400).send(err);
        }

        var data = JSON.parse(body);
        if (data.results.length > 0) {
          var coordinates = data.results[0].geometry.location;
          req.results = { latitude: coordinates.lat, longitude: coordinates.lng };
        } else {
          req.results = undefined;
          if (data.status != "OK") console.log(data.status);
        }
        next();
    });
  } else next();
};  