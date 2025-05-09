import { go, map, pipe, reduce } from './fxjs.js';

const obj = {
	limit: 10,
	offset: 10,
	type: 'notice',
};

const queryStr1 = (obj) =>
	go(
		obj,
		Object.entries,
		map(([k, v]) => `${k}=${v}`),
		reduce((acc, cur) => `${acc}&${cur}`),
		console.log,
	);
queryStr1(obj);

const queryStr = pipe(
	Object.entries,
	map(([k, v]) => `${k}=${v}`),
	reduce((acc, cur) => `${acc}&${cur}`),
);

console.log(queryStr(obj));
