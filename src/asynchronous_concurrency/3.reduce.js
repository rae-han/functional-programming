import { add, go, L, reduce } from '../fxjs.js';

go(
  [1, 2, 3, 4],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => Promise.resolve(a % 2)),
  reduce(add),
  console.log,
); // 1[object Promise][object Promise][object Promise]
