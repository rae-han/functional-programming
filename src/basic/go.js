import { reduce } from "./index.js";

const go = (...args) => {
  return reduce((a, f) => f(a), args);
};

go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  console.log
);

export default go;
