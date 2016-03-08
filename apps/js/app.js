
var app = angular.module("CapstoneApp", ["ngRoute", "firebase", "angular.filter", "ui.calendar"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginControl'
      })
      .when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'registerControl'
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
      .when('/filledAssign', {
        templateUrl: 'partials/filledAssign.html',
        controller: 'filledAssignCtrl'
      })
      .otherwise('/login');
  }]);