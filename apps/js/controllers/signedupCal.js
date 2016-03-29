// This module controls the partial signedupCal.html and directs the user to the
// my addignments calendar.  i.e. things they have signed up for

app.controller("signedupCalCtrl",
  ["$scope", "storage", "$compile", "$firebaseArray", "$firebaseObject", "uiCalendarConfig",
   function($scope, storage, $compile, $firebaseArray, $firebaseObject, uiCalendarConfig) {

     // Getting UserID
      var uid = storage.getUserId();
      var firstName = storage.getFirstName();
      var lastName = storage.getLastName();

      console.log("uid in signedupCal", uid);

    // Setting up dates using moment
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    // using the logged in user id, filter through userevents to get events this user
    // has signed up for.  Then use the key for those events to sort through events
    // to get the event data to display on the calendar
    $scope.events = [];
    var constructedArray = [];
    var eventKeyArray = [];
    var usereventRef = new Firebase("https://capstonesignup.firebaseio.com/userevent/");
    var obj = $firebaseObject(usereventRef);

    obj.$loaded().then(function(data){
        var signupEventKeys = usereventRef.orderByChild("uid").equalTo(uid).on('child_added', function(snapshot){
          console.log("snapshot ", snapshot.val());
          var signupEventKeys = snapshot.val().eventid;
          eventKeyArray.push(signupEventKeys);
          console.log("eventKeyArray ", eventKeyArray);
          $scope.bindEventKeyArray = eventKeyArray;
        })
        var eventsRef = new Firebase("https://capstonesignup.firebaseio.com/events/");
        var eventObj = $firebaseObject(eventsRef);
        eventObj.$loaded().then(function(data){
          // read the value of the eventsRef and place it in the variable eventsObjectRef
          eventsRef.once('value', function(snap) {
            var eventsObjectRef = snap.val();
            $scope.bindEventKeyArray.forEach(function(element) {
              eventsObjectRef[element].stick = true;
              console.log("eventsObjecrRef  element ", eventsObjectRef[element]);
              $scope.events.push(eventsObjectRef[element]);
            });
          });
        });
    });  // end of the firebaseobject load

// ////////////////////////////////////////////////////////////////////////////////////////////////
    // Configure object for the calendar

    $scope.eventSources = [$scope.events];
    console.log("2 scope.event sources ", $scope.eventSources);
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
