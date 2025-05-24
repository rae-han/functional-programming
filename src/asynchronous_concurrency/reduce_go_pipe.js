import { go } from '../fxjs.js';

go(
  Promise.resolve(1),
  (a) => a + 10,
  (a) => Promise.resolve(a + 100),
  (a) => a + 1000,
  (a) => a + 10000,
  console.log,
);

go(
  Promise.resolve(1),
  (a) => a + 10,
  (a) => Promise.reject('error~~!!'),
  (a) => a + 1000,
  (a) => a + 10000,
  console.log,
).catch(console.log);
