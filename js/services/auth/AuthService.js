define([
  'jquery',
  'underscore',
  'backbone',
  'models/user/UserModel',
], function($, _, Backbone, UserModel){

  let loggedUser;

  return {
    authenticate: function(user_handle, password){
      var options = {
        authenticate: true,
        user_handle: user_handle,
        password: password
      };
      user = new UserModel(options);
      var data = {};
      return new Promise((resolve, reject) => {
        user.fetch({
          type: "POST",
          success: function(user) {
            data = user.toJSON();
            loggedUser = data;
            console.log(data.auth_token);
            resolve(data);
          },
          error: function(error) {
            console.error("Error fetching data:", error);
            reject(error);
          }
        });
      });
    },

    getUser: function(){
      if (loggedUser) {
        return loggedUser;
      }
    }
  };
});
