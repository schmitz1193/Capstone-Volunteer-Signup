// This module controls the partial splash.html and contains the login/registration code 

app.controller("loginControl",
	["$scope", "$firebaseAuth", "$firebaseArray", "$firebaseObject", "$location",
	 function($scope, $firebaseAuth, $firebaseArray, $firebaseObject, $location) {

	console.log("I made it!");

	 $scope.usersObj={};
	 $scope.email;
	 $scope.password;

    var ref = new Firebase("https://capstonesignup.firebaseio.com");

	// if previously registered login with email and password
	$scope.login = function() {
		var usersObj = {
			email: $scope.email,
			password: $scope.password
		};
		console.log("login usersObj", usersObj);

		ref.authWithPassword(usersObj, 
			function(error, authData) {
  			if (error) {
    		console.log("Login Failed!", error);
  			} else {
    			console.log("Authenticated successfully with payload:", authData);
				console.log("should direct to calendar of open assignments now");
				// then go to calendar of open assignments
				$location.path("/openCal");
  			}
		})
	};  
	
	// if not registered, enter email & password to create user account
		$scope.registerUser = function() {
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
		    // use the uid returned from authentication to create a unique record
		    // for each volunteer under users.  Add shirt=false under uid obj.
			newUser = userData.uid;
		    var usersRef = new Firebase("https://capstonesignup.firebaseio.com/users/");
			console.log("newUser ", newUser);
			usersRef.child(newUser).child('shirt').set('false');

			// then go to calendar of open assignments
			$location.path("/openCal");
			  }
		});

	};

}]);

// ////////////////////////////////////////////////////////////////////
