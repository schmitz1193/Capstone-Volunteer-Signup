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


  $scope.addEvent = function() {  

  console.log("Start time ", $scope.startTime);
  console.log("end time ", $scope.endTime);
  console.log("description ", $scope.description);
  console.log("volunteers needed ", $scope.numNeeded);
  }

  // no blank input is allowed.  if a blank is returned, the event is not accepted
  // when a new event has been entered, create the new record to add to the db.  
  // must first format the date and time using Moment
  // $scope.addEvent = function() {}

  //     // Firebase ref for all events
  //     var allEvents = new Firebase("https://capstonesignup.firebaseio.com/events/");
  //     $scope.allEventsArray = $firebaseArray(allEvents);
  //     console.log("all events array", $scope.allEventsArray);
  //       $scope.allEventsArray.$add({
  //         title: $scope.description,
  //         start: date&time in a moment,
  //         end: date&time in a moment
  //       })  
  //   }
// /////////////////////////////////////////////////////////////////////////////////
    $scope.events = [];
    // put the event data from the firebase db into an array 
    var ref = new Firebase("https://capstonesignup.firebaseio.com/events/");

    var constructedArray=[];
    $scope.fireEvents = $firebaseArray(ref);
    $scope.fireEvents.$loaded().then(function(data){
      console.log("data ", data);
      for(var i =0; i < data.length; i++){
        var myObjectToPush = {}
        console.log("data[i]", data[i]);
        myObjectToPush.allDay = data[i].allDay;
        myObjectToPush.end = data[i].end;
        myObjectToPush.start = data[i].start;
        myObjectToPush.title = data[i].title;
        constructedArray.push(myObjectToPush);
      }
      console.log("constructed array ", constructedArray);
   })
// /////////////////////////////////////////////////////////////////////////
// Listen for click events from the Calendar
   /* alert on eventClick */
    $scope.alertDayClick = function( date, jsEvent, view){
        // need modal so new event for this day can be input..have it built need to access
        $("#addModal").modal({show: true});
        console.log("day click add event ", date);
    };
   /* alert on eventClick */
    $scope.alertEventClick = function( event, jsEvent, view){
        // this is for volunteer screen....sign up modal needed to be built and accessed
        console.log("Event click works ", event);
    };
// ////////////////////////////////////////////////////////////////////////

    // bind the newly constructed array to the DOM
    $scope.events = constructedArray;  

  // Configure the object for the calendar
    $scope.eventSources = [$scope.events];
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
        eventClick: $scope.alertEventClick,
        dayClick: $scope.alertDayClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
        // eventRender: $scope.eventRender  
      }
    };
  // }) 
}]);