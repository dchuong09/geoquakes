// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";


$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
		success: function(response) {
			var features = response.features;
			features.forEach(function(feature) {
				var mag = feature.properties.mag;
				var place = feature.properties.place;
				$('#info').append(`<p>${mag}</p>`);
				$('#info').append(` - <p>${place}</p>`);
				$('#info').append(`<br>`);
				
				var coordinate = feature.geometry.coordinates;
				var mapLat = coordinate[1];
				var mapLng = coordinate[0];
				var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
				var marker = new google.maps.Marker({
			          position: {lat: mapLat, lng: mapLng},
			          icon: {
			          	url: "images/earthquake.png", // url
					    scaledSize: new google.maps.Size(25, 25), // scaled size
					    origin: new google.maps.Point(0,0), // origin
					    anchor: new google.maps.Point(0, 0) // anchor
			          },
			          map: map
			        });
				
			})


				
		},
		error: function(xhr, status, error) {
			alert("Sorry, there was a problem!");
			console.log("Status: " + status);
			console.log("Error: " + error);
		}
	})

	var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.78, lng: -122.44},
          zoom: 1
        });

});
