import { filter, go, take, L, find } from './fxjs.js';

const users = [
	{ age: 32 },
	{ age: 31 },
	{ age: 37 },
	{ age: 28 },
	{ age: 25 },
	{ age: 32 },
	{ age: 31 },
	{ age: 37 },
];

// const find = (fn, iter) =>
// 	go(
// 		iter,
// 		L.filter((a) => (console.log(a), fn(a))),
// 		take(1),
// 		([a]) => a,
// 	);

console.log(find((user) => user.age < 30, users));

console.log(find((user) => user.age < 30)(users));
