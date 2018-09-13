// Function that will check off star icons

$("div#addDiv").hide();

$("div#addDiv span.fa-star").on("click", starCheckUpdate);

function starCheckUpdate() {
    $("div#addDiv span.fa-star").removeClass("checked");
    var checkedStar = $(this).attr("id").charAt(4);
    for (let i = 0; i < checkedStar; i++) {
        $("div#addDiv span:eq(" + i + ")").addClass("checked");
    }
    console.log($("div#addDiv span.checked").length);
};

function checkForGender() {
    if ((localStorage.getItem("gender") === null) || (localStorage.getItem("gender") === "undefined")) {
        console.log("Gender is not defined");
        $("div#setGenderDiv").show();
    } else if (localStorage.getItem("gender") !== null) {
        console.log("User has set gender");
        $("div#setGenderDiv").hide();
    }
};

checkForGender();

$("div#setGenderDiv button#setGenderButton").on("click", function() {
    localStorage.setItem("gender", $("select#setGenderSelect option:selected").val());
    console.log("gender: " + localStorage.getItem("gender"));
});

// Click "add", run add function

$("button#addButton").on("click", function () {
    beginAddFunction();
});

function beginAddFunction() {
    $("div#addOrReport").hide();
    $("div#addDiv").show();
};

function showPosition(position) {
    console.log("showPosition called");
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    if (submitPressed === true) {
        console.log("submitPressed: " + submitPressed);
        var rating = $("div#addDiv span.checked").length;
        createBathroomObject(lat, long, rating);
    } else if (findBathroomPressed === true) {
        findClosestBathroom(lat, long, bathroomArray);
    }
};

function getLocation() {
    console.log("getLocation called");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
};

$("div#submitOrCancelDiv button").on("click", function () {
    $("button#addButton").show();
    $("div#addDiv").hide();
});

var submitPressed = false;
var findBathroomPressed = false;

$("div#submitOrCancelDiv button#submitButton").on("click", function() {
    console.log("Submit button was clicked.");
    submitPressed = true;
    findBathroomPressed = false;
    getLocation();
});

$("div#findBathroomDiv button#findBathroomButton").on("click", function() {
    console.log("Find Bathroom button was clicked");
    submitPressed = false;
    findBathroomPressed = true;
    getLocation();
})

function createBathroomObject(theLatitude, theLongitude, theRating) {
    console.log("createBathroomWasCalled");
    var newBathroom = {};
    newBathroom.gender = $("select#setGenderAddSelect option:selected").val();
    newBathroom.latitude = parseFloat(theLatitude.toFixed(5));
    newBathroom.longitude = parseFloat(theLongitude.toFixed(5));
    newBathroom.location = $("textarea#locationInput").val();
    newBathroom.currentRating = theRating;
    console.log(newBathroom);
    bathroomArray.push(newBathroom);
    console.log(bathroomArray);
};

$("input#twentyFourHours").on("click", disableHoursInputCheck);

function disableHoursInputCheck() {
    console.log("input checked");
    if ($("input#twentyFourHours").is(":checked") === true) {
        $("input.hoursInput").val("");
        $("input.hoursInput").prop("disabled", true);
    } else if ($("input#twentyFourHours").is(":checked") === false) {
        $("input.hoursInput").prop("disabled", false);
    }
};

var bathroomArray = [
{
    gender: "f",
    latitude: 39.68065,
    longitude: -104.96492,
    location: "First Floor",
    rating: 5 
},
{
    gender: "f",
    latitude: 39.68065,
    longitude: -104.96492,
    location: "First Floor",
    rating: 5 
},
{
    gender: "o",
    latitude: 39.68065,
    longitude: -104.96492,
    location: "First Floor",
    rating: 5 
},
{
    gender: "o",
    latitude: 39.68042,
    longitude: -104.96478,
    location: "Second Floor",
    rating: 5 
},
{
    gender: "m",
    latitude: 39.68046,
    longitude: -104.96464,
    location: "Second Floor",
    rating: 5 
},
{
    gender: "f",
    latitude: 39.68046,
    longitude: -104.96464,
    location: "Second Floor",
    rating: 5 
},
{
    gender: "o",
    latitude: 39.68069,
    longitude: -104.96497,
    location: "Third Floor",
    rating: 5 
},
{
    gender: "m",
    latitude: 39.68705,
    longitude: -104.96488,
    location: "Third Floor",
    rating: 5 
},
{
    gender: "f",
    latitude: 39.68705,
    longitude: -104.96489,
    location: "Third Floor",
    rating: 5 
}
];

function findClosestBathroom(theLatitude, theLongitude, array) {
    var numberOfAvailableBathrooms;
    console.log("findClosestBathroom has been called");
    var matchingBathroomArray = [];
    var arrayOfDistancesToBathrooms = [];
    var arrayOfDistancesToBathroomsSorted = [];
    for (var i = 0; i < array.length; i++) {
        console.log("Bathroom at index " + i + " is a match? " + (localStorage.getItem("gender") === array[i].gender));
        if ((localStorage.getItem("gender") === array[i].gender) || (array[i].gender === "o")) {
            var differenceBetweenLatitudes = (theLatitude - array[i].latitude);
            console.log("difference between Latitudes: " + differenceBetweenLatitudes);
            var differenceBetweenLongitudes = (theLongitude - array[i].longitude);
            console.log("difference between Longitudes: " + differenceBetweenLongitudes);
            var differenceBetweenLatitudesSquared = Math.pow(differenceBetweenLatitudes, 2);
            console.log("difference between Latitudes, squared: " + differenceBetweenLatitudesSquared);
            var differenceBetweenLongitudesSquared = Math.pow(differenceBetweenLongitudes, 2);
            console.log("difference between Longitudes, squared: " + differenceBetweenLongitudesSquared);
            var sumOfLatitudeAndLongitude = parseFloat(differenceBetweenLatitudesSquared) + parseFloat(differenceBetweenLongitudesSquared);
            console.log("sum of lat and long: " + sumOfLatitudeAndLongitude);
            // Use Pythagorean Theorem to find distance between two coordinates
            var distanceToBathroom = Math.sqrt(sumOfLatitudeAndLongitude);
            console.log("distance to bathroom: " + distanceToBathroom);
            matchingBathroomArray.push(bathroomArray[i]);
            arrayOfDistancesToBathrooms.push(distanceToBathroom);
            console.log("array of distances to bathrooms: " + arrayOfDistancesToBathrooms);
            arrayOfDistancesToBathroomsSorted.push(distanceToBathroom);
            console.log("array of distances to bathrooms, sorted: " + arrayOfDistancesToBathroomsSorted);
        }
    }
    arrayOfDistancesToBathroomsSorted.sort(function(a, b){return a - b});
    console.log("array of distances to bathrooms, sorted: " + arrayOfDistancesToBathroomsSorted);
    if (arrayOfDistancesToBathrooms.length >= 3) {
        numberOfAvailableBathrooms = 3;
    } else if (arrayOfDistancesToBathrooms.length < 3) {
        numberOfAvailableBathrooms = arrayOfDistancesToBathrooms.length;
    }
    for (var i = 0; i < numberOfAvailableBathrooms; i++) {
        console.log(matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i])]);
        // console.log(matchingBathroomArray.indexOf(matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i])]));
        // console.log(array[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i])].letter);
    }
};

var testLatitude = 39.75118;

var testLongitude = -105.00315;