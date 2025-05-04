import { filter, go, map, reduce } from './index.js';

const products = [
	{ name: '반팔티', price: 15000 },
	{ name: '긴팔티', price: 20000 },
	{ name: '핸드폰케이스', price: 15000 },
	{ name: '후드티', price: 30000 },
	{ name: '바지', price: 25000 },
];

const add = (a, b) => a + b;

console.log(
	reduce(
		add,
		map(
			(p) => p.price,
			filter((p) => p.price < 20000, products),
		),
	),
);

console.log(11111, 'go');

go(
	products,
	(products) => filter((p) => p.price < 20000, products),
	(products) => map((p) => p.price, products),
	(price) => reduce(add, price),
	(total_price) => console.log(2222, total_price),
);

go(
	products,
	(products) => filter((p) => p.price < 20000)(products),
	(products) => map((p) => p.price)(products),
	(price) => reduce(add)(price),
	(total_price) => console.log(total_price),
);

go(
	products,
	filter((p) => p.price < 20000),
	map((p) => p.price),
	reduce(add),
	console.log,
);

const total_price = pipe(
	map((p) => p.price),
	reduce(add),
);

const base_total_price = (predicate) => pipe(filter(predicate), total_price);

go(
	products,
	base_total_price((p) => p.price < 20000),
	console.log,
);

go(
	products,
	base_total_price((p) => p.price >= 20000),
	console.log,
);
