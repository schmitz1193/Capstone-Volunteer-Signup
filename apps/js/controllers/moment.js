    var stringDate = String($scope.date);
    var calDate = moment(stringDate).format('YYYY-MM-DD');
    console.log("moment date ", calDate);

    var stringTime = String($scope.time);
    var calTime = moment(stringTime).format("THH:mm:ss");
    console.log("moment time ", calTime);

