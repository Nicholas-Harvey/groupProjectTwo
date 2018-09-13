var bathroomArray = [
{
    gender: "Female",
    latitude: 39.68065,
    longitude: -104.96492,
    location: "First Floor",
    rating: 5,
    letter: "a"
},
{
    gender: "Male",
    latitude: 39.68065,
    longitude: -104.96492,
    location: "First Floor",
    rating: 5,
    letter: "b"
},
{
    gender: "Unisex",
    latitude: 39.68065,
    longitude: -104.96492,
    location: "First Floor",
    rating: 5,
    letter: "c"
},
{
    gender: "Unisex",
    latitude: 39.68042,
    longitude: -104.96478,
    location: "Second Floor",
    rating: 5,
    letter: "d"
},
{
    gender: "Male",
    latitude: 39.68046,
    longitude: -104.96464,
    location: "Second Floor",
    rating: 5,
    letter: "e"
},
{
    gender: "Female",
    latitude: 39.68046,
    longitude: -104.96464,
    location: "Second Floor",
    rating: 5,
    letter: "f"
},
{
    gender: "Unisex",
    latitude: 39.68069,
    longitude: -104.96497,
    location: "Third Floor",
    rating: 5,
    letter: "g"
},
{
    gender: "Male",
    latitude: 39.68706,
    longitude: -104.96489,
    location: "Third Floor",
    rating: 5,
    letter: "h"
},
{
    gender: "Female",
    latitude: 39.68705,
    longitude: -104.96489,
    location: "Third Floor",
    rating: 5,
    letter: "i" 
}
];

function findClosestBathroom(theLatitude, theLongitude, array) {
    console.log("findClosestBathroom has been called");
    var arrayOfDistancesToBathrooms = [];
    var arrayOfDistancesToBathroomsSorted = [];
    for (var i = 0; i < array.length; i++) {
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
        arrayOfDistancesToBathrooms.push(distanceToBathroom);
        console.log("array of distances to bathrooms: " + arrayOfDistancesToBathrooms);
        arrayOfDistancesToBathroomsSorted.push(distanceToBathroom);
        console.log("array of distances to bathrooms, sorted: " + arrayOfDistancesToBathroomsSorted);
    }
    arrayOfDistancesToBathroomsSorted.sort(function(a, b){return a - b});
    console.log("array of distances to bathrooms, sorted: " + arrayOfDistancesToBathroomsSorted);
    for (let i = 0; i < 3; i++) {
        console.log(array[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i])]);
        console.log(array.indexOf(array[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i])]));
        console.log(array[arrayOfDistancesToBathrooms.indexOf(arrayOfDistancesToBathroomsSorted[i])].letter);
    }
};

var testLatitude = 39.75118;

var testLongitude = -105.00315;

findClosestBathroom(testLatitude, testLongitude, bathroomArray);