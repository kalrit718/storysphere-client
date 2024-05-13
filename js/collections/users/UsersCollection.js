// define([
//   'underscore',
//   'backbone',
//   'models/user/UserModel'
// ], function(_, Backbone, UserModel){

//   var UsersCollection = Backbone.Collection.extend({
      
//       model: UserModel,

//       initialize : function(models, options) {},
      
//       url : function() {
//         return 'http://localhost/storysphere-server/Users?user_handle=kalrit718';
//       },
    
//       parse : function(data) {
//           var uniqueArray = [data.data];
//           return uniqueArray;
//       }
     
//   });

//   return UsersCollection;

// });