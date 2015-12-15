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
    var stringDate = String($scope.date);
    console.log("stringDate ", stringDate);
    var inputDate = moment(stringDate).format('YYYY-MM-DDT');   
    console.log("moment date ", inputDate);

    console.log("time ", $scope.time);
  // console.log("duration ", $scope.duration);
  // console.log("title ", $scope.title);
  // console.log("slots ", $scope.slots);
  //      $scope.date = {
  //        value: new Date(2013, 9, 22)
  //      };
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
        // events: $scope.events,
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
        // eventRender: $scope.eventRender  
      }
    };
  // }) 
}]);