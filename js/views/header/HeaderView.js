define([
  'jquery',
  'underscore',
  'backbone',
  'models/user/UserModel',
  'text!templates/header/headerTemplate.html',
  'services/auth/AuthService'
], function($, _, Backbone, UserModel, headerTemplate, AuthService){

  var HeaderView = Backbone.View.extend({
    el: $("header"),

    initialize : function() {
     
      var that = this;
      that.bind("reset", that.clearView);
    },

    render: function(){
      var that = this;
      let userData = AuthService.getUser();
      var options = {
        get_user: true,
        user_handle: userData.user_handle
      };
      user = new UserModel(options);
      var data = {};
      user.fetch({
        headers: {
          "Authorization": `Bearer ${userData.auth_token}`
        },
        success: function(userData, response) {
          data = userData.toJSON();
          console.log(data);
          return data;
        },
        error: function(user, error) {
          console.error("Error fetching data:", error);
        }
      })
      .then((data) => {
        var headerCompiledTemplate = _.template( headerTemplate, data);
        this.$el.html(headerCompiledTemplate);
      });
    }
  });

  return HeaderView;
  
});
