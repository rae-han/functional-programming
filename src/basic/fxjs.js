export const products = [
	{ name: '반팔티', price: 15000 },
	{ name: '긴팔티', price: 20000 },
	{ name: '핸드폰케이스', price: 15000 },
	{ name: '후드티', price: 30000 },
	{ name: '바지', price: 25000 },
];

export const add = (a, b) => a + b;

export const curry =
	(fn) =>
	(arg, ...args) =>
		args.length ? fn(arg, ...args) : (...args) => fn(arg, ...args);

export const L = {};

export const map = curry((fn, iter) => {
	let result = [];

	for (const item of iter) {
		result.push(fn(item));
	}

	return result;
});

export const filter = curry((fn, iter) => {
	let result = [];

	for (const item of iter) {
		if (fn(item)) {
			result.push(item);
		}
	}

	return result;
});

export const reduce = curry((fn, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}

	for (const item of iter) {
		acc = fn(acc, item);
	}
	return acc;
});

export const go = (...args) => {
	return reduce((a, f) => f(a), args);
};

export const pipe =
	(fn, ...fns) =>
	(...args) =>
		go(fn(...args), ...fns);

export const range = (length) => {
	let i = -1;
	const result = [];

	while (++i < length) {
		result.push(i);
	}

	return result;
};

L.range = function* (length) {
	let i = -1;

	while (++i < length) {
		yield i;
	}
};
