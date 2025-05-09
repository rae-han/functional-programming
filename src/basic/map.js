import { curry } from './index.js';

const products = [
	{ name: '반팔티', price: 15000 },
	{ name: '긴팔티', price: 20000 },
	{ name: '핸드폰케이스', price: 15000 },
	{ name: '후드티', price: 30000 },
	{ name: '바지', price: 25000 },
];

const map = (fn, iter) => {
	let result = [];

	for (const item of iter) {
		result.push(fn(item));
	}

	return result;
};

console.log(map((p) => p.name, products));

console.log(
	map(
		(p) => p.name,
		(function* () {
			yield { name: '반팔티', price: 15000 };
			yield { name: '긴팔티', price: 20000 };
			yield { name: '바지', price: 25000 };
		})(),
	),
);

export default curry(map);
