define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/login/loginTemplate.html',
  'services/auth/AuthService'
], function($, _, Backbone, loginTemplate, AuthService){

  var LoginView = Backbone.View.extend({
    el: $("#container"),

    initialize : function() {
     
      var that = this;
      that.bind("reset", that.clearView);
    },

    render: function(){
      var that = this;

      this.$el.html(loginTemplate);
      this.loadCustomJS();
    },

    loadCustomJS: function() {
      $('#login-form-signin-button').click(function() {
        var that = this;

        let user_handle = $('#username-input').val();
        let password = $('#password-input').val();

        // AuthService.authenticate(user_handle, password).then((user) => {
        AuthService.authenticate('johnsmith', 'johnsmith').then((user) => {
          window.location.href = "/#/home";
          // location.reload();
        });
      });
    }
  });

  return LoginView;
});
