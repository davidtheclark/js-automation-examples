var grunt = require('grunt');
var autoprefixer = require('autoprefixer-core');

grunt.initConfig({

  // Compile SCSS to CSS
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

  // Add vendor prefixes to compiled CSS
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

  // Minify compiled, prefixed CSS
  cssmin: {
    dist: {
      files: {
        'dist/css/compiled-prefixed-minified.css': 'dist/css/compiled-prefixed.css'
      }
    }
  },

  // Cleanup dist/ files
  clean: {
    css: {
      src: 'dist/css/*'
    },
    dist: {
      src: 'dist'
    }
  },

  // Re-compile styles on save
  watch: {
    css: {
      files: 'src/scss/*.scss',
      tasks: ['style']
    }
  },

  // Re-inject styles into the browser when they change
  browserSync: {
    options: {
      watchTask: true,
      server: './'
    },
    dev: {
      bsFiles: {
        src: [
          'dist/css/compiled-prefixed-minified.css',
          'index.html'
        ]
      }
    }
  }
});

// Load tasks (notice non-standard pattern)
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browser-sync');

// Register commands that sequentially, synchronously run other others
grunt.registerTask('style', ['clean:css', 'sass', 'postcss', 'cssmin']);
grunt.registerTask('dev', ['browserSync', 'watch']);
grunt.registerTask('default', ['dev']);
