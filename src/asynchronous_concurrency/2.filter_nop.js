import { go, L, take } from '../fxjs.js';

go(
  [1, 2, 3, 4, 5],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => a % 2),
  take(2),
  console.log,
);
