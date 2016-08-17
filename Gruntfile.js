module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify : {
            decomp : {
                src : ["src/index.js"],
                dest : 'build/decomp.js',
                options:{
                    bundleOptions : {
                        standalone : "decomp"
                    }
                }
            }
        },

        uglify : {
            build : {
                src : ['build/decomp.js'],
                dest : 'build/decomp.min.js'
            }
        },

        nodeunit: {
            all: ['test/**/*.js'],
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('default', ['nodeunit', 'browserify','uglify']);

};
