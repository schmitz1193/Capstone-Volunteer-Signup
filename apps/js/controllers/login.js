// This module controls the partial login.html and contains the login code

app.controller("loginControl",
	["$scope", "$window", "storage", "$firebaseAuth", "$firebaseArray", "$firebaseObject", "$location",
	 function($scope, $window, storage, $firebaseAuth, $firebaseArray, $firebaseObject, $location) {

	console.log("I made it to login!");

    var ref = new Firebase("https://capstonesignup.firebaseio.com");

	// if previously registered login with email and password
	$scope.login = function() {
		$scope.usersObj={};
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
    		$window.alert("Login incorrect - please try again or click to register");
    		console.log("Login Failed!", error);
  			} else {
    			console.log("Authenticated successfully with payload:", authData);
				// get the users name from the database
				var nameRef = new Firebase("https://capstonesignup.firebaseio.com/users/" + authData.uid + "/");
			    nameObj = $firebaseObject(nameRef);
			    // get the user name and set it ...load must be done on the object not the reference only
			    nameObj.$loaded()
			        .then(function(data){
						nameRef.once("value", function(snapshot) {
							console.log("value of snapshot ", snapshot.val());
  							var firstNameSnapshot = snapshot.child("firstName");
  							var firstName = firstNameSnapshot.val();
							console.log("first??? ", firstName);
						    storage.setFirstName(firstName);
  							var lastNameSnapshot = snapshot.child("lastName");
  							var lastName = lastNameSnapshot.val();
							console.log("last??? ", lastName);
							storage.setLastName(lastName);
  						})
			        })
				// Setting userID
				storage.setUserId(authData.uid);
					// if use has admin authorization.....go to admin screen aka addEvents
				if (authData.uid === 'e9a6c18a-6fbd-483b-ae80-28f73a12bcce') {
				// if ((checkEmail === "ssk@gmail.com") && (checkPassword === "ssk")) {
					storage.setFirstName("Stephanie");
					storage.setLastName("Krause");
					console.log("I made it to the admin path");
					$location.path("/addEvents");
					$scope.$apply();
					// otherwise go to calendar of open assignments
					} else {
						$location.path("/openCal");
						$scope.$apply();
					}
				}
  			})
		};


	//if logout is selected on the nav bar, call this function and direct to login screen

	$scope.logout = function() {
		ref.unauth();
		$location.path("/login");

	}

}]);

// ////////////////////////////////////////////////////////////////////
