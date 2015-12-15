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

    // Configure object for the calendar
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
        // events: $scope.events
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
        // // eventRender: $scope.eventRender  
      }
    };
}]);