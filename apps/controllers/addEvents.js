// This module controls the partial addEevents.html and directs the admin to the open
// assignment calendar.  It also allows for entry of data to create a new event.  
// Only the admin has access to this screen.  i.e. someone with special log-in cedentials

app.controller("addEventsCtrl",
	["$scope", "$compile", "$firebaseArray", "uiCalendarConfig", 
	 function($scope, $compile, $firebaseArray, uiCalendarConfig) {

	console.log("I made it to admin page!");

  // Setting up dates using moment

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.date;
  $scope.time;
  $scope.duration;
  $scope.title;
  $scope.slots;   

	$scope.events = [];

  $scope.addEvent = function() {

  console.log("date ", $scope.date);
  console.log("time ", $scope.time);
  console.log("duration ", $scope.duration);
  console.log("title ", $scope.title);
  console.log("slots ", $scope.slots);
}

  // when a new event has been entered, create the new record to add to the db.  
  // must first format the date and time using Moment
  // $scope.addEvent = function() {}

  //     var url = $scope.image;
  //     // Firebase ref for all events
  //     var allEvents = new Firebase("https://capstonesignup.firebaseio.com/events/");
  //     $scope.allEventsArray = $firebaseArray(allEvents);
  //     console.log("all events array", $scope.allEventsArray);
  //       $scope.allEventsArray.$add({
  //         title: $scope.title,
  //         start: uid,
  //         end: url
  //       })  
  //   }



  // no blank input is allowed.  if a blank is returned, the event is not accepted


  // put the event data from the firebase db into an array 

  // var ref = new Firebase("https://capstonesignup.firebaseio.com/events/");
  // $scope.fireEvents = $firebaseArray(ref);

   $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false}
     ];


  // after the promise is returned from firebase, configure the object for the calendar
  // $scope.fireEvents.$loaded(function(){
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
        aspectRatio: 3,
        // events: $scope.fireEvents,
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
        // eventRender: $scope.eventRender  
      }
    };
    $scope.eventSources = [$scope.events];
  // }) 
}]);