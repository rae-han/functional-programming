// go 함수와 달리 함수를 리턴한다. go 함수는 인자와 함수를 받아 즉시 값을 평가하는데 사용한다.
// pipe 함수는 인자와 함수를 받아 우선 함수를 합성하고, 합성된 함수를 리턴한다.
// 합성된 함수는 인자를 받아 즉시 값을 평가하는데 사용한다.

import { go } from './index.js';

// const pipe =
//   (...fns) =>
//   (arg) =>
//     go(arg, ...fns);

const pipe =
	(fn, ...fns) =>
	(...args) =>
		go(fn(...args), ...fns);

const f = pipe(
	(a, b) => a + b,
	(a) => a + 10,
	(a) => a + 100,
	console.log,
);

f(0, 1);

export default pipe;
