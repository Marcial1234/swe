
/* Dependencies */
var mongoose = require('mongoose'),
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* save the coordinates (located in req.results if there is an address propertiesroperty) */
  // I changed the coordinates controller for this
  req.body.coordinates = req.results;

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* Then save the listing */
  listing.save(function(err) {
    if (err) res.status(400).send(err);
    // I hate async...
    else res.json(listing);
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  Listing.find({}).sort('code').exec(function(err, data) {
    if (err) res.status(404).send(err);
    else res.json(data);
  });
};

/*
  Middleware for the below
  Find a listing by its ID, then pass it to the next request handler.
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id, function(err, listing) {
    if (err) res.status(404).send(err);
    else {
      req.wantedListing = listing;
      next();
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.wantedListing);
};

/* Update a listing */
exports.update = function(req, res) {
  var old_listing = req.wantedListing;

  /* save the coordinates (located in req.results) */
  req.body.coordinates = req.results;

  /* Replace the listing's properties with the new properties found in req.body */
  var newListing = Object.assign(old_listing, req.body, function(former, replacement){
    if (!replacement) return former;
    else return replacement;
  });

  /* Save and return the updated listing */
  Listing.findByIdAndUpdate(old_listing._id, newListing, {new: true}, function(err, reallyNewListing) {
    if (err) res.status(404).send(err);
    else res.json(reallyNewListing);
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.wantedListing;

  Listing.findByIdAndRemove(listing._id, function(err) {
    if (err) res.status(404).send(err);
    else res.json(listing);
  });
};