var User = function(info) {
  this.username = info.username;
  this.id = info.id;
}

User.fetchOne = function(id) {
  var request = $.getJSON('/users/' + id)
    .then(function(response){
      var user = new User(response);
      return user;
    }).fail(function(response){
      console.log("JS failed to load");
    });
    return request;
};
