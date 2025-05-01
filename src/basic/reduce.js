const numbers = [1, 2, 3, 4, 5];

let total = 0;

for (const item of numbers) {
  total += item;
}

console.log(total);

const add = (a, b) => a + b;

// const reduce = (fn, acc, iter) => {
//   for (const item of iter) {
//     acc = fn(acc, item);
//   }
//   return acc;
// };

// // console.log(add(add(add(add(add(0, 1), 2), 3), 4), 5));

// console.log(reduce(add, 0, numbers));

const reduce = (fn, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const item of iter) {
    acc = fn(acc, item);
  }
  return acc;
};

console.log(reduce(add, numbers));

export default reduce;
