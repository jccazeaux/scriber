module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('./package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
          ' * https://github.com/jccazeaux/scriber\n' +
          ' * Copyright (c) 2014 Jean-Christophe Cazeaux.\n' +
          ' * Licensed under the MIT license.\n' +
          ' */'
      },
      build: {
        files: {
          'dist/scriber.min.js': ['lib/scriber.js']
        }
      }
    },

    jasmine: {
      tests: {
        src: ['src/scriber.js'],
        options: {
          specs: 'tests/*Spec.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jasmine']);
};