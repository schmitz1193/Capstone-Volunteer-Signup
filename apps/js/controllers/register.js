// This module controls the partial register.html and contains the registration code for a new user

app.controller("registerControl",
	["$scope", "$window", "storage", "$firebaseAuth", "$firebaseArray", "$firebaseObject", "$location",
	 function($scope, $window, storage, $firebaseAuth, $firebaseArray, $firebaseObject, $location) {

	console.log("I made it to registration!");

    var ref = new Firebase("https://capstonesignup.firebaseio.com");

	
	// if not registered, enter email & password to create user account
	$scope.registerUser = function() {
	    $scope.showName = true;
		var usersObj = {
			email: $scope.email,
			password: $scope.password
		};
		console.log("register usersObj", usersObj);
		ref.createUser({
		  email    : $scope.email,
		  password : $scope.password
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		    console.log("first, ", $scope.firstName);
		    console.log("last, ", $scope.lastName);

		    // if ($scope.first === "" || $scope.last === "") {
    		// 	$window.alert("Please enter your first and last name");
		    // } else {

		    // use the uid returned from authentication to create a unique record
		    // for each volunteer under users.  Add shirt=false under uid obj.
			newUser = userData.uid;
		    var usersRef = new Firebase("https://capstonesignup.firebaseio.com/users/" + newUser);
      		$scope.data = $firebaseObject(usersRef);
      		// Create the user record...load must be done on the object not the reference only
			$scope.data.$loaded() 
				.then(function(){
        		usersRef.set({
          			uid: newUser,
          			firstName: $scope.firstName,
          			lastName: $scope.lastName,
          			shirt: false,
          			size: "XX"
     		   })  
   		   })
  
			// Setting userID 
			storage.setUserId(newUser);
			storage.setFirstName($scope.firstName);
			storage.setLastName($scope.lastName);
			// then go to calendar of open assignments
			$location.path("/openCal");
			$scope.$apply();
			// } //else?//
		  }
		});

	};
	

}]);

// ////////////////////////////////////////////////////////////////////
