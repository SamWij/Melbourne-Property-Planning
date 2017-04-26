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
    console.log(data)
    var locations = [];
    for (var i = 0; i < data.length; i++) {
      var id = data[i].property_id
      var lat = data[i].location_1.coordinates[0]
      var long = data[i].location_1.coordinates[1]
      var planning = data[i].street_address
      var planning_no = data[i].town_planning_application_no
      locations.push([id, long, lat, planning, planning_no]);
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

    $("#autocomplete").autocomplete({
        source: suburbs
    });
  });

  $(".search-btn").click(function(event){
    event.preventDefault();
    if($('.wrapper').children('.property').length > 0) {
      $('.wrapper').children('.property').remove();
    }
    getProperty();
  });

  $('#toggle_btn').bootstrapToggle('on')
  $('.wrapper').css("display","none");

  $("#toggle_btn").on("change", function () {
    if ($(this).parent().hasClass("off")) {
      $('#map').css("display","none");
      $('.wrapper').css("display","block");
    } else {
      $('#map').css("display","block");
      $('.wrapper').css("display","none");
      google.maps.event.trigger(map, 'resize');
    }
  });

});


function initMap(locations) {
  console.log(locations)
  map = new google.maps.Map(document.getElementById('map'), {
    center:  {lat: locations[1][1], lng: locations[1][2]},
    zoom: 15
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {
    var labels = locations[i][3];
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      url: 'http://www.melbourne.vic.gov.au/building-and-development/property-information/planning-building-registers/Pages/town-planning-permits-register-search-results.aspx?permit='+ locations[i][4],
      title: labels,
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function() {
      return function() {
        window.open(marker.url);
      }
    })(marker, i));
  }
};
