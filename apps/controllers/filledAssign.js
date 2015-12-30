// This module controls the partial filledAssign.html and directs the user to the 
// my addignments calendar.  i.e. things they have signed up for

app.controller("filledAssignCtrl",
  ["$scope", "storage", "$compile", "$firebaseArray", "$firebaseObject", "uiCalendarConfig", 
   function($scope, storage, $compile, $firebaseArray, $firebaseObject, uiCalendarConfig) {

    console.log("I made it to filledAssign!");

     // Getting UserID - dont really need for admin functions
      // var uid = storage.getUserId();
      // var firstName = storage.getFirstName();
      // var lastName = storage.getLastName();
      // console.log("uid in filledAssign", uid);

    // Setting up dates using moment
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear(); 

    $scope.events = [];
    // $scope.eventSources = [];
    // bind the newly constructed array to the DOM
    // $scope.events = constructedArray;  
    // console.log("scope events just before config ", $scope.events);    var constructedArray = [];
    var eventKeyArray = [];

    // get all the userevents, then with the eventID filter through the events  
    // only put matches into the newwarray for the calendar

    var usereventRef = new Firebase("https://capstonesignup.firebaseio.com/userevent/");
    var usereventArray = $firebaseArray(usereventRef);
    $scope.eventKeyArray = [];

    usereventArray.$loaded().then(function(data){
      console.log("usereventArray data ", data);
      // create an array with just the eventid keys 
              data.forEach(function(element) {
                currentEventId = element.eventid;
                $scope.eventKeyArray.push(currentEventId);
                console.log("eventkeyarray ", $scope.eventKeyArray);
              })
          var eventsRef = new Firebase("https://capstonesignup.firebaseio.com/events/");
          var eventObj = $firebaseObject(eventsRef);
          eventObj.$loaded().then(function(data){
            // read the value of the eventsRef and place it in the variable eventsObjectRef
            eventsRef.once('value', function(snap) {
              var eventsObjectRef = snap.val();
              console.log("eventsObjectRef -object with event objects ", eventsObjectRef);
              $scope.eventKeyArray.forEach(function(element) {
              $scope.events.push(eventsObjectRef[element]);
            }); 
          });
      });   
    });  // end of the firebaseobject load

// ////////////////////////////////////////////////////////////////////////////////////////////////

    /////// Listen for click events from the Calendar ////////

   // /* alert on eventClick - volunteer info to DOM for Admin to view who signed up */

    // using the event id from the event the admin clicked on, filter through userevents to get 
    // the user that has signed up for it.  
    // Display the name of the user (i.e.volunteer) on the modal page.


    $scope.alertEventClick = function( event, jsEvent, view){
       console.log("Event click works ", event);

       $scope.modalTitle = event.title;
       $scope.modalDay = moment(event.start).format('YYYY-MM-DD');
       $scope.modalStart = moment(event.start).format('HH:mm');
       $scope.modalEnd = moment(event.end).format('HH:mm');
       $scope.modalDescription = event.description;
       $scope.eventKey = event.id;
       console.log("$scope.eventKey ", $scope.eventKey);
       $scope.event = event;
       console.log("scope event ", $scope.event);
       $("#signupModal").modal({show: true});

    };
    // ///////////////////////////////////////////////////////

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