define([
  'jquery',
  'underscore',
  'backbone',
  'models/user/UserModel',
  'text!templates/header/headerTemplate.html'
], function($, _, Backbone, UserModel, headerTemplate){

  var HeaderView = Backbone.View.extend({
    el: $("header"),

    initialize : function() {
     
      var that = this;
      that.bind("reset", that.clearView);
    },

    render: function(){
      var that = this;
      var options = {user_handle: 'its_ack'}
      user = new UserModel(options);
      var data = {};
      user.fetch({
        success: function(user, response) {
          data = user.toJSON();
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
