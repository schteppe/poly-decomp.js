var polyDecomp = require('../src');

var concave = [
    [-1, 1],
    [-1, 0],
    [1, 0],
    [1, 1],
    [0.5, 0.5]
];

var circle = [],
    N = 10;
for(var i=0; i<N; i++){
    var angle = Math.PI/N*i;
    circle.push([Math.cos(angle),Math.sin(angle)]);
}

module.exports = {

    decomp: function(test){
        var circleConvexes = polyDecomp.decomp(circle);
        test.equal(circleConvexes.length, 1);
        var concaveConvexes = polyDecomp.decomp(concave);
        test.equal(concaveConvexes.length, 2);
        test.done();
    },

    isSimple: function(test){
        var notSimple = [
            [-1,-1],
            [ 0, 0],
            [ 1, 1],
            [ 0, 2],
            [-1, 1],
            [ 0, 0],
            [ 1,-1]
        ];

        test.ok(polyDecomp.isSimple(concave));
        test.ok(polyDecomp.isSimple(circle));
        test.ok(!polyDecomp.isSimple(notSimple));
        test.done();
    },

    quickDecomp: function(test){
        var result = polyDecomp.quickDecomp(circle);
        test.equal(result.length, 1);
        var convexResult = polyDecomp.quickDecomp(concave);
        test.equal(convexResult.length, 2);
        test.done();
    }

};
