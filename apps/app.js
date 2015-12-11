
var app = angular.module("CapstoneApp", ["ngRoute", "firebase", "angular.filter"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/splash.html',
        controller: 'loginControl'
      })
      // .when('/volunteer', {
      //   templateUrl: 'app/partials/board.html',
      //   controller: 'Board'
      // })
      // .when('/profile', {
      //   templateUrl: 'app/partials/profile.html',
      //   controller: 'Profile'
      // })
      .otherwise('/login');
  }]);