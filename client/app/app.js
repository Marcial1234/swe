/* register the modules the application depends upon here*/
angular.module('listings', []);
  // , ['uiGmapgoogle-maps']);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps', 'listings']);

/* application configuration */
app.config(['$urlRouterProvider', '$locationProvider', 'uiGmapGoogleMapApiProvider',
  function($urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
    
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyD5OCIvBoNwgRkZ_0SP_NMGoqqHWpPLSZc',
      libraries: 'weather,geometry,visualization'
    });

    /* https://docs.angularjs.org/api/ng/provider/$locationProvider */
    $locationProvider.html5Mode(true);

    /* go to the '/listings' URL if an invalid route is provided */
    $urlRouterProvider.otherwise('/listings');
  }
]);

/* set the initial state of the application */
app.run(['$state', 
  function($state) {
    $state.go('listings.list');
  }
]);