module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      tests: {
        src: ['lib/scriber.js'],
        options: {
          specs: 'tests/*Spec.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  
  grunt.registerTask('default', ['jasmine']);
  
};