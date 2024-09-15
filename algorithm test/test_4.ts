const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const matrixSize = Matrix.length;
let diagonal1 = 0;
let diagonal2 = 0;
Matrix.forEach((el, index) => {
  diagonal1 += el[index];
  diagonal2 += el[matrixSize - (index + 1)];
  console.log(diagonal1, diagonal2);
});
console.log(diagonal1 - diagonal2);
