import { join, L } from './fxjs.js';
import pipe from './pipe.js';

const obj = {
	limit: 10,
	offset: 10,
	type: 'notice',
};

const queryStr = pipe(
	Object.entries,
	(a) => (console.log(a), a),
	L.map(([k, v]) => `${k}=${v}`),
	join('&'),
);

console.log(queryStr(obj));
