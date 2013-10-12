!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.decomp=e():"undefined"!=typeof global?global.decomp=e():"undefined"!=typeof self&&(self.decomp=e())}(function(){var define,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Scalar = require('./Scalar');

module.exports = Line;

function Line(){};

// Line is defined as an array of two points!
Line.lineInt = function(l1,l2,precision){
    precision = precision || 0;
    var i = [0,0]; // point
    var a1, b1, c1, a2, b2, c2, det; // scalars
    a1 = l1[1][1] - l1[0][1];
    b1 = l1[0][0] - l1[1][0];
    c1 = a1 * l1[0][0] + b1 * l1[0][1];
    a2 = l2[1][1] - l2[0][1];
    b2 = l2[0][0] - l2[1][0];
    c2 = a2 * l2[0][0] + b2 * l2[0][1];
    det = a1 * b2 - a2*b1;
    if (!Scalar.eq(det, 0, precision)) { // lines are not parallel
        i[0] = (b2 * c1 - b1 * c2) / det;
        i[1] = (a1 * c2 - a2 * c1) / det;
    }
    return i;
};

/**
 * Calculates the intersection between two line segments.
 * @param {Array} p1 The start vertex of the first line segment.
 * @param {Array} p2 The end vertex of the first line segment.
 * @param {Array} q1 The start vertex of the second line segment.
 * @param {Array} q2 The end vertex of the second line segment.
 * @return {Boolean} True if the two line segments intersect
 */
Line.segmentsIntersect = function(p1, p2, q1, q2){
   var dx = p2[0] - p1[0];
   var dy = p2[1] - p1[1];
   var da = q2[0] - q1[0];
   var db = q2[1] - q1[1];

   // segments are parallel
   if(da*dy - db*dx == 0)
      return false;

   var s = (dx * (q1[1] - p1[1]) + dy * (p1[0] - q1[0])) / (da * dy - db * dx)
   var t = (da * (p1[1] - q1[1]) + db * (q1[0] - p1[0])) / (db * dx - da * dy)

   return (s>=0 && s<=1 && t>=0 && t<=1);
};


},{"./Scalar":4}],2:[function(require,module,exports){
module.exports = Point;

function Point(){

};

Point.area = function(a,b,c){
    return (((b[0] - a[0])*(c[1] - a[1]))-((c[0] - a[0])*(b[1] - a[1])));
};
/*Scalar area(const Point &a, const Point &b, const Point &c) {
    return (((b.x - a.x)*(c.y - a.y))-((c.x - a.x)*(b.y - a.y)));
}*/

Point.left = function(a,b,c){
    return Point.area(a,b,c) > 0;
};
/*bool left(const Point &a, const Point &b, const Point &c) {
    return area(a, b, c) > 0;
}*/

Point.leftOn = function(a,b,c) {
    return Point.area(a, b, c) >= 0;
}

Point.right = function(a,b,c) {
    return Point.area(a, b, c) < 0;
}

Point.rightOn = function(a,b,c) {
    return Point.area(a, b, c) <= 0;
}

Point.collinear = function(a,b,c) {
    return Point.area(a, b, c) == 0;
}

Point.sqdist = function(a,b){
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];
    return dx * dx + dy * dy;
};
/*Scalar sqdist(const Point &a, const Point &b) {
    Scalar dx = b.x - a.x;
    Scalar dy = b.y - a.y;
    return dx * dx + dy * dy;
}*/

},{}],3:[function(require,module,exports){
var Line = require("./Line")
,   Point = require("./Point")
,   Scalar = require("./Scalar")

module.exports = Polygon;

function Polygon(){
    this.vertices = [];
}

Polygon.prototype.at = function(i){
    var v = this.vertices,
        s = v.length;
    return v[i < 0 ? i % s + s : i % s];
};

Polygon.prototype.first = function(){
    return this.vertices[0];
};

Polygon.prototype.last = function(){
    return this.vertices[this.vertices.length-1];
};

Polygon.prototype.clear = function(){
    this.vertices.length = 0;
};

Polygon.prototype.append = function(poly,from,to){
    if(typeof(from) == "undefined") throw new Error("From is not given!");
    if(typeof(to) == "undefined")   throw new Error("To is not given!");

    if(to-1 < from)                 throw new Error("lol1");
    if(to > poly.vertices.length)   throw new Error("lol2");
    if(from < 0)                    throw new Error("lol3");

    for(var i=from; i<to; i++){
        this.vertices.push(poly.vertices[i]);
    }
};

Polygon.prototype.makeCCW = function(){
    var br = 0,
        v = this.vertices;

    // find bottom right point
    for (var i = 1; i < this.vertices.length; ++i) {
        if (v[i][1] < v[br][1] || (v[i][1] == v[br][1] && v[i][0] > v[br][0])) {
            br = i;
        }
    }

    // reverse poly if clockwise
    if (!Point.left(this.at(br - 1), this.at(br), this.at(br + 1))) {
        this.reverse();
    }
};

Polygon.prototype.reverse = function(){
    var tmp = [];
    for(var i=0, N=this.vertices.length; i!==N; i++){
        tmp.push(this.vertices.pop());
    }
    this.vertices = tmp;
};

Polygon.prototype.isReflex = function(i){
    return Point.right(this.at(i - 1), this.at(i), this.at(i + 1));
};

var tmpLine1=[],
    tmpLine2=[];
Polygon.prototype.canSee = function(a,b) {
    var p, dist, l1=tmpLine1, l2=tmpLine2;

    if (Point.leftOn(this.at(a + 1), this.at(a), this.at(b)) && Point.rightOn(this.at(a - 1), this.at(a), this.at(b))) {
        return false;
    }
    dist = Point.sqdist(this.at(a), this.at(b));
    for (var i = 0; i !== this.vertices.length; ++i) { // for each edge
        if ((i + 1) % this.vertices.length === a || i === a) // ignore incident edges
            continue;
        if (Point.leftOn(this.at(a), this.at(b), this.at(i + 1)) && Point.rightOn(this.at(a), this.at(b), this.at(i))) { // if diag intersects an edge
            l1[0] = this.at(a);
            l1[1] = this.at(b);
            l2[0] = this.at(i);
            l2[1] = this.at(i + 1);
            p = Line.lineInt(l1,l2);
            if (Point.sqdist(this.at(a), p) < dist) { // if edge is blocking visibility to b
                return false;
            }
        }
    }

    return true;
};

Polygon.prototype.copy = function(i,j,targetPoly){
    var p = targetPoly || new Polygon();
    p.clear();
    if (i < j) {
        // Insert all vertices from i to j
        for(var k=i; k<=j; k++)
            p.vertices.push(this.vertices[k]);

    } else {

        // Insert vertices 0 to j
        for(var k=0; k<=j; k++)
            p.vertices.push(this.vertices[k]);

        // Insert vertices i to end
        for(var k=i; k<this.vertices.length; k++)
            p.vertices.push(this.vertices[k]);
    }

    return p;
};

/**
 * Decomposes the polygon into convex pieces. Returns a list of edges [[p1,p2],[p2,p3],...] that cuts the polygon.
 * @method decomp
 * @return {Array}
 */
Polygon.prototype.getCutEdges = function() {
    var min=[], tmp1=[], tmp2=[], tmpPoly = new Polygon();
    var nDiags = Number.MAX_VALUE;

    for (var i = 0; i < this.vertices.length; ++i) {
        if (this.isReflex(i)) {
            for (var j = 0; j < this.vertices.length; ++j) {
                if (this.canSee(i, j)) {
                    tmp1 = this.copy(i, j, tmpPoly).getCutEdges();
                    tmp2 = this.copy(j, i, tmpPoly).getCutEdges();

                    for(var k=0; k<tmp2.length; k++)
                        tmp1.push(tmp2[k]);

                    if (tmp1.length < nDiags) {
                        min = tmp1;
                        nDiags = tmp1.length;
                        min.push([this.at(i), this.at(j)]);
                    }
                }
            }
        }
    }

    return min;
};

Polygon.prototype.decomp = function(){
    var edges = this.getCutEdges();
    if(edges.length > 0)
        return this.slice(edges);
    else
        return [this];
};

/**
 * Slices the polygon given one or more cut edges. If given one, this function will return two polygons (false on failure). If many, an array of polygons.
 * @return {Array}
 */
Polygon.prototype.slice = function(cutEdges){
    if(cutEdges.length == 0) return [this];
    if(cutEdges instanceof Array && cutEdges.length && cutEdges[0] instanceof Array && cutEdges[0].length==2 && cutEdges[0][0] instanceof Array){

        var polys = [this];

        for(var i=0; i<cutEdges.length; i++){
            var cutEdge = cutEdges[i];
            // Cut all polys
            for(var j=0; j<polys.length; j++){
                var poly = polys[j];
                var result = poly.slice(cutEdge);
                if(result){
                    // Found poly! Cut and quit
                    polys.splice(j,1);
                    polys.push(result[0],result[1]);
                    break;
                }
            }
        }

        return polys;
    } else {

        // Was given one edge
        var cutEdge = cutEdges;
        var i = this.vertices.indexOf(cutEdge[0]);
        var j = this.vertices.indexOf(cutEdge[1]);

        if(i != -1 && j != -1){
            return [this.copy(i,j),
                    this.copy(j,i)];
        } else {
            return false;
        }
    }
};

/**
 * Check if a path is OK to decompose. Basically checks that the line segments do not overlap.
 * @param  {Array} path An array of vertices e.g. [[0,0],[0,1],...]
 * @return {Boolean}
 * @todo Should it check all segments with all others?
 */
Polygon.prototype.isSimple = function(){
    var path = this.vertices;
    // Check
    for(var i=0; i<path.length-1; i++){
        for(var j=0; j<i-1; j++){
            if(Line.segmentsIntersect(path[i], path[i+1], path[j], path[j+1] )){
                return false;
            }
        }
    }

    // Check the segment between the last and the first point to all others
    for(var i=1; i<path.length-2; i++){
        if(Line.segmentsIntersect(path[0], path[path.length-1], path[i], path[i+1] )){
            return false;
        }
    }

    return true;
};

/**
 * Calculates the intersection between two line segments.
 * @param {Array} p1 The start vertex of the first line segment.
 * @param {Array} p2 The end vertex of the first line segment.
 * @param {Array} q1 The start vertex of the second line segment.
 * @param {Array} q2 The end vertex of the second line segment.
 * @return {Array} Returns the point of intersection, or [0,0] if there is no intersection.
 */
function getIntersectionPoint(p1, p2, q1, q2, delta){
    delta = delta || 0;
   var a1 = p2[1] - p1[1];
   var b1 = p1[0] - p2[0];
   var c1 = (a1 * p1[0]) + (b1 * p1[1]);
   var a2 = q2[1] - q1[1];
   var b2 = q1[0] - q2[0];
   var c2 = (a2 * q1[0]) + (b2 * q1[1]);
   var det = (a1 * b2) - (a2 * b1);

   if(!Scalar.eq(det,0,delta))
      return [((b2 * c1) - (b1 * c2)) / det, ((a1 * c2) - (a2 * c1)) / det]
   else
      return [0,0]
}

Polygon.prototype.quickDecomp = function(result,reflexVertices,steinerPoints,delta,maxlevel,level){
    maxlevel = maxlevel || 100;
    level = level || 0;
    delta = delta || 25;
    result = typeof(result)!="undefined" ? result : [];
    reflexVertices = reflexVertices || [];
    steinerPoints = steinerPoints || [];

    var upperInt=[0,0], lowerInt=[0,0], p=[0,0]; // Points
    var upperDist=0, lowerDist=0, d=0, closestDist=0; // scalars
    var upperIndex=0, lowerIndex=0, closestIndex=0; // Integers
    var lowerPoly=new Polygon(), upperPoly=new Polygon(); // polygons
    var poly = this,
        v = this.vertices;

    if(v.length < 3) return result;

    level++;
    if(level > maxlevel){
        console.warn("quickDecomp: max level ("+maxlevel+") reached.");
        return result;
    }

    for (var i = 0; i < this.vertices.length; ++i) {
        if (poly.isReflex(i)) {
            reflexVertices.push(poly.vertices[i]);
            upperDist = lowerDist = Number.MAX_VALUE;


            for (var j = 0; j < this.vertices.length; ++j) {
                if (Point.left(poly.at(i - 1), poly.at(i), poly.at(j))
                        && Point.rightOn(poly.at(i - 1), poly.at(i), poly.at(j - 1))) { // if line intersects with an edge
                    p = getIntersectionPoint(poly.at(i - 1), poly.at(i), poly.at(j), poly.at(j - 1)); // find the point of intersection
                    if (Point.right(poly.at(i + 1), poly.at(i), p)) { // make sure it's inside the poly
                        d = Point.sqdist(poly.vertices[i], p);
                        if (d < lowerDist) { // keep only the closest intersection
                            lowerDist = d;
                            lowerInt = p;
                            lowerIndex = j;
                        }
                    }
                }
                if (Point.left(poly.at(i + 1), poly.at(i), poly.at(j + 1))
                        && Point.rightOn(poly.at(i + 1), poly.at(i), poly.at(j))) {
                    p = getIntersectionPoint(poly.at(i + 1), poly.at(i), poly.at(j), poly.at(j + 1));
                    if (Point.left(poly.at(i - 1), poly.at(i), p)) {
                        d = Point.sqdist(poly.vertices[i], p);
                        if (d < upperDist) {
                            upperDist = d;
                            upperInt = p;
                            upperIndex = j;
                        }
                    }
                }
            }

            // if there are no vertices to connect to, choose a point in the middle
            if (lowerIndex == (upperIndex + 1) % this.vertices.length) {
                //console.log("Case 1: Vertex("+i+"), lowerIndex("+lowerIndex+"), upperIndex("+upperIndex+"), poly.size("+this.vertices.length+")");
                p[0] = (lowerInt[0] + upperInt[0]) / 2;
                p[1] = (lowerInt[1] + upperInt[1]) / 2;
                steinerPoints.push(p);

                if (i < upperIndex) {
                    //lowerPoly.insert(lowerPoly.end(), poly.begin() + i, poly.begin() + upperIndex + 1);
                    lowerPoly.append(poly, i, upperIndex+1);
                    lowerPoly.vertices.push(p);
                    upperPoly.vertices.push(p);
                    if (lowerIndex != 0){
                        //upperPoly.insert(upperPoly.end(), poly.begin() + lowerIndex, poly.end());
                        upperPoly.append(poly,lowerIndex,poly.vertices.length);
                    }
                    //upperPoly.insert(upperPoly.end(), poly.begin(), poly.begin() + i + 1);
                    upperPoly.append(poly,0,i+1);
                } else {
                    if (i != 0){
                        //lowerPoly.insert(lowerPoly.end(), poly.begin() + i, poly.end());
                        lowerPoly.append(poly,i,poly.vertices.length);
                    }
                    //lowerPoly.insert(lowerPoly.end(), poly.begin(), poly.begin() + upperIndex + 1);
                    lowerPoly.append(poly,0,upperIndex+1);
                    lowerPoly.vertices.push(p);
                    upperPoly.vertices.push(p);
                    //upperPoly.insert(upperPoly.end(), poly.begin() + lowerIndex, poly.begin() + i + 1);
                    upperPoly.append(poly,lowerIndex,i+1);
                }
            } else {
                // connect to the closest point within the triangle
                //console.log("Case 2: Vertex("+i+"), closestIndex("+closestIndex+"), poly.size("+this.vertices.length+")\n");

                if (lowerIndex > upperIndex) {
                    upperIndex += this.vertices.length;
                }
                closestDist = Number.MAX_VALUE;

                if(upperIndex < lowerIndex){
                    return result;
                }

                for (var j = lowerIndex; j <= upperIndex; ++j) {
                    if (Point.leftOn(poly.at(i - 1), poly.at(i), poly.at(j))
                            && Point.rightOn(poly.at(i + 1), poly.at(i), poly.at(j))) {
                        d = Point.sqdist(poly.at(i), poly.at(j));
                        if (d < closestDist) {
                            closestDist = d;
                            closestIndex = j % this.vertices.length;
                        }
                    }
                }

                if (i < closestIndex) {
                    lowerPoly.append(poly,i,closestIndex+1);
                    if (closestIndex != 0){
                        upperPoly.append(poly,closestIndex,v.length);
                    }
                    upperPoly.append(poly,0,i+1);
                } else {
                    if (i != 0){
                        lowerPoly.append(poly,i,v.length);
                    }
                    lowerPoly.append(poly,0,closestIndex+1);
                    upperPoly.append(poly,closestIndex,i+1);
                }
            }

            // solve smallest poly first
            if (lowerPoly.vertices.length < upperPoly.vertices.length) {
                lowerPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);
                upperPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);
            } else {
                upperPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);
                lowerPoly.quickDecomp(result,reflexVertices,steinerPoints,delta,maxlevel,level);
            }

            return result;
        }
    }
    result.push(this);

    return result;
};

},{"./Line":1,"./Point":2,"./Scalar":4}],4:[function(require,module,exports){
module.exports = Scalar;

function Scalar(){}

Scalar.eq = function(a,b,precision){
    precision = precision || 0;
    return Math.abs(a-b) < precision;
};

},{}],5:[function(require,module,exports){
module.exports = {
    Polygon : require("./Polygon"),
    Point : require("./Point"),
};

},{"./Point":2,"./Polygon":3}]},{},[5])
(5)
});
;