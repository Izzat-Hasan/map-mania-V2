var gMap;
var topLocations = [
    {"content":"Mackinac Island", "coordinates":{"lat":45.842829962,"lng":-84.617997528}},
    {"content":"San Diego", "coordinates":{"lat":32.7157,"lng":117.1611}},
    {"content":"cancun, mexico", "coordinates":{"lat":21.17429,"lng":-86.84656}},
    {"content":"Miami, Florida", "coordinates":{"lat":25.7617,"lng":-80.1918}},
    {"content":"Niagara Falls", "coordinates":{"lat":43.0962,"lng":-79.0377}},
    {"content":"Bora Bora", "coordinates":{"lat":-16.5004,"lng":-151.770538}},
    {"content":"Grand Canyon Village, AZ", "coordinates":{"lat":36.055084,"lng":-112.140823}},
    {"content":"Manchester, UK", "coordinates":{"lat":53.483959,"lng":-2.244644}},
    {"content":"Hawaii", "coordinates":{"lat":19.741755,"lng":-155.844437}},
    {"content":"Chicago", "coordinates":{"lat":41.881832,"lng":-87.623177}}

];

var locationIndex = topLocations.length-1;
var currentPlace = topLocations[locationIndex];
var score = 0;

function howtoplay(){
  document.getElementById("popup-1").classList.toggle("active");
}



function initMap() {
  gMap = new google.maps.Map(document.getElementById('myMapId'),{
    center: {lat:41.878, lng: -50}, zoom :3});
    google.maps.event.addListener(gMap, 'idle', function() { updateGame()});
    SetScore(score);
}

function updateGame() {
    var zoomLevel = gMap.getZoom();
    var inBounds = false;
    if (gMap.getBounds().contains(currentPlace.coordinates)) {
        var inBounds = true;
        console.log("Inbounds");
    }

    if ((zoomLevel > 8) && (inBounds)) {
        document.getElementById("hint").value = "You found a location!";
        console.log("You found a location!");

        confetti();
        confetti({
        spread: 100
      });
        addMarker(currentPlace);
        score = score+1
        document.getElementById("score-id").value = score;
        nextPlace();
    }

    else if ((zoomLevel > 6) && (inBounds)) {
          document.getElementById("hint").value = "you're almost there";
          console.log("you're almost there");

    }
    else if ((zoomLevel > 5) && (inBounds)) {
          document.getElementById("hint").value = "getting worm, keep zooming in";
          console.log("getting worm, keep zooming in");

    }   else if ((zoomLevel > 4) && (inBounds)) {
              document.getElementById("hint").value = "you're on the right track, keep zooming in";
              console.log("you're on the right track, keep zooming in");

        }
    else{
      document.getElementById("hint").value = "you're cold, try zooming in";
      console.log("you're cold");

    }
}



function addMarker(markerContent) {
    var marker = new google.maps.Marker({position:markerContent.coordinates, map:gMap});
    if (markerContent.iconImagePath) {
        marker.setIcon(markerContent.iconImagePath);
    }

    if (markerContent.content) {
        var infoWindow = new google.maps.InfoWindow({"content":markerContent.content});
        marker.addListener("click", function() { infoWindow.open(gMap, marker) });
    }
}




function SetScore() {
    document.getElementById("score-id").value = score;
}


function nextPlace() {
    locationIndex--;
    currentPlace = topLocations[locationIndex];
}


function cheatcode(){
   score = 10;
  document.getElementById("score-id").value = score;
  document.getElementById("hint").value = "you won!";
  var favLocations = [
      ['Mackinac Island', 45.842829962, -84.617997528],
      ['San Diego', 32.7157, -117.1611],
      ['cancun, mexico', 21.17429, -86.84656],
      ['Chicago', 41.881832, -87.623177],
      ['Miami, Florida', 25.7617, -80.1918],
      ['Niagara Falls', 43.0962, -79.0377],
      ['Bora Bora', -16.5004, -151.770538],
      ['Grand Canyon Village, AZ', 36.055084, -112.140823],
      ['Manchester, UK', 53.483959, -2.244644],
      ['Hawaii', 19.741755, -155.844437],



  ];
  confetti();
  confetti({
  spread: 100
});
  gMap = new google.maps.Map(document.getElementById('myMapId'),{
  center: {lat:41.878, lng: -50},zoom :3});
  var infowindow = new google.maps.InfoWindow;
  var pin, place;
  for (place = 0; place < favLocations.length; place++) {
      pin = new google.maps.Marker({
           position: new google.maps.LatLng(favLocations[place][1], favLocations[place][2]),
           map: gMap
      });
      google.maps.event.addListener(pin, 'click', (function(pin, place) {
           return function() {
               infowindow.setContent(favLocations[place][0]);
               infowindow.open(gMap, pin);}
      })(pin, place));
  }
}
