module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          './public/css/main.css': './apps/css/main.scss'
        }
      }
    },
    bower_concat: {
      main: {
        dest: 'public/build.js',
        cssDest: 'public/build.css'
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'apps/',
            src: 'js/**/*.js',
            dest: 'public/',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'apps/',
            src: 'partials/**/*.html',
            dest: 'public/',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'apps/',
            src: 'images/*.jpg',
            dest: 'public/',
            filter: 'isFile'
          }
        ]
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.registerTask('build:prod', ['bower_concat','sass', 'copy']);
  grunt.registerTask('default', ['sass']);
};
