app.factory("storage", function() {
  var userId = null;

  return {
    getUserId: function() {
      return userId;
    },
    setUserId: function(id) {
      userId = id;
      console.log("userID set to:", id);
    },
    getFirstName: function() {
      return FirstName;
    },
    setFirstName: function(first) {
      FirstName = first;
      console.log("First name set to:", first);
    },
    getLastName: function() {
      return LastName;
    },
    setLastName: function(last) {
      LastName = last;
      console.log("Last Name set to:", last);
    }
  };
});