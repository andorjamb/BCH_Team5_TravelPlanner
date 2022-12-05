/*
MapBox API

https://api.mapbox.com/styles/v1/mapbox/light-v10/static/[20,59,31,70]/300x600?access_token=pk.eyJ1IjoiamFtYml1cyIsImEiOiJjbGI5d3hyMDMwejZoM3dxaDdmZm5oYXZzIn0.VaK4NVDUArlcKkIZlTfmJg

https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+c03030(24.9,60.1)/[18.7766,58.9565,35.1869,70.4466]/150x250?access_token=pk.eyJ1IjoiamFtYml1cyIsImEiOiJjbGI5d3hyMDMwejZoM3dxaDdmZm5oYXZzIn0.VaK4NVDUArlcKkIZlTfmJg

https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+c03030(${lon,lat})/[18.7766,58.9565,35.1869,70.4466]/150x250?access_token=pk.${MapsAPIKey}

const MapsAPIKey = eyJ1IjoiamFtYml1cyIsImEiOiJjbGI5d3hyMDMwejZoM3dxaDdmZm5oYXZzIn0.VaK4NVDUArlcKkIZlTfmJg

/**////////////////////// */

function myMap() {
  //map options
  let mapOptions = {
    center: new google.maps.LatLng(60.250165666, 25.00583331),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.HYBRID,
  };
  // new map
  let map = new google.maps.Map(document.getElementById("map"), mapOptions);
  // Add marker
  /* let marker = new google.maps.Marker({
    position: { lat: 60.250165666, lng: 25.00583331 },
    map: map,
  });

  // Info window
  let infoWindow = new google.maps.InfoWindow({ content: "<h1>Malmi</h1>" });

  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  }); */
  // Add marker function
  function addMarker(coords) {
    let marker = new google.maps.Marker({
      position: coords,
      map: map,
    });
  }

  addMarker({ lat: 60.250165666, lng: 25.00583331 });
}
