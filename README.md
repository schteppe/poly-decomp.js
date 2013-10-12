poly-decomp.js
==============

Library for decomposing 2D polygons into convex regions.

[Demo](http://schteppe.github.io/poly-decomp.js/) - [Documentation](http://schteppe.github.io/poly-decomp.js/docs)

### About

The library is a manual port of the C++ library [Poly Decomp](http://mnbayazit.com/406/overview) by [Mark Bayazit](http://mnbayazit.com/).

It implements two algorithms, one optimal (but slow) and one less optimal (but fast).

### Usage

```js
// Create a concave polygon
var concave = new Polygon();
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
