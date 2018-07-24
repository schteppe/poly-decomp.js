poly-decomp.js
==============

Library for decomposing a 2D polygon into convex pieces.

![Decomposing a convcave polygon into convex regions](https://cloud.githubusercontent.com/assets/1063152/18008563/edccfe86-6ba8-11e6-9e20-a090c1812c95.gif)

[Launch the demo!](http://schteppe.github.io/poly-decomp.js/)

The library implements two algorithms, one optimal (but slow) and one less optimal (but fast).
It's is a manual port of the C++ library [Poly Decomp](https://mpen.ca/406/bayazit) by [Mark Penner](https://mpen.ca). 

### Install
##### Browser
Download [decomp.js](build/decomp.js) or [decomp.min.js](build/decomp.min.js) and include the script in your HTML:
```html
<script src="decomp.js" type="text/javascript"></script>
<!-- or: -->
<script src="decomp.min.js" type="text/javascript"></script>
```

Then you can use the ```decomp``` global.

##### Node.js
```
npm install poly-decomp
```

Then require it like so:

```js
var decomp = require('poly-decomp');
```

### Basic usage
```js
// Create a concave polygon
var concavePolygon = [
  [ -1,   1],
  [ -1,   0],
  [  1,   0],
  [  1,   1],
  [0.5, 0.5]
];

// Make sure the polygon has counter-clockwise winding. Skip this step if you know it's already counter-clockwise.
decomp.makeCCW(concavePolygon);

// Decompose into convex polygons, using the faster algorithm
var convexPolygons = decomp.quickDecomp(concavePolygon);

// ==> [  [[1,0],[1,1],[0.5,0.5]],  [[0.5,0.5],[-1,1],[-1,0],[1,0]]  ]

// Decompose using the slow (but optimal) algorithm
var convexPolygons = decomp.decomp(concavePolygon);

// ==> [  [[-1,1],[-1,0],[1,0],[0.5,0.5]],  [[1,0],[1,1],[0.5,0.5]]  ]
```

### Advanced usage
```js
// Get user input as an array of points.
var polygon = getUserInput();

// Check if the polygon self-intersects
if(decomp.isSimple(polygon)){
    
    // Reverse the polygon to make sure it uses counter-clockwise winding
    decomp.makeCCW(polygon);
    
    // Decompose into convex pieces
    var convexPolygons = decomp.quickDecomp(polygon);
    
    // Draw each point on an HTML5 Canvas context
    for(var i=0; i<convexPolygons.length; i++){
        var convexPolygon = convexPolygons[i];
        
        ctx.beginPath();
        var firstPoint = convexPolygon[0];
        ctx.moveTo(firstPoint[0], firstPoint[1]);
        
        for(var j=1; j<convexPolygon.length; j++){
            var point = convexPolygon[j];
            var x = point[0];
            var y = point[1];
            c.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }
}
```

### Documentation

#### quickDecomp(polygon: Array&lt;Point&gt;): Array&lt;Array&lt;Point&gt;&gt;

```js
var convexPolygons = decomp.quickDecomp(polygon);
```

Slices the polygon into convex sub-polygons, using a fast algorithm. Note that the input points objects will be re-used in the result array.

#### decomp(polygon: Array&lt;Point&gt;): Array&lt;Array&lt;Point&gt;&gt;

```js
var convexPolygons = decomp.quickDecomp(polygon);
```

Decomposes the polygon into one or more convex sub-polygons using an optimal algorithm. Note that the input points objects will be re-used in the result array.

#### isSimple(polygon: Array&lt;Point&gt;): boolean

```js
if(decomp.isSimple(polygon)){
    // Polygon does not self-intersect - it's safe to decompose.
    var convexPolygons = decomp.quickDecomp(polygon);
}
```

Returns true if any of the line segments in the polygon intersects. Use this to check if the input polygon is OK to decompose.

#### makeCCW(polygon: Array&lt;Point&gt;): void

```js
console.log('Polygon with clockwise winding:', polygon);
decomp.makeCCW(polygon);
console.log('Polygon with counter-clockwise winding:', polygon);
```

Reverses the polygon, if its vertices are not ordered counter-clockwise. Note that the input polygon array will be modified in place.

#### removeCollinearPoints(polygon: Array&lt;Point&gt;, thresholdAngle: number): void

```js
var before = polygon.length;
decomp.removeCollinearPoints(polygon, 0.1);
var numRemoved = before - polygon.length;
console.log(numRemoved + ' collinear points could be removed');
```

Removes collinear points in the polygon. This means that if three points are placed along the same line, the middle one will be removed. The ```thresholdAngle``` is measured in radians and determines whether the points are collinear or not. Note that the input array will be modified in place.

#### removeDuplicatePoints(polygon: Array&lt;Point&gt;, precision: number): void

```js
var polygon = [
    [0,0],
    [1,1],
    [2,2],
    [0,0]
];
decomp.removeDuplicatePoints(polygon, 0.01);

// polygon is now [[1,1],[2,2],[0,0]]
```

### Change log
##### 0.3.0
* Added `removeDuplicatePoints`.
* `makeCCW` now returns true if the polygon was changed.
* Fixed case 5 mentioned [here](https://mpen.ca/406/bayazit) and discussed [here](https://github.com/schteppe/poly-decomp.js/issues/8).

##### 0.2.1
* Fixed bug in the collinear point removal, after this fix the algorithm is more agressive and more correct.

##### 0.2.0
* Rewrote the class based API to a minimal array-based one. See docs.

##### 0.1
* Added method ```Polygon.prototype.removeCollinearPoints```.
* Added optional parameter ```thresholdAngle``` to ```Point.collinear(a,b,c,thresholdAngle)```.

### Contribute
Make sure you have git, [Node.js](http://nodejs.org), NPM and [grunt](http://gruntjs.com/) installed.
```
git clone https://github.com/schteppe/poly-decomp.js.git; # Clone the repo
cd poly-decomp.js;
npm install;                                     # Install dependencies
                                                 # (make changes to source)
grunt;                                           # Builds build/decomp.js
```
The most recent commits are currently pushed to the ```master``` branch. Thanks for contributing!
