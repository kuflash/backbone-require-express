'use strict';

require.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [
        'jquery',
        'underscore'
      ],
      exports: 'Backbone'
    }
  },
  paths: {
    'jquery': '../components/jquery/jquery',
    'underscore': '../components/underscore-amd/underscore',
    'backbone': '../components/backbone-amd/backbone'
  }
});

require([ 'app' ], function (App) {
  App.init();
});
