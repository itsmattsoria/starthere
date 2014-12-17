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
          'js/build/main.min.js': ['js/jquery-1.11.1.js','js/libs/*.js', 'js/main.js']
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
          style: 'expanded',
          sourcemap: 'none'
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
          'svg-defs.svg': ['svgs/*.svg']
        },
      },
    },
    watch: {
      scripts: {
        files: ['js/libs/*.js', 'js/main.js'],
        tasks: ['uglify'],
        options: {
          livereload: true,
        },
      },
      images: {
        files: 'images/*.{png,jpg,gif}',
        tasks: ['imagemin'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: true,
        },
      },
      svgs: {
        files: 'svgs/*.svg',
        tasks: ['svgmin', 'svgstore'],
        options: {
          livereload: true,
        },
      }
    },
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};