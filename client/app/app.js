/* register the modules the application depends upon here*/
angular.module('listings', []);
  // , ['uiGmapgoogle-maps']);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps', 'listings']);

/* application configuration */
app.config(['$urlRouterProvider', '$locationProvider', 'uiGmapGoogleMapApiProvider',
  function($urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
    
    // will have to expose if i get it to work
    // uiGmapGoogleMapApiProvider.configure({
    //   key: process.env.GOOGLE_KEY,
    //   libraries: 'weather,geometry,visualization'
    // });

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