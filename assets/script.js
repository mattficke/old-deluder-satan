$(document).ready(function() {

  // draw map
  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([38.90, -77.01], 12);

  // find all schools
  School.fetch().then(function(schools){
    drawSchools(schools)
    renderSearch(schools)
  })

  // triggered if a school is selected from the drop-down menu
  $("#schooloptions").change(function() {
    $("#schooloptions option:selected").each(function(){
      var schoolId = $(this).val()
      // render selected school
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
    //at the end of the loop, add the options string to the list
    document.getElementById('schooloptions').innerHTML = options;
  }

  // mark each school on the map with a pin
  function drawSchools(schools) {
    schools.forEach(function(school){
// hmm this can be dangerous. Whenever we start to make ajax calls in a loop,
// tread carefully. Depending on whats going with references to any call backs
// it could make debugging more difficult as well as be confusing with respect
// to in which sequence code is executing off the stack. Trying to think of a better way,
// but i'm at a loss if its just client side. One way would be to have a back end group all
// of the data together as a get request and then execute a promise on that AJAX response
      // geocode from school address
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
                'marker-color': '#507292',
                url: "http://en.wikipedia.org/wiki/Washington,_D.C."
            }
        }).addTo(map);

        schoolMapList.on('click', function(e){
          var schoolId = e.layer.feature.properties.identity
          $("#schooloptions").val(schoolId.toString())
          School.fetchOne(schoolId).then(function(school){
            var view = new SchoolView(school)
          })
        })
      })
    })
  }
});
