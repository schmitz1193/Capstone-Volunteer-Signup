// This module controls the partial ?????.html and directs the user to the open
// assignment calendar

app.controller("openCalCtrl",
	["$scope", "storage", "$compile", "$firebaseArray", "$firebaseObject", "uiCalendarConfig", 
	 function($scope, storage, $compile, $firebaseArray, $firebaseObject, uiCalendarConfig) {

  	console.log("I made it to calendar!");

    // Getting UserID
      var uid = storage.getUserId();
      console.log("uid", uid);

    // Setting up dates using moment
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();  

    $scope.confirmSignUp = function() {
      console.log("made it to signup ");
      console.log("t shirt ", $scope.size);
    // need to add event key and t-shirt size to the user db
      var userRef = new Firebase("https://capstonesignup.firebaseio.com/users/" + uid + "/");
      $scope.data = $firebaseObject(userRef);
      // Update the user record...load must be done on the object not the reference only
      $scope.data.$loaded() 
        .then(function(){
        // userRef.$loaded().then(function(data){
        //   console.log("data ", data);
        userRef.update({ size: $scope.size });
      })
    }


// ////////////////////////////////////////////////////////////////////////////////////////////////
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
        myObjectToPush.id = data[i].$id;
        myObjectToPush.description = data[i].description;
        constructedArray.push(myObjectToPush);
      }
     console.log("constructed array ", constructedArray);
    })
// ////////////////////////////////////////////////////////////////////////////////////////////////

    /////// Listen for click events from the Calendar ////////
   /* alert on day Click */
    $scope.alertDayClick = function( date, jsEvent, view){
        // $scope.addModal = (date.title + ' was clicked ');
        console.log("day click works ", date);
    };
   /* alert on eventClick */
    $scope.alertEventClick = function( event, jsEvent, view){
       console.log("Event click works ", event);
       $scope.modalTitle = event.title;
       $scope.modalDay = moment(event.start).format('YYYY-MM-DD');
       $scope.modalStart = moment(event.start).format('HH:mm');
       $scope.modalEnd = moment(event.end).format('HH:mm');
       $scope.modalDescription = event.description;
       $scope.eventKey = event.id;
       $("#signupModal").modal({show: true});

    };
    // ///////////////////////////////////////////////////////

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
        eventClick: $scope.alertEventClick,
        dayClick: $scope.alertDayClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
        // // eventRender: $scope.eventRender  
      }
    };
}]);