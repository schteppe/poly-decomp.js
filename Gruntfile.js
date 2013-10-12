module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify : {
            decomp : {
                src : ["src/index.js"],
                dest : 'build/decomp.js',
                options : {
                    standalone : "decomp"
                }
            }
        },

        uglify : {
            build : {
                src : ['build/decomp.js'],
                dest : 'build/decomp.min.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['browserify','uglify']);

};
