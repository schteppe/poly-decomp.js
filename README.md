poly-decomp.js
==============

Library for decomposing 2D polygons into convex regions.

[Demo](http://schteppe.github.io/poly-decomp.js/)

### About

The library is a manual port of the C++ library [Poly Decomp](http://mnbayazit.com/406/overview) by [Mark Bayazit](http://mnbayazit.com/).

It implements two algorithms, one optimal (but slow) and one less optimal (but fast).

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

// Decompose into convex polygons, using the faster algorithm
var convexPolygons = decomp.quickDecomp(concavePolygon);

// ==> [  [[1,0],[1,1],[0.5,0.5]],  [[0.5,0.5],[-1,1],[-1,0],[1,0]]  ]

// Decompose using the slow (but optimal) algorithm
var convexPolygons = decomp.decomp(concavePolygon);

// ==> [  [[-1,1],[-1,0],[1,0],[0.5,0.5]],  [[1,0],[1,1],[0.5,0.5]]  ]
```

### Documentation

#### var convexPolygons = decomp.quickDecomp(polygon);

Slices the polygon into convex sub-polygons, using a fast algorithm. Note that the input points objects will be re-used in the result array.

#### var convexPolygons = decomp.decomp(polygon);

Decomposes the polygon into one or more convex sub-polygons using an optimal algorithm. Note that the input points objects will be re-used in the result array.

#### var polygonIsSimple = decomp.isSimple(polygon);

Returns true if any of the line segments in the polygon intersects. Use this to check if the input polygon is OK to decompose.

#### makeCCW(polygon);

Reverses the polygon, if its vertices are not ordered counter-clockwise. Note that the input polygon array will be modified in place.

#### decomp.removeCollinearPoints(polygon, thresholdAngle);

Removes collinear points in the polygon. This means that if three points are placed along the same line, the middle one will be removed. The ```thresholdAngle``` is measured in radians and determines whether the points are collinear or not. Note that the input array will be modified in place.

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

### Change log
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
