var School = function(info) {
  this.name = info.name;
  this.address = info.address;
  this.id = info.id;
}
// i really like that you made class methods.
School.fetch = function() {
  var request = $.getJSON('/schools')
    .then(function(response) {
      var schools = [];
      for(var i=0; i<response.length; i++) {
        schools.push(new School(response[i]));
      }
      return schools;
    })
    .fail(function(response){
      console.log("JS failed to load");
    });
    return request;
};

School.fetchOne = function(id) {
  var request = $.getJSON('/schools/' + id)
    .then(function(response) {
      var school = new School(response)
      // console.log(school)
      return school
    })
    return request
}

School.prototype = {
  fetchHealthReport: function() {
    var url = '/schools/' + this.id + '/health-report';
    var request = $.getJSON(url)
      .then(function(response){
        var healthReport = response;
        // for(var i=0; i<response.length; i++) {
        //   healthReports.push(new HealthReport(response[i]));
        // }
        return healthReport;
      })
      .fail(function(response){
        console.log("JS failed to load");
      })
    return request;
  },

  // not sure what exactly is going on with comments here, looks good for the most part, would have to spend more time debugging why it only shows up occassionally.
  fetchComments: function() {
    var url = '/schools/' + this.id + '/comments';
    var request = $.getJSON(url)
      .then(function(response){
        var comments = [];
        var user = response.user;
        for(var i=0; i<response.comments.length; i++) {
          comments.push(new Comment(response.comments[i]));
        }
        return {comments: comments, user: user};
      })
      .fail(function(response){
        console.log("JS failed to load");
      })
    return request;
  },
  postComment: function(commentData) {
    var self = this;
    var url = '/comments'
    var request = $.ajax({
      url: url,
      method: 'POST',
      data: JSON.stringify(commentData),
      contentType: 'application/json'
    }).then(function(newComment){
      console.log(newComment)
    });
    return request;
  }
}
