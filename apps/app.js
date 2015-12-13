
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
      // .when('/profile', {
      //   templateUrl: 'app/partials/profile.html',
      //   controller: 'Profile'
      // })
      .otherwise('/login');
  }]);