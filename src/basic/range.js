import { reduce, add } from './fxjs.js';

const range = (length) => {
	let i = -1;
	const result = [];

	while (++i < length) {
		result.push(i);
	}

	return result;
};

const list1 = range(5);
console.log(reduce(add, list1)); // 10

const L = {};

L.range = function* (length) {
	let i = -1;

	while (++i < length) {
		yield i;
	}
};

const list2 = L.range(5);
console.log(reduce(add, list2)); // 10

console.log({ list1, list2 });

const test = (name, time, fn) => {
	console.time(name);
	while (time--) {
		fn();
	}
	console.timeEnd(name);
};

test('range', 10, () => reduce(add, range(1000000)));
test('L.range', 10, () => reduce(add, L.range(1000000)));

export default range;
