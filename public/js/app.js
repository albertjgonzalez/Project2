    //initialize map and center it//
    var map;
    var tMarker;
    var vMarker;
    var nMarker;
    var rMarker;
    var aMarker;
    var hMarker;
    var bMarker;

    var markers = {
      homicide: [],
      theft: [],
      robbery: [],
      vehicle: [],
      assault: [],
      narcotics: [],
      burglary: []
    };

    var laBoundaries;



    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 28.5383, lng: -81.3792 }
      });

      var autocomplete = new google.maps.places.Autocomplete(address);
      autocomplete.bindTo('bounds', map);
      autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

      var geocoder = new google.maps.Geocoder();
      document.getElementById('button').addEventListener('click', function () {
        geocodeAddress(geocoder, map);

      });


    }

    function geocodeAddress(geocoder, resultsMap) {
      var address = document.getElementById('address').value;
      console.log(address);
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
          resultsMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            zoom: 18,
            map: resultsMap,
            position: results[0].geometry.location,
            title: "Your new home"
          });

          console.log('Marker created.')

          $("#address").val("");

        } else {
          alert('Geocode was not successful for the following reason: ' + status);


        }
      });
    }


    //END initialize map and center it//


    // the !check for all the input buttons, will make the AJAX call//
    $("#homicide").change(function () {
      if ($("#homicide").prop("checked")) {
        homicide();
        console.log('Logging markers:');
        console.log(markers)
      } else {
        removeHmarkers()
      }
    });

    $("#theft").change(function () {
      if ($("#theft").prop("checked")) {
        theft();
      } else {
        removeTmarkers()
      }
    });

    $("#burglary").change(function () {
      if ($("#burglary").prop("checked")) {
        burglary();
      } else {
        removeBmarkers()
      }
    });

    $("#robbery").change(function () {
      if ($("#robbery").prop("checked")) {
        robbery();
      } else {
        removeRmarkers()
      }
    });

    $("#vehicle").change(function () {
      if ($("#vehicle").prop("checked")) {
        vehicle();
      } else {
        removeVmarkers()
      }
    });

    $("#assault").change(function () {
      if ($("#assault").prop("checked")) {
        assault();
      } else {
        removeAmarkers()
      }
    });

    $("#narcotics").change(function () {
      if ($("#narcotics").prop("checked")) {
        narcotics();
      } else {
        removeNmarkers()
      }
    });

    $("#neighbors").change(function () {
      if ($("#neighbors").prop("checked")) {
        neighbors();
      } else {
        laBoundaries.setMap(null);
      }
    });

    //delete button//
    $("#delete").click(function () {
      removeMarkers()
    });
    // END the !check for all the input buttons, will make the AJAX call//



    function removeHmarkers() {
      for (var i = 0; i < markers.homicide.length; i++) {
          markers.homicide[i].setMap(null);
        }
    }

    function removeTmarkers() {
      for (var i = 0; i < markers.theft.length; i++) {
          markers.theft[i].setMap(null);
        }
    }

      function removeBmarkers() {
      for (var i = 0; i < markers.burglary.length; i++) {
          markers.burglary[i].setMap(null);
        }
    }

        function removeRmarkers() {
      for (var i = 0; i < markers.robbery.length; i++) {
          markers.robbery[i].setMap(null);
        }
    }

    function removeVmarkers() {
      for (var i = 0; i < markers.vehicle.length; i++) {
          markers.vehicle[i].setMap(null);
        }
    }

    function removeAmarkers() {
      for (var i = 0; i < markers.assault.length; i++) {
          markers.assault[i].setMap(null);
        }
    }

    function removeNmarkers() {
      for (var i = 0; i < markers.narcotics.length; i++) {
          markers.narcotics[i].setMap(null);
        }
    }



    //Neighborhood coloring//
    function neighbors() {

      var kml_url = "https://data.cityoforlando.net/api/geospatial/dpx3-qjrc?method=export&format=KML";
      laBoundaries = new google.maps.KmlLayer({ url: kml_url, map: map, zoom: 13 });

    }
    //END Neighborhoods



    //ajax call for theft//
    function theft() {
      $.ajax({
        url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
        type: "GET",
        data: {
          "$limit": 20000,
          status: "Mapped",
          "$q": "2017",
          case_offense_category: "Theft",
          "$$app_token": "QWmNPsTrdyvnpvmYSgTcxBVT0"
        }
      }).done(function (data) {
        console.log("Theft");
        console.log(data);

        $.each(data, function (i, entry) {
          tMarker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.location.coordinates[1],
              entry.location.coordinates[0]),
            map: map,
            icon: 'images/yellow_MarkerT.png',
          });
          markers.theft.push(tMarker);

        })
      })
    }


    //Homicide data

    function homicide() {
      $.ajax({
        url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
        type: "GET",
        data: {
          "$limit": 10000,
          status: "Mapped",
          "$q": "2017",
          case_offense_category: "Homicide",
          "$$app_token": "QWmNPsTrdyvnpvmYSgTcxBVT0"
        }

      }).done(function (data) {

        console.log("Homicide");
        console.log(data);

        $.each(data, function (i, entry) {
          var hMarker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.location.coordinates[1],
              entry.location.coordinates[0]),
            map: map,
            icon: 'images/red_MarkerH.png',
          });
          markers.homicide.push(hMarker);
        })
      })

    }

    //END Homicide





    //ajax call for Assault data//
    function assault() {
      $.ajax({
        url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
        type: "GET",
        data: {
          "$limit": 10000,
          status: "Mapped",
          "$q": "2017",
          case_offense_category: "Assault",
          "$$app_token": "QWmNPsTrdyvnpvmYSgTcxBVT0"
        }

      }).done(function (data) {

        console.log("Assault");
        console.log(data);

        $.each(data, function (i, entry) {
          var aMarker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.location.coordinates[1],
              entry.location.coordinates[0]),
            map: map,
            icon: 'images/green_MarkerA.png',
          });
          markers.assault.push(aMarker);
        })
      })
    }

    //END ajax call for Assault data//


    //ajax call for burglary data//
    function burglary() {
      $.ajax({
        url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
        type: "GET",
        data: {
          "$limit": 10000,
          status: "Mapped",
          "$q": "2017",
          case_offense_category: "Burglary",
          "$$app_token": "QWmNPsTrdyvnpvmYSgTcxBVT0"
        }

      }).done(function (data) {

        console.log("Burglary");
        console.log(data);

        $.each(data, function (i, entry) {
          var bMarker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.location.coordinates[1],
              entry.location.coordinates[0]),
            map: map,
            icon: 'images/purple_MarkerB.png',
          });
          markers.burglary.push(bMarker);
        })
      })
    }

    //END ajax call for Burglary data//



    //ajax call for Narcotics data//
    function narcotics() {
      $.ajax({
        url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
        type: "GET",
        data: {
          "$limit": 10000,
          status: "Mapped",
          "$q": "2017",
          case_offense_category: "Narcotics",
          "$$app_token": "QWmNPsTrdyvnpvmYSgTcxBVT0"
        }

      }).done(function (data) {

        console.log("Narcotics");
        console.log(data);

        $.each(data, function (i, entry) {
          var nMarker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.location.coordinates[1],
              entry.location.coordinates[0]),
            map: map,
            icon: 'images/brown_MarkerN.png',
          });
          markers.narcotics.push(nMarker);
        })
      })
    }


    //END ajax call for Narcotics data//


    //ajax call for Vehicle Theft data//
    function vehicle() {
      $.ajax({
        url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
        type: "GET",
        data: {
          "$limit": 10000,
          status: "Mapped",
          "$q": "2017",
          case_offense_category: "Vehicle Theft",
          "$$app_token": "QWmNPsTrdyvnpvmYSgTcxBVT0"
        }

      }).done(function (data) {

        console.log("Vehicle Theft");
        console.log(data);

        $.each(data, function (i, entry) {
          var vMarker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.location.coordinates[1],
              entry.location.coordinates[0]),
            map: map,
            icon: 'images/orange_MarkerV.png',
          });
          markers.vehicle.push(vMarker);
        })
      })
    }

    //END ajax call for Vehicle Theft data//

    //ajax call for Robbery data//
    function robbery() {
      $.ajax({
        url: "https://data.cityoforlando.net/resource/6qd7-sr7g.json",
        type: "GET",
        data: {
          "$limit": 10000,
          status: "Mapped",
          "$q": "2017",
          case_offense_category: "Robbery",
          "$$app_token": "QWmNPsTrdyvnpvmYSgTcxBVT0"
        }

      }).done(function (data) {

        console.log("Robbery");
        console.log(data);

        $.each(data, function (i, entry) {
          var rMarker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.location.coordinates[1],
              entry.location.coordinates[0]),
            map: map,
            icon: 'images/paleblue_MarkerR.png',
          });
          markers.robbery.push(rMarker);
        })
      })
    }

//END ajax call for Robbery data//



//Crime search for chart

let selectedCity = 'jacksonville'
let orlandoStat;
let selectedStat;

const createCompareChart = () =>{
  var compare = document.getElementById('compareChart').getContext('2d');
  var perPopulationChart = new Chart(compare, {
    // The type of chart we want to create
    type: 'bar',
    responsive: true,
    // The data for our dataset
    data: {
        labels: ["Orlando","Selected City"],
        datasets: [{
          data: [orlandoStat,selectedStat],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',

        ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',

        ]
      }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
  });
}

const createOlandoCharts = () =>{
  $.ajax('/stats', {
    type: "GET", 
    data: {
      city:'orlando',
      // city2:selectedCity
    }
  }).then(
    function(stats){
      orlandoStat = stats.population.replace(/,/g, "")/stats.theft.replace(/,/g, "")
      var oChart1 = document.getElementById('orlandoChart1').getContext('2d');
      var oChart2 = document.getElementById('orlandoChart2').getContext('2d');
      var orlandoChart1 = new Chart(oChart1, {
          // The type of chart we want to create
          type: 'pie',
      
          // The data for our dataset
          data: {
              labels: ["Homicide","Robbery","Vehicle Theft","Assault","Rape","Arson"],
              datasets: [{
                data: [stats.homicide.replace(/,/g, ""), stats.robbery.replace(/,/g, ""), stats.vehicleTheft.replace(/,/g, ""),stats.assault.replace(/,/g, ""), stats.rape.replace(/,/g, ""),stats.arson.replace(/,/g, "")],
                backgroundColor: [
                    'rgba(176, 34, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                  'rgba(176, 34, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
              ],
                backgroundColor: [
                  'rgba(176, 34, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
              ]
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
        });

      
      var orlandoChart2 = new Chart(oChart2, {
        // The type of chart we want to create
        type: 'pie',
    
        // The data for our dataset
        data: {
            labels: ["Theft","Violent Crime","Property Crime", "Burglary"],
            datasets: [{
              data: [stats.theft.replace(/,/g, ""),stats.violentCrime.replace(/,/g, ""),stats.propertyCrime.replace(/,/g, ""),stats.burglary.replace(/,/g, "")],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
            ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
            ]
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
      });
      createSelectedCharts()
    }
  );
};

const createSelectedCharts = () =>{
  $.ajax('/stats', {
    type: "GET", 
    data: {
      city:selectedCity,
      // city2:selectedCity
    }
  }).then(
    function(stats){
      selectedStat = stats.population.replace(/,/g, "")/stats.theft.replace(/,/g, "")
      var selectedChart1 = document.getElementById('selectedChart1').getContext('2d');
      var selectedChart2 = document.getElementById('selectedChart2').getContext('2d');
      var selectedCityChart1 = new Chart(selectedChart1, {
          // The type of chart we want to create
          type: 'pie',
      
          // The data for our dataset
          data: {
              labels: ["Homicide","Robbery","Vehicle Theft","Assault","Rape","Arson"],
              datasets: [{
                data: [stats.homicide.replace(/,/g, ""), stats.robbery.replace(/,/g, ""), stats.vehicleTheft.replace(/,/g, ""),stats.assault.replace(/,/g, ""), stats.rape.replace(/,/g, ""),stats.arson.replace(/,/g, "")],
                backgroundColor: [
                    'rgba(176, 34, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                  'rgba(176, 34, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
              ],
                backgroundColor: [
                  'rgba(176, 34, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
              ]
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
      var selectedCityChart2 = new Chart(selectedChart2, {
        // The type of chart we want to create
        type: 'pie',
    
        // The data for our dataset
        data: {
            labels: ["Theft","Violent Crime","Property Crime", "Burglary"],
            datasets: [{
              data: [stats.theft.replace(/,/g, ""),stats.violentCrime.replace(/,/g, ""),stats.propertyCrime.replace(/,/g, ""),stats.burglary.replace(/,/g, "")],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
            ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
            ]
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
      });
      createCompareChart()
    }
    
  );
};


createOlandoCharts();



   
