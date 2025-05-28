import { go, L, take } from '../fxjs';

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => a + 10),
  take(2),
  console.log,
); // [ '[object Promise]10', '[object Promise]10' ]
