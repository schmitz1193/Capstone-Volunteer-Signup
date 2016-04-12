// This module controls the partial addEevents.html and directs the admin to the open
// assignment calendar.  It also allows for entry of data to create a new event.
// Only the admin has access to this screen.  i.e. someone with special log-in cedentials

app.controller("addEventsCtrl",
	["$scope", "storage", "$compile", "$firebaseArray", "$firebaseObject", "uiCalendarConfig",
	 function($scope, storage, $compile, $firebaseArray, $firebaseObject, uiCalendarConfig) {

	console.log("Made it to addEvents!");

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

//  Function called from the Admin screen (modal) to add an event to the db
  $scope.addEvent = function() {
  // must first format the date and time using Moment
    var stringStart = String($scope.startTime);
    var timeStart = moment(stringStart).format("THH:mm:ss");

    var stringEnd = String($scope.endTime);
    var timeEnd = moment(stringEnd).format("THH:mm:ss");

    calStart = $scope.newDate + timeStart;
    calEnd = $scope.newDate + timeEnd;

    // Firebase ref for all events - set up the new event from the info on the screen
    var allEvents = new Firebase("https://capstonesignup.firebaseio.com/events/");
    $scope.allEventsArray = $firebaseArray(allEvents);
    $scope.allEventsArray.$loaded().then(function(data){
      $scope.allEventsArray.$add({
        title: $scope.title,
        description: $scope.description,
        start: calStart,
        end: calEnd,
        allDay: false,
        allFilled: false,
        numNeeded: $scope.numNeeded,
        numFilled: 0,
        eventid: ""
      }).then(function(ref) {
        // include the key for events as a key value pair in the record
          id = ref.key();
          console.log("added record with id " + id);
          ref.update({ eventid: id });
          // once the new event is added to the db, add this new event to event sources and make it stick!
          var addedEventRef = new Firebase("https://capstonesignup.firebaseio.com/events/" + id + "/");
          console.log("id ", id);
          addEventObj = $firebaseObject(addedEventRef);
          addEventObj.$loaded().then(function(data){
              addedEventRef.once("value", function(snapshot) {
              console.log("value of snapshot ", snapshot.val());
              addEventObjectToPush = {};
              addEventObjectToPush.allDay = snapshot.val().allDay
              addEventObjectToPush.start = snapshot.val().start;
              addEventObjectToPush.end = snapshot.val().end;
              addEventObjectToPush.title = snapshot.val().title;
              addEventObjectToPush.description = snapshot.val().description;
              addEventObjectToPush.allFilled = snapshot.val().allFilled;
              addEventObjectToPush.numNeeded = snapshot.val().numNeeded;
              addEventObjectToPush.numFilled = snapshot.val().numFilled;
              addEventObjectToPush.id = snapshot.val().eventid;
              addEventObjectToPush.stick = true;
              console.log("addEventObjectToPush ", addEventObjectToPush);
              $scope.events.push(addEventObjectToPush);
          });
        });
      });
    })
}
  // End of add event to db

// Listen for click events from the Calendar - alert on eventClick
    $scope.alertDayClick = function( date, jsEvent, view){
        // need modal so new event for this day can be input..the date from the fullCaledar callback
        // returns the day (in a moment) that the click was on.  Put it on the scope so the addEvent
        // function can use to create a new event
        $("#addModal").modal({show: true});
        $scope.newDate = date.format();
        console.log("day click add event ", $scope.newDate);
    };

   /* alert on eventClick this will give the Admin info on who & how many have signed up*/
    $scope.alertEventClick = function( event, jsEvent, view){
        // this is for volunteer screen....sign up modal needed to be built and accessed
        console.log("Event click works ", event);
    };

   // Render Tooltip
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    // End of Render Tooltip


// /////////////////////////////////////////////////////////////////////////////////
    $scope.events = [];
    // put the event data from the firebase db into an array to send it to calendar
    // NOTE:  fullcalendar does not play with a firebase array-that is why we format our own aray
    var ref = new Firebase("https://capstonesignup.firebaseio.com/events/");

    var constructedArray=[];
    $scope.fireEvents = $firebaseArray(ref);
    $scope.fireEvents.$loaded().then(function(data){
      for(var i =0; i < data.length; i++){
        var myObjectToPush = {}
        myObjectToPush.allDay = data[i].allDay;
        myObjectToPush.end = data[i].end;
        myObjectToPush.start = data[i].start;
        myObjectToPush.title = data[i].title;
        myObjectToPush.description = data[i].description;
        myObjectToPush.allFilled = data[i].allFilled;
        myObjectToPush.numNeeded = data[i].numNeeded;
        myObjectToPush.numFilled = data[i].numFilled;
        myObjectToPush.id = data[i].$id;
        myObjectToPush.stick = true;
        constructedArray.push(myObjectToPush);
      }
      console.log("constructed array ", constructedArray);
   })
// End creating array to send to calendar

// ???????????????????????????????????????????
// $('calendar').fullCalendar('renderEvent', $scope.events, true);
// ????????????????????????????????????????????

    // bind the newly constructed array to the DOM
  // Configure the object for the calendar
    $scope.events = constructedArray;
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
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };
  // })
}]);
