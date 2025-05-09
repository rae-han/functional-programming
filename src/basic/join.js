import { join, L } from './fxjs';
import pipe from './pipe';

const obj = {
	limit: 10,
	offset: 10,
	type: 'notice',
};

const queryStr = pipe(
	Object.entries,
	L.map(([k, v]) => `${k}=${v}`),
	function (a) {
		console.log(a);
		return a;
	},
	join('&'),
);

console.log(queryStr(obj));
