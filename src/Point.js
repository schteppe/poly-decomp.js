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
