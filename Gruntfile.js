module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      default: {
        files: {
          'public/main.js': ['index.js']
        },
        options: {
          browserifyOptions: {
            debug: false
          },
          transform: [
            ['babelify', {
              presets: ['es2015']
            }]
          ]
        },
      }
    },

    watch: {
      js: {
        files: ['index.js, lib/*.js'],
        tasks: ['browserify:default'],
        options: { livereload: true }
      }
    },

    uglify: {
      options: {
        mangle: true,
        preserveComments	: false,
        banner: "/* COPYRIGHT © 2018 DMON STUDIO ALL RIGHTS RESERVED <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      my_target: {
        files: {
          'public/main.min.js': ['public/main.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['browserify:default', 'uglify']);
}  