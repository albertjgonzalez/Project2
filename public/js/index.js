      //initialize map and center it//
      var map;
      var tMarker;
      var bMarker;
      var vMarker;
      var nMarker;
      var rMarker;
      var aMarker;
      var hMarker;
      
      
      
      
            
      function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: {lat: 28.5383, lng: -81.3792}
              });
      
      
      
      
          var geocoder = new google.maps.Geocoder();
          document.getElementById('submit').addEventListener('click', function() {
                   geocodeAddress(geocoder, map);
      
              });
      
      }
      
      
      function geocodeAddress(geocoder, resultsMap) {
           var address = document.getElementById('address').value;
              geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                  resultsMap.setCenter(results[0].geometry.location);
                  var marker = new google.maps.Marker({
                    zoom: 18,
                    map: resultsMap,
                    position: results[0].geometry.location
                  });
      
                   $("#address").val("");
      
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
      
      
                }
              });
            }
      
      //END initialize map and center it//
      
      
      //Neighborhood coloring//
      function neighbors(){
          
          var kml_url = "https://data.cityoforlando.net/api/geospatial/dpx3-qjrc?method=export&format=KML";    
          laBoundaries = new google.maps.KmlLayer({url: kml_url,map: map, zoom: 13});
      }
      //END Neighborhoods
      
      
      
      //ajax call for theft//
      function theft(){
      $.ajax({
          url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
          type: "GET",
          data: {
            "$limit" : 10000,
            status: "Mapped",
            "$q" : "2017",
            case_offense_category: "Theft",
            "$$app_token" : "QWmNPsTrdyvnpvmYSgTcxBVT0"
          }
      }).done(function(data) {
        console.log("Theft");
        console.log(data);
      
      $.each(data, function(i, entry) {
            tMarker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.location.coordinates[1], 
                                             entry.location.coordinates[0]),
            map: map,
            icon: '../markers/yellow_MarkerT.png',
                        
          });
        })
      })
      }
      
      
      //Homicide data
      
      function homicide(){
      $.ajax({
          url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
          type: "GET",
          data: {
            "$limit" : 10000,
            status: "Mapped",
            "$q" : "2017",
            case_offense_category: "Homicide",
            "$$app_token" : "QWmNPsTrdyvnpvmYSgTcxBVT0"
          }
      
      }).done(function(data) {
        
        console.log("Homicide");
        console.log(data);
      
                $.each(data, function(i, entry) {
                    var hMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(entry.location.coordinates[1], 
                                                         entry.location.coordinates[0]),
                        map: map,
                        icon: "../markers/red_MarkerH.png",
                      });
        })
      })
      
      }
      
      //END Homicide
      
      
      
      
      
      //ajax call for Assault data//
      function assault(){
      $.ajax({
          url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
          type: "GET",
          data: {
            "$limit" : 10000,
            status: "Mapped",
            "$q" : "2017",
            case_offense_category: "Assault",
            "$$app_token" : "QWmNPsTrdyvnpvmYSgTcxBVT0"
          }
      
      }).done(function(data) {
        
        console.log("Assault");
        console.log(data);
      
                $.each(data, function(i, entry) {
                    var aMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(entry.location.coordinates[1], 
                                                         entry.location.coordinates[0]),
                        map: map,
                        icon: '../markers/green_MarkerA.png',
                      });
        })
      })
      }
      
      //END ajax call for Assault data//
      
      
      //ajax call for burglary data//
      function burglary(){
      $.ajax({
          url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
          type: "GET",
          data: {
            "$limit" : 10000,
            status: "Mapped",
            "$q" : "2017",
            case_offense_category: "Burglary",
            "$$app_token" : "QWmNPsTrdyvnpvmYSgTcxBVT0"
          }
      
      }).done(function(data) {
        
        console.log("Burglary");
        console.log(data);
      
                $.each(data, function(i, entry) {
                    var bMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(entry.location.coordinates[1], 
                                                         entry.location.coordinates[0]),
                        map: map,
                        icon: '../markers/purple_MarkerB.png',
                      });
        })
      })
      }
      
      //END ajax call for Burglary data//
      
      
      
      //ajax call for Narcotics data//
      function narcotics(){
      $.ajax({
          url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
          type: "GET",
          data: {
            "$limit" : 10000,
            status: "Mapped",
            "$q" : "2017",
            case_offense_category: "Narcotics",
            "$$app_token" : "QWmNPsTrdyvnpvmYSgTcxBVT0"
          }
      
      }).done(function(data) {
        
        console.log("Narcotics");
        console.log(data);
      
                $.each(data, function(i, entry) {
                    var bMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(entry.location.coordinates[1], 
                                                         entry.location.coordinates[0]),
                        map: map,
                        icon: '../markers/brown_MarkerN.png',
                    });
          })
      })
      }
       
      
      //END ajax call for Narcotics data//
      
      
      //ajax call for Vehicle Theft data//
      function vehicle(){
      $.ajax({
          url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
          type: "GET",
          data: {
            "$limit" : 10000,
            status: "Mapped",
            "$q" : "2017",
            case_offense_category: "Vehicle Theft",
            "$$app_token" : "QWmNPsTrdyvnpvmYSgTcxBVT0"
          }
      
      }).done(function(data) {
       
        console.log("Vehicle Theft");
        console.log(data);
      
                $.each(data, function(i, entry) {
                    var vMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(entry.location.coordinates[1], 
                                                         entry.location.coordinates[0]),
                        map: map,
                        icon: '../markers/orange_MarkerV.png',
                      });
        })
      })
      }
      
      //END ajax call for Vehicle Theft data//
      
      //ajax call for Robbery data//
      function robbery(){
      $.ajax({
          url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
          type: "GET",
          data: {
            "$limit" : 10000,
            status: "Mapped",
            "$q" : "2017",
            case_offense_category: "Robbery",
            "$$app_token" : "QWmNPsTrdyvnpvmYSgTcxBVT0"
          }
      
      }).done(function(data) {
        
        console.log("Robbery");
        console.log(data);
      
                $.each(data, function(i, entry) {
                    var rMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(entry.location.coordinates[1], 
                                                         entry.location.coordinates[0]),
                        map: map,
                        icon: '../markers/paleblue_MarkerR.png',
                      });
        })
      })
      }
      
      //END ajax call for Robbery data//
      
      
      
      
const divId = 'circles-1';
const percentage = 60;
const color = 'blue';
const myCircle = (divId,percentage,color) =>{
  Circles.create({
    id:                  divId,
    radius:              30,
    value:               percentage,
    maxValue:            100,
    width:               10,
    text:                function(value){return value + '%';},
    colors:              ['#4B253A',color],
    duration:            400,
    wrpClass:            'circles-wrp',
    textClass:           'circles-text',
    valueStrokeClass:    'circles-valueStroke',
    maxValueStrokeClass: 'circles-maxValueStroke',
    styleWrapper:        true,
    styleText:           true
  })
} 
myCircle(divId,percentage,color);