
var app = angular.module("CapstoneApp", ["ngRoute", "firebase", "angular.filter", "ui.calendar"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/splash.html',
        controller: 'loginControl'
      })
      .when('/openCal', {
        templateUrl: 'partials/openCal.html',
        controller: 'openCalCtrl'
      })
      .when('/signedupCal', {
        templateUrl: 'partials/signedupCal.html',
        controller: 'signedupCalCtrl'
      })
      .when('/addEvents', {
        templateUrl: 'partials/addEvents.html',
        controller: 'addEventsCtrl'
      })
      .otherwise('/login');
  }]);