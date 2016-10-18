module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        src: ['src/js/slideShow.js'],
        dest: 'dist/js/slideShow.js',
      },
    },
    uglify: {
      options: {
        preserveComments: 'some',
        sourceMap: true
      },
      dist: {
        files: {
          'dist/js/slideShow.min.js': ['src/js/slideShow.js']
        }
      }
    },
    cssmin: {
      minify: {
          src: 'src/css/slideShow.css',
          dest: 'dist/css/slideShow.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['concat', 'uglify', 'cssmin:minify']);
};
