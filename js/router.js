// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/login/LoginView',
  'views/header/HeaderView',
  'views/feed/FeedView',
], function($, _, Backbone, LoginView, HeaderView, FeedView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'login': 'showLogin',
      'home': 'showHome',
      
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:showLogin', function(){
   
      var loginView = new LoginView();
      loginView.render();
    });

    app_router.on('route:showHome', function(){
   
      var headerView = new HeaderView();
      headerView.render();
      
      var feedView = new FeedView();
      feedView.render();
    });

    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the home page 
       var headerView = new HeaderView();
       headerView.render();

       var feedView = new FeedView();
       feedView.render();
    });

    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
