const curry =
	(fn) =>
	(arg, ...args) =>
		args.length ? fn(arg, ...args) : (...args) => fn(arg, ...args);

const add = curry((a, b) => a + b);

console.log(add(1, 2));
console.log(add(1)(2));

export default curry;
