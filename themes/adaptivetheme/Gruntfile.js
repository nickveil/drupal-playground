module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      min: {
        options: {
          sourceMap: true,
        },
        files: [{
          expand: true,
          mangle: false,
          preserveComments: 'some',
          src: '*.js',
          dest: 'at_core/scripts/min',
          cwd: 'at_core/scripts',
          rename: function(dest, src) { return dest + '/' + src.replace('.js', '.min.js'); }
        }]
      }
    },

    postcss: {
      atcore: {
        src: 'at_core/styles/css/*.css',
         options: {
          map: {
            inline: false
          },
          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'})
          ]
        }
      },
      layout_plugin: {
        src: 'at_core/layout_plugin/css/**/*.css',
        options: {
          map: {
            inline: false
          },
          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'})
          ]
        }
      },
      mimic: {
        src: 'at_core/ckeditor/skins/mimic/*.css',
        options: {
          map: {
            inline: false
          },
          processors: [
            require('autoprefixer')({browsers: 'last 7 versions'})
          ]
        }
      },
      toolbar_theme: {
        src: 'at_core/toolbar_theme/*.css',
        options: {
          map: {
            inline: false
          },
          processors: [
            require('autoprefixer')({browsers: 'last 7 versions'})
          ]
        }
      }
    },

    sass: {
      atcore: {
        files: [{
          expand: true,
          cwd: 'at_core/styles/sass',
          src: ['*.scss'],
          dest: 'at_core/styles/css',
          ext: '.css'
        }],
        options: {
          require: 'susy',
          precision: 5,
          outputStyle: 'expanded',
          sourceMap: true
        }
      },
      layout_plugin: {
        files: [{
          expand: true,
          cwd: 'at_core/layout_plugin/sass',
          src: ['*.scss'],
          dest: 'at_core/layout_plugin/css',
          ext: '.css'
        }],
        options: {
          require: 'susy',
          precision: 5,
          outputStyle: 'expanded',
          sourceMap: true
        }
      },
      mimic: {
        files: [{
          expand: true,
          cwd: 'at_core/ckeditor/skins/mimic/sass',
          src: ['*.scss'],
          dest: 'at_core/ckeditor/skins/mimic',
          ext: '.css'
        }],
        options: {
          require: 'susy',
          precision: 5,
          outputStyle: 'expanded',
          imagePath: "at_core/ckeditor/skins/mimic/images",
          sourceMap: true
        }
      },
      toolbar_theme: {
        files: [{
          expand: true,
          cwd: 'at_core/toolbar_theme',
          src: ['*.scss'],
          dest: 'at_core/toolbar_theme',
          ext: '.css'
        }],
        options: {
          require: 'susy',
          precision: 5,
          outputStyle: 'expanded',
          sourceMap: true
        }
      },
    },

    csslint: {
      atcore: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: ['at_core/styles/css/*.css']
      },
      layout_plugin: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: ['at_core/layout_plugin/css/**/*.css']
      },
      mimic: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: ['at_core/ckeditor/skins/mimic/*.css']
      },
      toolbar_theme: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: ['at_core/toolbar_theme/*.css']
      }
    },

    watch: {
      atcore: {
        files: 'at_core/styles/sass/*.scss',
        tasks: ['sass:atcore', 'postcss:atcore']
      },
      layout_plugin: {
        files: 'at_core/layout_plugin/sass/*.scss',
        tasks: ['sass:layout_plugin', 'postcss:layout_plugin']
      },
      mimic: {
        files: 'at_core/ckeditor/skins/mimic/sass/*.scss',
        tasks: ['sass:mimic', 'postcss:mimic']
      },
      toolbar_theme: {
        files: 'at_core/toolbar_theme/*.scss',
        tasks: ['sass:toolbar_theme', 'postcss:toolbar_theme']
      }
    }
  });

  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch:atcore']);
}
