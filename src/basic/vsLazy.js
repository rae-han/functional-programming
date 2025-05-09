import { filter, go, map, L, range, take } from './fxjs.js';

go(
	range(10),
	map((n) => n + 1),
	filter((n) => n % 2),
	take(2),
	console.log,
);

go(
	L.range(10),
	L.map((n) => n + 1),
	L.filter((n) => n % 2),
	take(2),
	console.log,
);
