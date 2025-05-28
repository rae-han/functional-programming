import { go, L, map, range, take } from '../fxjs';

go(
  [1, 2, 3],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  console.log,
);

go(
  [1, 2, 3],
  map((a) => a + 10),
  console.log,
);
