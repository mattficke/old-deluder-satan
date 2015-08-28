var SchoolView = function(school) {
  this.school = school;
  this.$el = $("<div class='school'></div>");
  this.render();

  $(".schools").append(this.$el);
}

SchoolView.prototype = {
  render: function() {
    var self = this;

    $("#schoolLabel").html(self.school.name)
    $("#addressLabel").html(self.school.address)

    self.school.fetchHealthReport().then(function(report){
      $("#riskLabel").html(report.riskCategory)
      $("#criticalLabel").html(report.numberCritical)
      $("#noncriticalLabel").html(report.numberNoncritical)
    })
    self.school.fetchComments().then(function(response){
      self.appendComments(response);
      if(response.user){
        self.appendCommentForm(self, response.user);
      }
    })
  },
  appendComments: function(response) {
    var commentDiv = $(".comments")
    commentDiv.empty();
    response.comments.forEach(function(comment){
      var commentView = new CommentView(comment);
    })
  },
  appendCommentForm: function(self, user){
    var commentDiv = $(".comments")
    commentDiv.append("<form class='comment-form'>");
    commentDiv.append("<input type='text' name='body' placeholder='comment'>")
    commentDiv.append("<input class='create-comment' type='submit'>")
    commentDiv.append("</form>")
    $("input.create-comment").on("click", function(){
      var data = {
        body: $("input[name='body']").val(),
        userId: user.id,
        schoolId: self.school.id
      }
      console.log(data)
      self.school.postComment(data)
        .then(function(){
          self.render();
        })
    })
  }
}
