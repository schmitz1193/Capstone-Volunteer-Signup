// This module controls the partial addEevents.html and directs the admin to the open
// assignment calendar.  It also allows for entry of data to create a new event.  
// Only the admin has access to this screen.  i.e. someone with special log-in cedentials

app.controller("addEventsCtrl",
	["$scope", "storage", "$compile", "$firebaseArray", "uiCalendarConfig", 
	 function($scope, storage, $compile, $firebaseArray, uiCalendarConfig) {

	console.log("Made it to addEvents!");

     // Getting UserID
      // var uid = storage.getUserId();
      // console.log("uid", uid);


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

    console.log("start ", calStart);
    console.log("end ", calEnd);

  // no blank input is allowed.  if a blank is returned, the event is not accepted
  // when a new event has been entered, create the new record to add to the db.  

  // ///////// Firebase ref for all events  //////////////////////
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
          numNeeded: 0,
          numFilled: 0,
          eventid: ""
        }).then(function(ref) {
          // include the key for events as a key value pair in the record
          var id = ref.key();
          console.log("added record with id " + id);
          ref.update({ eventid: id });
        });
        console.log("alleventsArray ", $scope.allEventsArray);  
        // for(var i=0; i<data.length; i++){
        //   $scope.allEventsArray.eventid[i] = $scope.allEventsArray.$id[i];
        // }
      })
  }
// /////////////////////////////////////////////////////////////////////////////////
    $scope.events = [];
    // put the event data from the firebase db into an array 
    var ref = new Firebase("https://capstonesignup.firebaseio.com/events/");

    var constructedArray=[];
    $scope.fireEvents = $firebaseArray(ref);
    $scope.fireEvents.$loaded().then(function(data){
      // console.log("data ", data);
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
// /////////////////////////////////////////////////////////////////////////
// Listen for click events from the Calendar
   /* alert on eventClick */
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
// ////////////////////////////////////////////////////////////////////////

    // bind the newly constructed array to the DOM
    // $scope.events = constructedArray;  
    console.log("scope events ", $scope.events);
  // Configure the object for the calendar
    $scope.eventSources = [constructedArray];
    // $scope.eventSources = [$scope.events];
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
        // eventRender: $scope.eventRender  
      }
    };
  // }) 
}]);