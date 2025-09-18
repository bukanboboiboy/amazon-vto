const calculateSquareArea = (side) => side * side;
const calculateRectangleArea = (length, width) => length * width;
const calculateTriangleArea = (base, height) => (base * height) / 2;

const square = calculateSquareArea(5);
console.log(square);

const rectangle = calculateRectangleArea(5, 3);
console.log(rectangle);

const triangle = calculateTriangleArea(6, 4);
console.log(triangle);

console.log('The End');