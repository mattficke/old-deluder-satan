$(document).ready(function() {

  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([38.90, -77.01], 12);

  School.fetch().then(function(schools){
    //string that will have an option added on each pass of the loop
    var options ='';

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

      //add an option html string with this school's id and name
      var id = school.id;
      var name = school.name;
      options += '<option value="'+id+'">'+name+'</option>';

      //at the end of the loop, add the options string to the datalist
      document.getElementById('schooloptions').innerHTML = options;

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


        schoolMapList.on('click', function(e){
          var schoolId = e.layer.feature.properties.identity
          var url = "/schools/" + schoolId + "/health-report"
          var schoolRequest = $.getJSON(url).then(function(response){
            console.log(response)
            schoolname = response.name
            schoolid = response.id
            schooladdress = response.address
            schoolriskcat = response.riskCategory
            schoolcrit = response.numberCritical
            schoolnoncrit = response.numberNoncritical
          })
          var view = new SchoolView(schoolRequest)
          console.log(schoolname + schoolid + schooladdress)

          $("#schoolLabel").html(schoolname)
          $("#addressLabel").html(schooladdress)
          $("#riskLabel").html(schoolriskcat)
          $("#criticalLabel").html(schoolcrit)
          $("#noncriticalLabel").html(schoolnoncrit)
        })
      })
    })
  })
});



// #map {
// 	background-color: white;
// }
//
//
// @media (min-width: 0em) {
// 	#map {
// 	    width: 100%;
// 			height: 50%;
// 	}
//
// 	#info-panel {
// 		width: 100%;
// 		height: 20em;
// 	}
//
// }
//
// @media(min-width: 20em) {
//     #map {
//         @extend .column-lg-7;
//     }
// }











///// CSS /////

/* -----------------------------------*/
/* ---           COLUMNS           ---*/
/* -----------------------------------*/

.column-1 { width: 8.333%; }
.column-2 { width: 16.66%; }
.column-3 { width: 25%; }
.column-4 { width: 33.33%; }
.column-5 { width: 41.66%; }
.column-6 { width: 50%; }
.column-7 { width: 58.33%; }
.column-8 { width: 66.66%; }
.column-9 { width: 75%; }
.column-10 { width: 83.33%; }
.column-11 { width: 91.66%; }
.column-12 { width: 100%; }

/* -----------------------------------*/
/* ---           CORE              ---*/
/* -----------------------------------*/

body {
  background-color: #ffffff;
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizelegibility;
}


.user-bar {
	width: 100%;
	height: 3em;
	background-color: #FAFCFC;
	text-align: center;
	-webkit-box-shadow: 0 8px 6px -6px black;
	   -moz-box-shadow: 0 8px 6px -6px black;
	        box-shadow: 0 8px 6px -6px black;
}

.sign-in, .sign-out, .sign-up {
	text-decoration: none;
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	font-size: 1.2em;
	padding: 0 3em;
	line-height: 2.4em;
	color: #7F7F7F;
}

.sign-in {
	border-right: 2px solid #ecf0f1;
}

#schooloptions {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background-color: white;
	width: 100%;
	height: 4em;
	padding: 1em 0;
	font-family: "Roboto", sans-serif;
	font-size: 1.1em;
	font-weight: 300;
	border: 1px solid #ecf0f1;
	border-radius: 0;
}

#schooloptions:nth-child(n) {
	font-family: "Roboto", sans-serif;
	color: #7F7F7F;
	padding-left: 1.4em;
}


.name-and-address p, h2 {
	font-size: 2em;
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	color: #7F7F7F;
	margin: 0 0 1em 1em;
}

.flexcontain {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	text-align: center;
	padding: 0 1em;
}

.flexchild {
	flex: 1 1 3em;
	border: 1px solid #BFBFBF;
	margin: .4em;
	border-radius: .4em;
}

.flexchild p {
	font-size: 4em;
	font-weight: 700;
	font-family: 'Roboto', sans-serif;
	color: #507292;
	margin: 0 auto;
}

.flexlabel {
	margin: 1em 0;
}

#infoPanel {
	margin: 0 auto;
}

.label {
	margin: 2em 0 1em 2em;
}

#infoPanel #schoolLabel {
	font-size: 2em;
	font-weight: 300;
	font-family: 'Roboto', sans-serif;
	text-transform: lowercase;
	color: #507292;
}

#infoPanel #addressLabel {
	font-size: 2em;
	font-weight: 300;
	font-family: 'Roboto', sans-serif;
	text-transform: lowercase;
	color: #507292;
}

#infoPanel h4 {
	font-family: 'Roboto', sans-serif;
	color: #BFBFBF;
	font-size: .8em;
	font-weight: 500;
	letter-spacing: 0.1em;
	text-transform: uppercase;
}

#infoPanel h5 {
	font-family: 'Roboto', sans-serif;
	font-size: .7em;
	font-weight: 500;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: #888888;
}

/* -----------------------------------*/
/* ---           RESETS            ---*/
/* -----------------------------------*/

/*
http://meyerweb.com/eric/tools/css/reset/
v2.0 | 20110126
License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* apply a natural box layout model to all elements, but allowing components to
/* change */

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
