// This module controls the partial filledAssign.html and directs the Admin to the 
// filled assignments calendar.  i.e. things that have been volunteered for.  Admin can 
// view the name of the volunteer by clicking on the assignment (event)

app.controller("filledAssignCtrl",
  ["$scope", "storage", "$compile", "$firebaseArray", "$firebaseObject", "uiCalendarConfig", 
   function($scope, storage, $compile, $firebaseArray, $firebaseObject, uiCalendarConfig) {

    console.log("I made it to filledAssign!");

    // Setting up dates using moment
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear(); 

    $scope.events = [];

    // Firebase load for this module
    // get all the userevents, then with the eventID filter through the events  
    // only put matches into the newwarray for the calendar

    $scope.usereventRef = new Firebase("https://capstonesignup.firebaseio.com/userevent/");
    var usereventArray = $firebaseArray($scope.usereventRef);
    $scope.eventKeyArray = [];
    $scope.uidArray = [];

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
            $scope.eventKeyArray.forEach(function(element) {
              eventsObjectRef[element].stick = true;
              console.log("eventsObjecrRef  element ", eventsObjectRef[element]);
            $scope.events.push(eventsObjectRef[element]);
          }); 
        });
      });   
    });  // end of the firebaseobject load


    /////// Listen for click events from the Calendar ////////

   // /* alert on eventClick - volunteer info to DOM for Admin to view who signed up */
    $scope.alertEventClick = function( event, jsEvent, view){
       console.log("Event click works ", event);

      // using the event id from the event the admin clicked on, filter through userevents to get 
      // the user that has signed up for it.  
      // Display the name of the user (i.e.volunteer) on the modal page.
      console.log("scoped userevent ", $scope.usereventRef);
        $scope.usereventRef.orderByChild("eventid").equalTo(event.eventid).on('child_added', function(snapshot){
            console.log("snapshot ", snapshot.val());
            $scope.modalFirstName = snapshot.val().firstName;
            $scope.modalLastName = snapshot.val().lastName;
            $scope.modalSize = snapshot.val().size;
            console.log("firstname ", $scope.modalFirstName);
        })
        // Bind the remaining data from the calendar info to the DOM to be displayed in modal
       $scope.modalTitle = event.title;
       $scope.modalDay = moment(event.start).format('dddd, MMMM Do YYYY');
       $scope.modalStart = moment(event.start).format("h:mm a");
       $scope.modalEnd = moment(event.end).format("h:mm a");
       $scope.modalDescription = event.description;
       $scope.event = event;
       console.log("scope event ", $scope.event);
       $("#signupModal").modal({show: true});
    };
    // End of listen for click events //

    // Configure object for the calendar  /////
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
    // End of configure Object for the calendar
  
}]);  // End of fillledAssign.js  
