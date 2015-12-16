// This module controls the partial splash.html and contains the login/registration code 

app.controller("loginControl",
	["$scope", "$location", "$firebaseAuth", "$firebaseArray", "$firebaseObject", 
	 function($scope, $location, $firebaseAuth, $firebaseArray, $firebaseObject) {

	console.log("I made it to login!");

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
		checkEmail = usersObj.email;
		checkPassword = usersObj.password;

		ref.authWithPassword(usersObj, 
			function(error, authData) {
  			if (error) {
    		console.log("Login Failed!", error);
  			} else {
    			console.log("Authenticated successfully with payload:", authData);
				console.log("should direct to calendar of open assignments now");
				if ((checkEmail === "ssk@gmail.com") && (checkPassword === "ssk")) {
					// admin..go to admin screen aka addEvents

					console.log("I made it to the admin path");
					$location.path("/addEvents");
					// otherwise go to calendar of open assignments
					} else {
						$location.path("/openCal").replace();
						// .replace???
					}
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


	//if logout is selected on the nav bar, call this function and direct to login screen
 
	$scope.logout = function() {
		ref.unauth();
		$location.path("/login");

	}

}]);

// ////////////////////////////////////////////////////////////////////
