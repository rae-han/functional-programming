import { add, C, filter, go, L, map, reduce } from '../fxjs';

const delay1000 = (a) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('hi! concurrent.');
      resolve(a);
    }, 500),
  );

// go(
//   [1, 2, 3, 4, 5],
//   L.map((a) => delay1000(a * a)),
//   L.filter((a) => a % 2),
//   reduce(add),
//   console.log,
// );

// go(
//   [1, 2, 3, 4, 5],
//   map((a) => delay1000(a * a)),
//   filter((a) => a % 2),
//   reduce(add),
//   console.log,
// );

// go(
//   [1, 2, 3, 4, 5],
//   L.map((a) => delay1000(a * a)),
//   L.filter((a) => a % 2),
//   C.reduce(add),
//   console.log,
// );

// go(
//   [1, 2, 3, 4, 5, 6, 7, 8, 9],
//   L.map((a) => delay1000(a * a)),
//   L.filter((a) => a % 2),
//   L.map((a) => delay1000(a * a)),
//   C.reduce(add),
//   console.log,
// );

go(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  L.map((a) => delay1000(a * a)),
  L.filter((a) => a % 2),
  L.map((a) => delay1000(a * a)),
  C.take(2),
  C.reduce(add),
  console.log,
);
