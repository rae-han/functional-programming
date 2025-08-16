import { go, L, take } from '../fxjs';

go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L.map(
    (a) => new Promise((resolve) => setTimeout(() => resolve(a * a), 1000)),
  ),
  L.filter(
    (a) => new Promise((resolve) => setTimeout(() => resolve(a % 2), 1000)),
  ),
  take(2),
  console.log,
);
