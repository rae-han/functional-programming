import { L, map } from './fxjs.js';

const value = [
	[1, 2],
	[3, 4],
	[6, 7, 8],
];
const it = L.flatMap(map((a) => a * a))(value);

console.log([...it]);
