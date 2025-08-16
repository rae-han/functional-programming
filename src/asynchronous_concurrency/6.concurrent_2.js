import { curry, go, L, C, delay1000 } from '../fxjs';

C.map((a) => delay1000(a * a), [1, 2, 3]).then(console.log);
C.filter((a) => delay1000(a % 2), [1, 2, 3]).then(console.log);
