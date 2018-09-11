// Function that will check off star icons

$("div#addDiv").hide();

$("div#addDiv span.fa-star").on("click", starCheckUpdate);

function starCheckUpdate() {
    $("div#addDiv span.fa-star").removeClass("checked");
    var checkedStar = $(this).attr("id").charAt(4);
    for (let i = 0; i < checkedStar; i++) {
        $("div#addDiv span:eq(" + i + ")").addClass("checked");
    }
};

// Click "add", run add function

$("button#addButton").on("click", function () {
    beginAddFunction();
});

function beginAddFunction() {
    getLocation();
    $("div#addOrReport").hide();
    $("div#addDiv").show();
};

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "bathrooms_db"
// });

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

$("div#submitOrCancelDiv button").on("click", function () {
    $("button#addButton").show();
    $("div#addDiv").hide();
});

var numberOfRatings;

// $("div#submitOrCancelDiv button#submitButton").on("click", function () {
//     con.connect(function (err) {
//         if (err) throw err;
//         con.query("SELECT * FROM products WHERE stock_quantity > 0", function (err, result, fields) {
//             if (err) throw err;
//             numberOfRatings = result;
//         });
//     });
// });


$("input#twentyFourHours").on("click", disableHoursInputCheck);

function disableHoursInputCheck() {
    console.log("input checked");
    if ($("input#twentyFourHours").is(":checked") === true) {
        $("input.hoursInput").prop("disabled", true);
    } else if ($("input#twentyFourHours").is(":checked") === false) {
        $("input.hoursInput").prop("disabled", false);
    }
};