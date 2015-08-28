var CommentView = function(comment){
  this.comment = comment;
  this.$el = $("<ul class='comment'></ul>");
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
    commentDiv.prepend(self.$el);
  },
  commentTemplate: function(comment){
    var html = $("<li class='comment-body'>"+ comment.body + "</li>");
    User.fetchOne(comment.userId).then(function(user){
      html.append("<li class='comment-author'>Posted by: " + user.username + "</li>");
    })
    return(html);
  }
};
