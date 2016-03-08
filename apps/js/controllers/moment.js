    var stringDate = String($scope.date);
    var calDate = moment(stringDate).format('YYYY-MM-DD');   
    console.log("moment date ", calDate);

    var stringTime = String($scope.time);
    var calTime = moment(stringTime).format("THH:mm:ss");
    console.log("moment time ", calTime);

    // var cloneTime = moment(calTime);
    // var endTime = moment(cloneTime).add(2, 'h')
    // console.log("endTime ", endTime);

// var timestring = "2015-12-24T01:00:00Z";
// var firstmoment = moment(timestring);
// var clonemoment = moment(firstmoment);
// var newtime = moment(clonemoment).add(2, "h");
// console.log("newtime ", newtime);

// var now = moment()
// now.add(2, 'h')
// now.add(2, 'd').format()


