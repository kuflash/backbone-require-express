'use strict';

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'public/js/{,*/}*.js',
        '!public/js/vendor/*'
      ]
    },
    express: {
      options: {
        port: 1337
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    connect: {
      test: {
        options: {
          port: 1337,
          base: 'test'
        }
      }
    },
    watch: {
      express: {
        files: [
          'server.js',
          'public/js/{,*/}*.js'
        ],
        tasks: ['express:dev'],
        options: {
          nospawn: true
        }
      },
      livereload: {
        files: [
          'public/*.html',
          'public/css/*.css',
          'public/js/{,*/}*.js',
          'public/js/templates.js',
          'public/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ],
        options: {
          livereload: true
        }
      },

      less: {
        files: ['public/less/{,*/}*.less'],
        tasks: ['less:production']

      },

      jst: {
        files: ['public/js/templates/{,*/}*.ejs'],
        tasks: ['jst']
      }
    },

    less: {
      development: {
        options: {
          paths: ['public/css/']
        },
        files: {
          'public/css/main.css': 'public/less/main.less'
        }
      },
      production: {
        options: {
          paths: ['public/css/'],
          yuicompress: true
        },
        files: {
          'public/css/main.css': 'public/less/main.less'
        }
      }
    },

    clean: {
      dev: ['public/css', 'public/js/templates.js'],
      dist: ['public/css', 'public/js/templates.js', 'dist/*']
    },
    requirejs: {
      dist: {
        options: {
          baseUrl: 'public/js',
          optimize: 'none',
          paths: {
            'templates': 'templates'
          },
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true
        }
      }
    },
    useminPrepare: {
      html: 'public/index.html',
      options: {
        dest: 'dist/public'
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/css/{,*/}*.css'],
      options: {
        dirs: ['dist/public']
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/public/css/main.css': ['public/css/main.css']
        }
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public',
          src: '*.html',
          dest: 'dist/public'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'dist/public/img'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'public',
          src: [
            '*.{ico,txt}',
            'img/{,*/}*.{webp,gif,png,svg}'
          ],
          dest: 'dist/public'
        },
        {
          expand: true,
          src: ['server.js'],
          dest: 'dist'
        },
        {
          expand: true,
          src: ['views/**/*', 'routes/**/*', 'controllers/**/*'],
          dest: 'dist'
        }]
      }
    },
    jst: {
      options: {
        amd: true
      },
      compile: {
        files: {
          'public/js/templates.js': ['public/js/templates/*.ejs']
        }
      }
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');


  grunt.registerTask('build', [
    'clean:dist',
    'jst',
    'less:production',
    'useminPrepare',
    'requirejs',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'usemin'
  ]);

  grunt.registerTask('server', [
    'clean:dev',
    'jst',
    'less:development',
    'express:dev',
    'watch'
  ]);

  grunt.registerTask('test', [
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

};
