// Function that will check off star icons

$("div#addDiv").hide();

$("div#allResultsDiv").hide();
$("div#allResultsDiv div.resultsRatingsDiv").hide();

$("div#rateBathroomDiv button#rateButton").on("click", function() {
    submitPressed = false;
    findBathroomPressed = false;
    rateBathroomPressed = true;
    getLocation();
});

$("div.resultsDiv").on("click", hideOtherResults);

function hideOtherResults() {
    $("div.resultsDiv").hide();
    $(this).show();
};

$("div#allResultsDiv button.rateButton").on("click", function() {
    $("div.resultsDiv:visible div.resultsRatingsDiv").show();
    $("div.rating").hide();
});

$("div.resultsRatingsDiv span.fa-star").on("click", resultsStarCheckUpdate);

function resultsStarCheckUpdate() {
    console.log($(this));
    $("div.resultsRatingsDiv:visible span.fa-star").removeClass("checked");
    var checkedStar = $(this).attr("id").charAt(4);
    for (let i = 0; i < checkedStar; i++) {
        $("div.resultsRatingsDiv:visible span:eq(" + i + ")").addClass("checked");
    }
    console.log($("div.resultsRatingsDiv:visible span.checked").length);
};

$("button.ratingSubmitButton").on("click", submitRating);

function submitRating() {
    console.log("sumbitted!");
    bathroomArray[parseInt($("div.resultsDiv:visible p.index:visible").html())].rating = $("div.resultsDiv:visible span.checked:visible").length;
    $("div#allResultsDiv").hide();
    console.log(bathroomArray);
};

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
var rateBathroomPressed = false;

$("div#submitOrCancelDiv button#submitButton").on("click", function() {
    console.log("Submit button was clicked.");
    submitPressed = true;
    findBathroomPressed = false;
    rateBathroomPressed = false;
    getLocation();
});

$("div#findBathroomDiv button#findBathroomButton").on("click", function() {
    console.log("Find Bathroom button was clicked");
    submitPressed = false;
    findBathroomPressed = true;
    rateBathroomPressed = false;
    getLocation();
})

function createBathroomObject(theLatitude, theLongitude, theRating) {
    console.log("createBathroomWasCalled");
    var newBathroom = {};
    newBathroom.gender = $("select#setGenderAddSelect option:selected").val();
    newBathroom.latitude = parseFloat(theLatitude.toFixed(5));
    newBathroom.longitude = parseFloat(theLongitude.toFixed(5));
    newBathroom.location = $("textarea#locationInput").val();
    newBathroom.rating = theRating;
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
    rating: 3 
},
{
    gender: "f",
    latitude: 39.68065,
    longitude: -104.96492,
    location: "First Floor",
    rating: 3 
},
{
    gender: "o",
    latitude: 39.68065,
    longitude: -104.96492,
    location: "First Floor",
    rating: 3 
},
{
    gender: "o",
    latitude: 39.68042,
    longitude: -104.96478,
    location: "Second Floor",
    rating: 3 
},
{
    gender: "m",
    latitude: 39.68046,
    longitude: -104.96464,
    location: "Second Floor",
    rating: 3 
},
{
    gender: "f",
    latitude: 39.68046,
    longitude: -104.96464,
    location: "Second Floor",
    rating: 3 
},
{
    gender: "o",
    latitude: 39.68069,
    longitude: -104.96497,
    location: "Third Floor",
    rating: 3 
},
{
    gender: "m",
    latitude: 39.68705,
    longitude: -104.96488,
    location: "Third Floor",
    rating: 3 
},
{
    gender: "f",
    latitude: 39.68705,
    longitude: -104.96489,
    location: "Third Floor",
    rating: 3 
}
];

function findClosestBathroom(theLatitude, theLongitude, array) {
    $("span").removeClass("checked");
    $("div.rating").hide();
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
            var sortedDistanceObject = {
                distance: distanceToBathroom,
                originalIndex: i
            }
            arrayOfDistancesToBathroomsSorted.push(sortedDistanceObject);
            console.log("array of distances to bathrooms, sorted: " + arrayOfDistancesToBathroomsSorted.distance);
        }
    }
    arrayOfDistancesToBathroomsSorted.sort(function(a, b){return a - b});
    console.log("array of distances to bathrooms, sorted: " + arrayOfDistancesToBathroomsSorted.distance);
    if (arrayOfDistancesToBathrooms.length >= 3) {
        numberOfAvailableBathrooms = 3;
    } else if (arrayOfDistancesToBathrooms.length < 3) {
        numberOfAvailableBathrooms = arrayOfDistancesToBathrooms.length;
    }
    console.log('number of available bathrooms: ' + numberOfAvailableBathrooms);
    $("div#allResultsDiv").show();
    $("div.resultsDiv").show();
    $("div.resultsRatingsDiv").hide();
    // $("div.resultsRatingsDiv").show();
    $("div.rating").show();
    console.log("number of paragraphs: " + $("p.gender").length);
    for (var i = 0; i < numberOfAvailableBathrooms; i++) {
        console.log(matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i].distance)]);
        console.log(matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i].distance)].gender);
        var genderAtI = matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i].distance)].gender;
        var locationAtI = matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i].distance)].location;
        var latitudeAtI = matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i].distance)].latitude;
        var longitudeAtI = matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i].distance)].longitude;
        var ratingAtI = matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i].distance)].rating;
        var indexAtI = arrayOfDistancesToBathroomsSorted[i].originalIndex;
        console.log(genderAtI);
        // console.log(typeof genderAtI);
        var genderLine = $("p.gender:eq(" + i + ")");
        console.log("genderLine: " + genderLine);
        if (genderAtI === "m") {
            genderLine.html("Gender: Male");
        } else if (genderAtI === "f") {
            genderLine.html("Gender: Female");
        } else if (genderAtI === "o") {
            genderLine.html("Gender: Other");
        }
        var locationLine = $("p.location:eq(" + i + ")");
        var latitudeLine = $("p.latitude:eq(" + i + ")");
        var longitudeLine = $("p.longitude:eq(" + i + ")");
        var indexLine = $("p.index:eq(" + i + ")");
        locationLine.html(locationAtI);
        latitudeLine.html(latitudeAtI);
        longitudeLine.html(longitudeAtI);
        indexLine.html(indexAtI);
        for (var j = 0; j < ratingAtI; j++) {
            $("div.rating:eq(" + i + ") span.fa-star:eq(" + j + ")").addClass("checked");
        }
        // console.log(matchingBathroomArray.indexOf(matchingBathroomArray[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i])]));
        // console.log(array[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i])].gender);
    }
};

var testLatitude = 39.75118;

var testLongitude = -105.00315;