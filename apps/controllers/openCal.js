// This module controls the partial ?????.html and directs the user to the open
// assignment calendar

app.controller("openCalCtrl",
	["$scope", "$compile", "$firebaseArray", "uiCalendarConfig", 
	 function($scope, $compile, $firebaseArray, uiCalendarConfig) {

	console.log("I made it to calendar!");

  // Setting up dates using moment

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
    

	$scope.events = [];

  // put the event data from the firebase db into an array 

  var ref = new Firebase("https://capstonesignup.firebaseio.com/events/");

  $scope.fireEvents = $firebaseArray(ref);

  console.log("fireEvents ", $scope.fireEvents);

  $scope.fireEvents.$loaded(function(){
   // angular.forEach($scope.fireEvents, function(event, key) {
   //      $('#calendar').fullCalendar('renderEvent', {
   //        title: event.title + '\n' + event.who.join(", "),
   //        start: new Date(event.date + ' ' + event.from),
   //        end: new Date(event.date + ' ' + event.to),
   //        who: event.who,
   //        where: event.where,
   //        comment: event.comment,
   //        firebaseId: key
   //      }, true);
   //    });
   //  };

 
     // Render Tooltip 
    // $scope.eventRender = function( event, element, view ) { 
    //     element.attr({'tooltip': event.title,
    //                  'tooltip-append-to-body': true});
    //     $compile(element)($scope);
    // };

    // Configure object
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventLimit: true, // allow "more" link when too many events
        // $scope.weekNumbers = true;
        aspectRatio: 4,
        events: $scope.fireEvents,
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
        // eventRender: $scope.eventRender  
      }
    };
    // $scope.eventSources = [$scope.events];
  }) 
}]);