// This module controls the partial signedupCal.html and directs the user to the 
// my addignments calendar.  i.e. things they have signed up for

app.controller("signedupCalCtrl",
  ["$scope", "storage", "$compile", "$firebaseArray", "$firebaseObject", "uiCalendarConfig", 
   function($scope, storage, $compile, $firebaseArray, $firebaseObject, uiCalendarConfig) {

    console.log("1 I made it to signedupCal!");


// Need to remove the first event source so we can send full calendar the source that contains
// only events this user is signup for.

    // .fullCalendar( 'removeEventSource', source )
   // $scope.calendar.mycalendar.fullCalendar('removeEventSource', $scope.events);
   // uiCalendarConfig.calendar[calendar].fullCalendar("refetchEvents");

     // Getting UserID
      var uid = storage.getUserId();
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
    // $scope.eventSources = [];
    // bind the newly constructed array to the DOM
    // $scope.events = constructedArray;  
    // console.log("scope events just before config ", $scope.events);
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
          eventsRef.once('value', function(snap) {
            var eventsObjectRef = snap.val();
            $scope.bindEventKeyArray.forEach(function(element) {
              $scope.events.push(eventsObjectRef[element]);
              // console.log("constructedArray ", constructedArray);
              // $scope.events = constructedArray;
              console.log("3 scope constructed in events ", $scope.events);
            }); 
           // Do I need a loop here to add the id to this array???????
          });
        });
    // end of the firebaseobject load
    });  

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