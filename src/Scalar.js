module.exports = Scalar;

function Scalar(){}

Scalar.eq = function(a,b,precision){
    precision = precision || 0;
    return Math.abs(a-b) < precision;
};
