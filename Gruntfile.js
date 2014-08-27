module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: ['js/libs/*.js', 'js/main.js', '!js/libs/modernizr2.7.0.custom.js', '!js/libs/jquery-1.10.2.min.js'],
        dest: 'js/build/main.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
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
    watch: {
      scripts: {
        files: ['js/libs/*.js', 'js/main.js'],
        tasks: ['uglify'],
      },
      images: {
        files: 'images/*.{png,jpg,gif}',
        tasks: ['imagemin'],
      },
      css: {
        files: '**/*.scss',
        tasks: ['compass', 'autoprefixer'],
      },
      options: {
        spawn: false,
        livereload: true,
      },
    },
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};