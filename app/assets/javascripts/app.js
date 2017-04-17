var favouriteProp = [];
var map;

function getProperty() {
  var searchTerm = $('.search-input').val();
  var searchStatus = $( ".status" ).val();

  $.ajax({
    url: 'https://data.melbourne.vic.gov.au/resource/xt73-zf4j.json',
    data: {
      "$limit" : 100,
      status: searchStatus,
      clue_small_area: searchTerm
    }
  }).done(function(data){
    var locations = [];
    for (var i = 0; i < data.length; i++) {
      var id = data[i].property_id
      var lat = data[i].location_1.coordinates[0]
      var long = data[i].location_1.coordinates[1]
      var planning = data[i].street_address
      locations.push([id, long, lat, planning, i]);
    };

    initMap(locations);

      //display script template
    data.forEach(function(property) {
      var source = $('#property_template').html();  //gets the template
      var template = Handlebars.compile(source)  //turns template string
      var html = template(property)

      $('.wrapper').append(html)

    });

  });
};

$(document).ready(function() {
  $( function() {
    var suburbs = [
      "Carlton",
      "Carlton North",
      "Docklands",
      "East Melbourne",
      "Flemington",
      "Jolimont",
      "Kensington",
      "Melbourne (CBD)",
      "North Melbourne",
      "Port Melbourne",
      "Parkville",
      "Southbank",
      "South Wharf",
      "South Yarra",
      "West Melbourne"
      ];
    $( "#tags" ).autocomplete({
        source: suburbs
    });
  });

  $(".search-btn").click(function(event){
    event.preventDefault();
    if($('.wrapper').children('.property').length > 0) {
      $('.wrapper').children('.property').remove();
    }
    getProperty();
  })

});


function initMap(locations) {


  map = new google.maps.Map(document.getElementById('map'), {
    center:  {lat: -37.81130119999999, lng: 144.9652936},
    zoom: 12
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
};
