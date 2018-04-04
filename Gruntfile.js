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
        files: ['index.js', 'lib/*.js'],
        tasks: ['browserify'],
        livereload: 3000
      }
    },

    uglify: {
      options: {
        mangle: true,
        preserveComments	: false,
        banner: "/* COPYRIGHT © 2018 DMON STUDIO ALL RIGHTS RESERVED <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      target: {
        files: {
          'public/main.min.js': ['public/main.js']
        }
      }
    },

    copy: {
      docs: {
        expand: true,
        cwd: 'public/',
        src: ['*.min.js', '*.html'],
        dest: 'docs/'
      }
    },

    express: {
      options: {},
      dev: {
        options: {
          script: './server.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');
  
  grunt.registerTask('default', ['express:dev', 'watch']);
  grunt.registerTask('build', ['browserify', 'uglify', 'copy:docs']);
  grunt.registerTask('docs', ['copy:docs']);
}  