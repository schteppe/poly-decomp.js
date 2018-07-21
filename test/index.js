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
    var angle = 2*Math.PI/N*i;
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
    },

    removeDuplicatePoints: function(test){
         var data = [
            [0,0],
            [1,1],
            [2,2],
            [0,0]
        ];
        polyDecomp.removeDuplicatePoints(data);
        test.equal(data.length, 3);

        var data2 = [
            [0,0],
            [1,1],
            [2,2],
            [1,1],
            [0,0],
            [2,2]
        ];
        polyDecomp.removeDuplicatePoints(data2);
        test.equal(data2.length, 3);

        test.done();
    },

    quickDecompExtraVisibilityTestFix: function(test){
        // This test checks that this bug is fixed: https://github.com/schteppe/poly-decomp.js/issues/8
        var path = [
            [0,-134],
            [50,-139],
            [60,-215],
            [70,-6],
            [80,-236],
            [110,-120],
            [110,0],
            [0,0]
        ].map((point)=>[2*point[0]+100,1*point[1]+500]);
        polyDecomp.makeCCW(path);
        var polys = polyDecomp.quickDecomp(path);
        test.equal(polys.length, 3);

        path = [
            [0,-134],
            [50,-139],
            [60,-215],
            [70,-6],
            [80,-236],
            [110,-120],
            [110,0],
            [0,0]
        ].map((point)=>[3*point[0]+100,1*point[1]+500]);
        polyDecomp.makeCCW(path);
        var polys = polyDecomp.quickDecomp(path);
        test.equal(polys.length, 3);

        path = [
            [0,-134],
            [50,-139],
            [60,-215],
            [70,-6],
            [80,-236],
            [110,-120],
            [110,0],
            [0,0]
        ].map((point)=>[-3*point[0],-point[1]]);
        polyDecomp.makeCCW(path);
        var polys = polyDecomp.quickDecomp(path);
        test.equal(polys.length, 3);

        path = [[331,384],[285,361],[238,386],[283,408],[191,469],[213,372],[298,314],[342,340]];
        polyDecomp.makeCCW(path);
        var polys = polyDecomp.quickDecomp(path);
        test.equal(polys.length, 3);

        test.done();
    }
    
};
