@psalaets/poly-decomp
==============

Library for decomposing 2D polygons into convex regions.

[Demo](http://schteppe.github.io/poly-decomp.js/) - [Documentation](http://schteppe.github.io/poly-decomp.js/docs)

### Differences from poly-decomp

This module differs from [poly-decomp](https://www.npmjs.com/package/poly-decomp) in the following ways

- there is nothing in `dependencies`
- grunt has been replaced by npm scripts (`npm run build`)

### About

The library is a manual port of the C++ library [Poly Decomp](http://mnbayazit.com/406/overview) by [Mark Bayazit](http://mnbayazit.com/).

It implements two algorithms, one optimal (but slow) and one less optimal (but fast).

### Usage
```js
var decomp = require('@psalaets/poly-decomp');

// Create a concave polygon
var concave = new decomp.Polygon();
concave.vertices.push([ -1,   1],
                      [ -1,   0],
                      [  1,   0],
                      [  1,   1],
                      [0.5, 0.5]);

// Decompose into convex polygons, using the faster algorithm
var convexes1 = concave.quickDecomp();

// Decompose using the slow (but optimal) algorithm
var convexes2 = concave.decomp();

// convexes1 and convexes2 are now arrays of Polygon objects.
```

### Install
##### Browser
Download [decomp.js](build/decomp.js) and include the script in your HTML:
```html
<script src="decomp.js" type="text/javascript"></script>
```
##### Node.js

`npm install @psalaets/poly-decomp -S`


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
