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

// export const map = curry((fn, iter) => {
// 	let result = [];

// 	for (const a of iter) {
// 		result.push(fn(a));
// 	}

// 	return result;
// });

export const map = curry((fn, iter) => {
	let result = [];

	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		result.push(fn(a));
	}

	return result;
});

// export const filter = curry((fn, iter) => {
// 	let result = [];

// 	for (const a of iter) {
// 		if (fn(a)) {
// 			result.push(a);
// 		}
// 	}

// 	return result;
// });

export const filter = curry((fn, iter) => {
	let result = [];

	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		if (fn(a)) {
			result.push(a);
		}
	}

	return result;
});

// export const reduce = curry((fn, acc, iter) => {
// 	if (!iter) {
// 		iter = acc[Symbol.iterator]();
// 		acc = iter...value;
// 	}

// 	for (const a of iter) {
// 		acc = fn(acc, a);
// 	}
// 	return acc;
// });

export const reduce = curry((fn, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}

	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		acc = fn(acc, a);
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

// export const take = curry((l, iter) => {
// 	let res = [];

// 	for (const a of iter) {
// 		res.push(a);

// 		if (res.length >= l) {
// 			return res;
// 		}
// 	}

// 	return res;
// });

export const take = curry((l, iter) => {
	console.log('take', { l, iter });
	let res = [];

	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		res.push(a);

		if (res.length >= l) {
			return res;
		}
	}

	return res;
});

L.map = curry(function* (f, iter) {
	console.log('map 2');
	for (const a of iter) {
		console.log('map yield', { a });
		yield f(a);
	}
});

L.filter = curry(function* (f, iter) {
	console.log('filter 1');
	for (const a of iter) {
		console.log('filter yield', { a, f: f(a) });
		if (f(a)) {
			yield a;
		}
	}
});

export const join = curry((sep = ',', iter) =>
	reduce((a, b) => `${a}${sep}${b}`, iter),
);
