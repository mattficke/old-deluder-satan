$(document).ready(function() {

  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([38.90, -77.01], 12);

  School.fetch().then(function(schools){
    drawSchools(schools)
    renderSearch(schools)
  })

  $("#schooloptions").change(function() {
    $("#schooloptions option:selected").each(function(){
      var schoolId = $(this).val()
      School.fetchOne(schoolId).then(function(school){
        var view = new SchoolView(school)
      })
    })

  })

  function renderSearch(schools) {
    //string that will have an option added on each pass of the loop
    var options ='<option>Select a school &#9663;</option>';
    schools.forEach(function(school){
      //add an option html string with this school's id and name
      var id = school.id;
      var name = school.name;
      options += '<option value="'+id+'">'+name+'</option>';
    })
    //at the end of the loop, add the options string to the datalist
    document.getElementById('schooloptions').innerHTML = options;
  }

  function drawSchools(schools) {
    schools.forEach(function(school){

      var url = "https://api.mapbox.com/v4/geocode/mapbox.places/" + school.address + ", Washington, District of Columbia.json?proximity=-77,38.9&access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A"
      $.getJSON(url).then(function(response){
        var schoolMapList = L.mapbox.featureLayer({
            type: 'Feature',
            geometry: {
                type: 'Point',
                // lon, lat
                coordinates: [
                  response.features[0].center[0],
                  response.features[0].center[1]
                ]
            },
            properties: {
                title: school.name,
                description: school.address,
                identity: school.id,
                testdisplay: "this is a test",
                'marker-size': 'small',
                url: "http://en.wikipedia.org/wiki/Washington,_D.C."
            }
        }).addTo(map);

        schoolMapList.on('click', function(e){
          var schoolId = e.layer.feature.properties.identity
          School.fetchOne(schoolId).then(function(school){
            var view = new SchoolView(school)
          })
        })
      })
    })
  }
});
      //// Start Search
      function viewSchool(id){
        //make sure id is a number
        if (Number(id)){
            document.getElementById('searchbox').value = ""
          var url = "/schools/" + id + "/health-report"
          $.getJSON(url).then(function(response){
            console.log("The response is" + response)
            document.getElementById('schoolLabel').innerHTML = response.name;
            document.getElementById('addressLabel').innerHTML = response.address;
            document.getElementById('riskLabel').innerHTML = response.riskCategory;
            document.getElementById('criticalLabel').innerHTML =  response.numberCritical;
            document.getElementById('noncriticalLabel').innerHTML = response.numberNoncritical;
          })
        }
      }
      //// End Search
