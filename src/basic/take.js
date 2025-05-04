import { range } from './fxjs.js';

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

console.log(take(5, range(10)));

export default take;
