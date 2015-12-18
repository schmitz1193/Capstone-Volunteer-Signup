// This module controls the partial signedupCal.html and directs the user to the 
// my addignments calendar.  i.e. things they have signed up for

app.controller("signedupCalCtrl",
	["$scope", "storage", "$compile", "$firebaseArray", "$firebaseObject", "uiCalendarConfig", 
	 function($scope, storage, $compile, $firebaseArray, $firebaseObject, uiCalendarConfig) {

  	console.log("I made it to signed up calendar!");

    // Getting UserID
      var uid = storage.getUserId();
      console.log("uid", uid);

    // Setting up dates using moment
    // var date = new Date();
    // var d = date.getDate();
    // var m = date.getMonth();
    // var y = date.getFullYear(); 

          // in the firebase array of pins, use orderByChild to go through array 
        // and compare the "uid" to the logged in user's uid. 
        // If it is equal, the child with the matching "uid" is returned to query.
        // query is used to create the new firebase array of pins with the user's id
        // ???what is query?  Is it an array???
        // (need to create array through firebase to use $remove)
        // finally use the remove on this array to delete the "pin" from the delete button
    $scope.eventKeyArray = [];
    var usereventRef = new Firebase("https://capstonesignup.firebaseio.com/userevent/");
    // uidQuery contains all the userevents with the uid of the current user
    // uidEventQuery = eventRef.orderByChild("uid").equalTo(uid);
    usereventRef.orderByChild("uid").on("child_added", function(snapshot) {
      console.log("event keys are ", snapshot.key() + " current userID is " + snapshot.val().uid);
      var signupEventKeys = snapshot.key();
      $scope.eventKeyArray.push(signupEventKeys);
      // var eventsRef = new Firebase("https://capstonesignup.firebaseio.com/events/");
      // eventsRef.orderByChild(signupEvents).on("child_added", function(snapshot) {
      //   console.log("first return is ", snapshot.key() + snapshot.val().signupEvents);
      // })
      console.log("eventKeyArray ", $scope.eventKeyArray);
    });




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

   // /* alert on eventClick - event info to DOM for volunteer to view signup event details */
   // NOT MVP....after Xmas?????
    // $scope.alertEventClick = function( event, jsEvent, view){
    //    console.log("Event click works ", event);
    //    $scope.modalTitle = event.title;
    //    $scope.modalDay = moment(event.start).format('YYYY-MM-DD');
    //    $scope.modalStart = moment(event.start).format('HH:mm');
    //    $scope.modalEnd = moment(event.end).format('HH:mm');
    //    $scope.modalDescription = event.description;
    //    $scope.eventKey = event.id;
    //    $scope.event = event;
    //    console.log("scope event ", $scope.event);
    //    $("#signupModal").modal({show: true});

    // };
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