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
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify']);

};
