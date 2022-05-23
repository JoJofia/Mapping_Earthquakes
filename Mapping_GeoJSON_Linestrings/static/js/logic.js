// add console.log to check to see if our code is working
console.log("working");

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//         // We turn each feature into a marker on the map.
//         onEachFeature: function(feature, layer) {
//             console.log(layer);
//             layer.bindPopup();}
// }).addTo(map);

// // Coordinates for each point to be used in the line.
// let line = [
//   [33.9416, -118.4085],
//   [30.1975, -97.6664],
//   [43.6777, -79.6248],
//   [40.6413, -73.7781]
// ];

// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//   color: "blue",
//   weight: 4,
//   opacity: 0.5
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    accessToken: API_KEY,
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44, -80],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/JoJofia/Mapping_Earthquakes/main/torontoRoutes.json";

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data,{
      color: "#ffffa1",
      weight: 2,
      style: myStyle,
      onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>Airline: " + feature.properties.airline + "</h2> <hr> <h3>Destination: " + feature.properties.dst + "</h3>")
     }
    }).addTo(map);
  });

