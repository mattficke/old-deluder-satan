var SchoolView = function(school) {
  this.school = school;
  this.$el = $("<div class='school'></div>");
  this.render();

  $(".schools").append(this.$el);
}

SchoolView.prototype = {
  render: function() {
    var self = this;

    self.getComments(self)

    // add school name & address to view
    $("#schoolLabel").html(self.school.name)
    $("#addressLabel").html(self.school.address)

    // add school health report data to view
    self.school.fetchHealthReport().then(function(report){
      $("#riskLabel").html(report.riskCategory)
      $("#criticalLabel").html(report.numberCritical)
      $("#noncriticalLabel").html(report.numberNoncritical)
    });

    // create comment click event handler
    $("input.create-comment").on("click", function(){
      event.preventDefault()
      var data = {
        body: $("input[name='body']").val(),
        userId: user.id,
        schoolId: self.school.id
      }
      self.school.postComment(data)
        .then(function(){
          self.getComments(self); //re-draw school page with data from server
        })
    }); // (/create comment)

  },
  getComments: function(self) {
    var commentDiv = $(".comment")
    commentDiv.empty();
    $(".comment-field").val("")

    // add comments to view
    self.school.fetchComments().then(function(response){
      user = response.user
      self.appendComments(response);
    });
  },
  appendComments: function(response) {
    response.comments.forEach(function(comment){
      var commentView = new CommentView(comment);
    })
  }
}
