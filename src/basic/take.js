import { L, range } from './fxjs.js';

const take = (l, iter) => {
	let res = [];

	for (const a of iter) {
		res.push(a);

		if (res.length >= l) {
			return res;
		}
	}

	return res;
};

console.log(take(5, range(100)));
console.log(take(5, L.range(100)));

export default take;
