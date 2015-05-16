var grunt = require('grunt');
var autoprefixer = require('autoprefixer-core');
require('load-grunt-tasks')(grunt);

grunt.initConfig({

  sass: {
    options: {
      outputStyle: 'expanded'
    },
    dist: {
      files: {
        'dist/css/compiled.css': 'src/scss/main.scss'
      }
    }
  },

  postcss: {
    options: {
      map: false,
      processors: [
        autoprefixer({ browsers: ['last 2 version'] })
      ]
    },
    dist: {
      files: {
        'dist/css/compiled-prefixed.css': 'dist/css/compiled.css'
      }
    }
  },

  cssmin: {
    dist: {
      files: {
        'dist/css/compiled-prefixed-minified.css': 'dist/css/compiled-prefixed.css'
      }
    }
  },

  clean: {
    css: {
      src: 'dist/css/*'
    },
    dist: {
      src: 'dist'
    }
  },

  watch: {
    css: {
      files: 'src/scss/*.scss',
      tasks: ['style']
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
          'dist/css/compiled-prefixed-minified.css'
        ]
      }
    }
  }
});

grunt.registerTask('style', ['clean:css', 'sass', 'postcss', 'cssmin']);
grunt.registerTask('dev', ['browserSync', 'watch']);
grunt.registerTask('default', ['dev']);