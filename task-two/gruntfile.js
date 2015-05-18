var grunt = require('grunt');

grunt.initConfig({

  browserify: {
    options: {
      transform: ['babelify']
    },
    dist: {
      files: {
        'dist/js/bundled.js': 'src/js/index.js'
      }
    }
  },

  uglify: {
    dist: {
      files: {
        'dist/js/bundled-uglified.js': 'dist/js/bundled.js'
      }
    }
  },

  eslint: {
    js: {
      src: ['src/js/**/*.js']
    }
  },

  clean: {
    js: {
      src: 'dist/js/*'
    },
    dist: {
      src: 'dist'
    }
  },

  watch: {
    js: {
      files: 'src/js/*.js',
      tasks: ['js']
    }
  },

  browserSync: {
    options: {
      watchTask: true,
      server: './'
    },
    dev: {
      bsFiles: {
        src: [
          'dist/js/bundled-uglified.js'
        ]
      }
    }
  }
});

grunt.loadNpmTasks('gruntify-eslint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browser-sync');
grunt.loadNpmTasks('grunt-browserify');

grunt.registerTask('js', ['clean', 'eslint', 'browserify', 'uglify']);
grunt.registerTask('dev', ['browserSync', 'watch']);
grunt.registerTask('default', ['dev']);
