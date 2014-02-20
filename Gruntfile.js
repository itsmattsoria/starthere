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
    watch: {
      all: {
        files: ['js/libs/*.js', 'js/main.js', 'images/*.{png,jpg,gif}'],
        tasks: ['uglify', 'imagemin'],
      },
      options: {
        spawn: false,
      },
    },
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-uncss');

  // Default task(s).
  grunt.registerTask('default', ['watch', 'uglify', 'imagemin']);

};