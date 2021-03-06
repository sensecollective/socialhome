module.exports = function (grunt) {

    var appConfig = grunt.file.readJSON('package.json');

    // Load grunt tasks automatically
    // see: https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    // see: https://npmjs.org/package/time-grunt
    require('time-grunt')(grunt);

    var pathsConfig = function (appName) {
        this.app = appName || appConfig.name;

        return {
            app: this.app,
            templates: this.app + '/templates',
            css: this.app + '/static/css',
            sass: this.app + '/static/sass',
            fonts: this.app + '/static/fonts',
            images: this.app + '/static/images',
            js: this.app + '/static/js',
            bower: "bower_components",
            node: "node_modules",
        }
    };

    grunt.initConfig({

        paths: pathsConfig(),
        pkg: appConfig,

        // see: https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: [
                    '<%= paths.sass %>/**/*.{scss,sass}',
                    '<%= paths.js %>/**/*.js',
                ],
                tasks: ['sass:dev', 'concat', 'copy'],
                options: {
                    atBegin: true
                }
            },
            livereload: {
                files: [
                    '<%= paths.js %>/**/*.js',
                    '<%= paths.sass %>/**/*.{scss,sass}',
                    '<%= paths.app %>/**/*.html'
                ],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },
        },

        // see: https://github.com/sindresorhus/grunt-sass
        sass: {
            dev: {
                options: {
                    outputStyle: 'nested',
                    sourceMap: false,
                    precision: 10
                },
                files: {
                    '<%= paths.css %>/fontawesome.css': '<%= paths.bower %>/fontawesome/scss/font-awesome.scss',
                    '<%= paths.css %>/common.css': '<%= paths.sass %>/common.scss',
                    '<%= paths.css %>/grids.css': '<%= paths.sass %>/grids.scss',
                    '<%= paths.css %>/streams.css': '<%= paths.sass %>/streams.scss',
                    '<%= paths.css %>/publisher.css': '<%= paths.sass %>/publisher.scss',
                    '<%= paths.css %>/content.css': '<%= paths.sass %>/content.scss',
                    '<%= paths.css %>/contacts.css': '<%= paths.sass %>/contacts.scss',
                    '<%= paths.css %>/search.css': '<%= paths.sass %>/search.scss',
                },
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false,
                    precision: 10
                },
                files: {
                    '<%= paths.css %>/fontawesome.css': '<%= paths.bower %>/fontawesome/scss/font-awesome.scss',
                    '<%= paths.css %>/common.css': '<%= paths.sass %>/common.scss',
                    '<%= paths.css %>/grids.css': '<%= paths.sass %>/grids.scss',
                    '<%= paths.css %>/streams.css': '<%= paths.sass %>/streams.scss',
                    '<%= paths.css %>/publisher.css': '<%= paths.sass %>/publisher.scss',
                    '<%= paths.css %>/content.css': '<%= paths.sass %>/content.scss',
                    '<%= paths.css %>/contacts.css': '<%= paths.sass %>/contacts.scss',
                    '<%= paths.css %>/search.css': '<%= paths.sass %>/search.scss',
                },
            }
        },

        concat: {
            js: {
                src: [
                    "<%= paths.bower %>/jquery/dist/jquery.min.js",
                    "<%= paths.bower %>/tether/dist/js/tether.min.js",
                    "<%= paths.bower %>/jquery-ui/jquery-ui.min.js",
                    "<%= paths.bower %>/underscore/underscore-min.js",
                    "<%= paths.bower %>/bootstrap/dist/js/bootstrap.min.js",
                    "<%= paths.bower %>/masonry/dist/masonry.pkgd.min.js",
                    "<%= paths.bower %>/imagesloaded/imagesloaded.pkgd.min.js",
                    "<%= paths.node %>/ReconnectingWebSocket/reconnecting-websocket.min.js",
                    "<%= paths.bower %>/bootstrap-markdown/js/bootstrap-markdown.js",
                    "<%= paths.bower %>/js-cookie/src/js.cookie.js",
                    "<%= paths.js %>/vendor/appear.min.js",
                    "<%= paths.js %>/contacts.js",
                    "<%= paths.js %>/content.js",
                    "<%= paths.js %>/grids.js",
                    "<%= paths.js %>/publisher.js",
                    "<%= paths.js %>/search.js",
                ],
                dest: "<%= paths.js %>/project.js",
                nonull: true,
            },
            css: {
                src: [
                    "<%= paths.bower %>/bootstrap/dist/css/bootstrap.min.css",
                    "<%= paths.bower %>/tether/dist/css/tether.min.css",
                    "<%= paths.bower %>/bootstrap-markdown/css/bootstrap-markdown.min.css",
                    "<%= paths.css %>/fontawesome.css",
                    "<%= paths.css %>/common.css",
                    "<%= paths.css %>/grids.css",
                    "<%= paths.css %>/streams.css",
                    "<%= paths.css %>/publisher.css",
                    "<%= paths.css %>/content.css",
                    "<%= paths.css %>/contacts.css",
                    "<%= paths.css %>/search.css",
                ],
                dest: "<%= paths.css %>/project.css",
                nonull: true,
            },
        },

        //see https://github.com/nDmitry/grunt-postcss
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer-core')({
                        browsers: [
                            'Android 2.3',
                            'Android >= 4',
                            'Chrome >= 20',
                            'Firefox >= 24',
                            'Explorer >= 8',
                            'iOS >= 6',
                            'Opera >= 12',
                            'Safari >= 6'
                        ]
                    }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: '<%= paths.css %>/*.css'
            }
        },

        copy: {
            font_awesome: {
                expand: true,
                flatten: true,
                src: ['<%= paths.bower %>/fontawesome/fonts/*'],
                dest: '<%= paths.fonts %>'
            },
        },
    });

    grunt.registerTask('build', [
        'sass:dist',
        'postcss',
        'concat',
        'copy',
    ]);

    grunt.registerTask('dev', [
        'sass:dev',
        'concat',
        'copy',
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);
};
