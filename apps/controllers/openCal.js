// This module controls the partial ?????.html and directs the user to the open
// assignment calendar

app.controller("openCalCtrl",
	["$scope", "storage", "$compile", "$firebaseArray", "$firebaseObject", "uiCalendarConfig", 
	 function($scope, storage, $compile, $firebaseArray, $firebaseObject, uiCalendarConfig) {

  	console.log("I made it to openCal!");

    // Getting UserID
      var uid = storage.getUserId();
      console.log("uid in openCal ", uid);


    // Setting up dates using moment
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear(); 

// /////////////User has volunteered for an event.  From modal on volunteer calendar //////////////////
    $scope.confirmSignUp = function() {
      console.log("made it to signup ");
    // need to add event key and t-shirt size to the user db
      var userRef = new Firebase("https://capstonesignup.firebaseio.com/users/" + uid + "/");
      $scope.data = $firebaseObject(userRef);
      // Update the user record...load must be done on the object not the reference only
      $scope.data.$loaded() 
        .then(function(){
        userRef.update({ size: $scope.size });
        })
      // userEvent = $scope.eventKey;
      var userEventRef = new Firebase("https://capstonesignup.firebaseio.com/userevent/");
      $scope.signup = $firebaseArray(userEventRef);
      // Create a userevent record to store the userId, the user names and the event (key) they signed up for
      $scope.signup.$loaded() 
        .then(function(data){
                $scope.signup.$add({
                uid: uid,
                firstName: $scope.modalFirstName,
                lastName: $scope.modalLastName,
                eventid: $scope.eventKey
           })  
        })
    }

// ////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.events = [];
    var constructedArray=[];

    // put the event data from the firebase db into an array 
    var ref = new Firebase("https://capstonesignup.firebaseio.com/events/");
    $scope.fireEvents = $firebaseArray(ref);
    $scope.fireEvents.$loaded().then(function(data){
      console.log("data ", data);
      for(var i =0; i < data.length; i++){
        var myObjectToPush = {}
        // console.log("data[i]", data[i]);
        myObjectToPush.allDay = data[i].allDay;
        myObjectToPush.end = data[i].end;
        myObjectToPush.start = data[i].start;
        myObjectToPush.title = data[i].title;
        myObjectToPush.description = data[i].description;
        myObjectToPush.allFilled = data[i].allFilled;
        myObjectToPush.numNeeded = data[i].numNeeded;
        myObjectToPush.numFilled = data[i].numFilled;
        myObjectToPush.id = data[i].$id;
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
   // /* alert on eventClick - place info form event on the DOM so the modal can display for user */
    $scope.alertEventClick = function( event, jsEvent, view){
       console.log("Event click works ", event);
       $scope.modalTitle = event.title;
       $scope.modalDay = moment(event.start).format('YYYY-MM-DD');
       $scope.modalStart = moment(event.start).format('HH:mm');
       $scope.modalEnd = moment(event.end).format('HH:mm');
       $scope.modalDescription = event.description;
       $scope.modalFirstName = storage.getFirstName();
       $scope.modalLastName = storage.getLastName();
       $scope.eventKey = event.id;
       $scope.event = event;
       // console.log("scope event ", $scope.event);
       $("#signupModal").modal({show: true});

    };
    // ///////////////////////////////////////////////////////

    // bind the newly constructed array to the DOM
    // console.log("constructedArray ", constructedArray);
    $scope.events = constructedArray;  
    // console.log("scoped data for open ", $scope.events);
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