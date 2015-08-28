var CommentView = function(comment){
  this.comment = comment;
  this.$el = $("<div class='comment'></div>");
  this.render();
};

CommentView.prototype ={
  render: function(){
    // we'll be adding event listeners later but will still need access to the Comment view in the event listener
    var self = this;
    // appending elements to the .$el property
    self.$el.html(self.commentTemplate(self.comment));
    // append the .$el to the div with class artists in our view.
    var commentDiv = $(".comments")
    commentDiv.append(self.$el);
  },
  commentTemplate: function(comment){
    var html = $("<div>");
    html.append("<h3>" + comment.body + "</h3>");
    console.log(comment.userId)
    User.fetchOne(comment.userId).then(function(user){
      html.append("<p>Posted by: " + user.username + "</p>");
    })
    return(html);
  }
};
