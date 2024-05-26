define([
  'jquery',
  'underscore',
  'backbone',
  'collections/feedposts/FeedPostsCollection',
  'collections/postupvotes/PostUpvotesCollection',
  'collections/comments/CommentsCollection',
], function($, _, Backbone, FeedPostsCollection, PostUpvotesCollection, CommentsCollection){
  return {
    functionOne: function(title){
      alert("Hello, world. I'm functionOne. The post title is " + title);
    },

    functionTwo: function(){
      alert("Hello, world. I'm functionTwo.");
    }
  };
});
