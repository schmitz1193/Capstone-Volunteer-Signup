// This module controls the partial ?????.html and directs the user to the open
// assignment calendar

app.controller("openCalCtrl",
	["$scope",
	 function($scope) {

	console.log("I made it!");

	$scope.eventSources = [];

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

}]);