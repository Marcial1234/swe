angular.module('listings').controller('ListingsController',
  ['$scope', '$location', '$stateParams', '$state', 'Listings', 'uiGmapGoogleMapApi',
  function($scope, $location, $stateParams, $state, Listings, uiGmapGoogleMapApi){

    /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }

      // uiGmapGoogleMapApi.then(function(maps) {
      // });
    $scope.map = function() {
        $scope.showMap = true;
        /* Map properties */
        $scope.map = {
          center: {
            latitude: 29.65163059999999,
            longitude: -82.3410518
          },
          zoom: 14
        }
        console.log(maps);
    }

    $scope.find = function() {
      $scope.loading = true;

      /* Get all the listings, then bind it to the scope */
      Listings.getAll().then(
        function(response) {
          $scope.loading = false;
          $scope.listings = response.data;
        }, 
        function(error) {
          $scope.loading = false;
          $scope.error = 'Unable to retrieve listings!'
          console.log(error);
        }
      );
    };

    $scope.findOne = function() {
      $scope.loading = true;

      /*
        Take a look at 'list-listings.client.view', and find the ui-sref attribute that switches the state to the view
        for a single listing. Take note of how the state is switched:

          ui-sref="listings.view({ listingId: listing._id })"

        Passing in a parameter to the state allows us to access specific properties in the controller.

        Now take a look at 'view-listing.client.view'. The view is initialized by calling "findOne()".
        $stateParams holds all the parameters passed to the state, so we are able to access the id for the
        specific listing we want to find in order to display it to the user.
       */

      var id = $stateParams.listingId;

      Listings.read(id).then(
        function(response) {
          $scope.loading = false;
          $scope.listing = response.data;
          $scope.listingToBeUpdated = response.data;
        }, 
        function(error) {
          $scope.error = 'Unable to retrieve listing with id "' + id
          $scope.loading = false;
          console.log(error);
        }
      );
    };

    $scope.create = function(isValid) {
      $scope.error = null;

      /*
        Check that the form is valid:
          https://github.com/paulyoder/angular-bootstrap-show-errors
       */
      // figure this out later
      // if (!isValid) {
      //   $scope.$broadcast('show-errors-check-validity', 'articleForm');
      //   return false;
      // }

      /* Create the listing object */
      $scope.newListing.code = $scope.newListing.code.toUpperCase();

      /* Save the article using the Listings factory */
      Listings.create($scope.newListing).then(
        function(response) {
          $state.go('listings.list', { successMessage: 'Listing succesfully created!' });
        },
        function(error) {
          $scope.error = "Unable to save listing! Remember 'codes' must be unique."
          console.log(error);
      });
    };

    $scope.update = function(isValid) {
      /*
        Fill in this function that should update a listing if the form is valid. Once the update has
        successfully finished, navigate back to the 'listing.list' state using $state.go(). If an error
        occurs, pass it to $scope.error.
       */
      $scope.listingToBeUpdated.code = $scope.listingToBeUpdated.code.toUpperCase();

      Listings.update($scope.listingToBeUpdated).then(
        function(res) {
          $state.go('listings.list', { 
            successMessage: 'Listing succesfully updated!' }
          );
        },
        function(err) {
           $scope.error = "Unable to update this listing. Remember 'codes' must be unique.";
           console.log(error);
        }
      );
    };

    $scope.remove = function(listing) {
      /*
        Implement the remove function.
        If the removal is successful, navigate back to 'listing.list'.
        Otherwise, display the error.
       */
      Listings.delete(listing._id).then(
        function(response) {
          $state.go('listings.list', { 
            successMessage: 'Listing succesfully deleted!' }
          );
        },
        function(error) {
           $scope.error = "Unable to delete '" + listing.code + "' from DB. Perhaps it no longer exists";
           console.log(error);
      });
    };
  }
]);