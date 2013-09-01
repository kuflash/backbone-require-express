define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

  'use strict';

  var AppRouter = Backbone.Router.extend({

    routes: {
      ''        : 'index',
      '*action' : 'def'
    },

    index: function () {
      console.log('index');
    },

    def: function ( action ) {
      console.log('default');
    }

  });

  var init = function () {

    var appRouter = new AppRouter();

    Backbone.history.start();

  };

  return { init: init };
});