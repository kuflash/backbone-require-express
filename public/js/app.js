define([
  'jquery',
  'underscore',
  'backbone',
  'router'
], function ($, _, Backbone, Router) {

  'use strict';

  var init = function () { Router.init(); };

  return { init: init };

});