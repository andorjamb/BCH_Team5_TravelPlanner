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
