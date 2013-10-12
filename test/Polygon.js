var Polygon = require('../src/Polygon');

var concave = new Polygon();
concave.vertices.push(   [-1, 1],
                        [-1, 0],
                        [1, 0],
                        [1, 1],
                        [0.5, 0.5]);

var circle = new Polygon(),
    N = 10;
for(var i=0; i<N; i++){
    var angle = Math.PI/N*i;
    circle.vertices.push([Math.cos(angle),Math.sin(angle)]);
}

exports.constructor = function(test){
    new Polygon();
    test.done();
};

exports.copy = function(test){
    var copy = circle.copy(0,N-1);
    test.deepEqual(circle,copy);
    test.done();
};

exports.decomp = function(test){
    var circleConvexes = circle.decomp();
    test.equal(circleConvexes.length, 1);
    var concaveConvexes = concave.decomp();
    test.equal(concaveConvexes.length, 2);
    test.done();
};

exports.isSimple = function(test){
    var notSimple = new Polygon();
    notSimple.vertices = [  [-1,-1],
                            [ 0, 0],
                            [ 1, 1],
                            [ 0, 2],
                            [-1, 1],
                            [ 0, 0],
                            [ 1,-1]];

    test.ok(concave.isSimple());
    test.ok(circle.isSimple());
    test.ok(!notSimple.isSimple());
    test.done();
};

exports.quickDecomp = function(test){
    var result = circle.quickDecomp();
    test.equal(result.length, 1);
    var convexResult = concave.quickDecomp();
    test.equal(convexResult.length, 2);
    test.done();
};
