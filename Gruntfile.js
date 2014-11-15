module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        options: {
          beautify: true,
          mangle: false
        },
        files: {
          'js/build/main.min.js': ['js/libs/*.js', 'js/main.js']
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/main.css': 'sass/main.scss'
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'css/main.css': 'css/main.css'
        }
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'svgs/',
          src: ['**/*.svg'],
          dest: 'svgs/'
        }]
      }
    },
    svgstore: {
      options: {
        prefix: 'icon-'
      },
      default : {
        files: {
          'inc/svg-defs.svg': ['svgs/*.svg']
        },
      },
    },
    watch: {
      scripts: {
        files: ['js/libs/*.js', 'js/main.js'],
        tasks: ['uglify'],
      },
      svgs: {
        files: 'svgs/*.svg',
        tasks: ['svgmin', 'svgstore'],
      },
      images: {
        files: 'images/*.{png,jpg,gif}',
        tasks: ['imagemin'],
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'autoprefixer'],
      },
    },
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};