export const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

export const add = (a, b) => a + b;

export const curry =
  (fn) =>
  (arg, ...args) =>
    args.length ? fn(arg, ...args) : (...args) => fn(arg, ...args);

export const L = {};

// export const map = curry((fn, iter) => {
// 	let result = [];

// 	for (const a of iter) {
// 		result.push(fn(a));
// 	}

// 	return result;
// });

// 2
// export const map = curry((fn, iter) => {
// 	let result = [];

// 	iter = iter[Symbol.iterator]();
// 	let cur;
// 	while (!(cur = iter.next()).done) {
// 		const a = cur.value;
// 		result.push(fn(a));
// 	}

// 	return result;
// });

// export const filter = curry((fn, iter) => {
// 	let result = [];

// 	for (const a of iter) {
// 		if (fn(a)) {
// 			result.push(a);
// 		}
// 	}

// 	return result;
// });

// 2
// export const filter = curry((fn, iter) => {
// 	let result = [];

// 	iter = iter[Symbol.iterator]();
// 	let cur;
// 	while (!(cur = iter.next()).done) {
// 		const a = cur.value;
// 		if (fn(a)) {
// 			result.push(a);
// 		}
// 	}

// 	return result;
// });

// export const reduce = curry((fn, acc, iter) => {
// 	if (!iter) {
// 		iter = acc[Symbol.iterator]();
// 		acc = iter...value;
// 	}

// 	for (const a of iter) {
// 		acc = fn(acc, a);
// 	}
// 	return acc;
// });

// 1
// export const reduce = curry((fn, acc, iter) => {
// 	if (!iter) {
// 		iter = acc[Symbol.iterator]();
// 		acc = iter.next().value;
// 	}

// 	iter = iter[Symbol.iterator]();
// 	let cur;
// 	while (!(cur = iter.next()).done) {
// 		const a = cur.value;
// 		acc = fn(acc, a);
// 	}
// 	return acc;
// });

// 2
// export const reduce = curry((fn, acc, iter) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     acc = iter.next().value;
//   }

//   iter = iter[Symbol.iterator]();
//   let cur;
//   while (!(cur = iter.next()).done) {
//     const a = cur.value;
//     // acc = fn(acc, a);
//     acc = acc instanceof Promise ? acc.then((acc) => fn(acc, a)) : fn(acc, a);
//   }
//   return acc;
// });

const lift = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const go1 = lift;

export const reduce = curry((fn, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = fn(acc, a);
      if (acc instanceof Promise) {
        return acc.then(recur);
      }
    }
    return acc;
  });
});

export const go = (...args) => {
  return reduce((a, f) => f(a), args);
};

export const pipe =
  (fn, ...fns) =>
  (...args) =>
    go(fn(...args), ...fns);

export const range = (length) => {
  let i = -1;
  const result = [];

  while (++i < length) {
    result.push(i);
  }

  return result;
};

L.range = function* (length) {
  let i = -1;

  while (++i < length) {
    yield i;
  }
};

// export const take = curry((l, iter) => {
// 	let res = [];

// 	for (const a of iter) {
// 		res.push(a);

// 		if (res.length >= l) {
// 			return res;
// 		}
// 	}

// 	return res;
// });

export const take = curry((l, iter) => {
  console.log('take', { l, iter });
  let res = [];

  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);

    if (res.length >= l) {
      return res;
    }
  }

  return res;
});

// 로그를 하나하나 찍기 위한 명령형
// L.map = curry(function* (f, iter) {
// 	console.log('map 2');
// 	for (const a of iter) {
// 		console.log('map yield', { a });
// 		yield f(a);
// 	}
// });
// L.filter = curry(function* (f, iter) {
// 	console.log('filter 1');
// 	for (const a of iter) {
// 		console.log('filter yield', { a, f: f(a) });
// 		if (f(a)) {
// 			yield a;
// 		}
// 	}
// });

L.map = curry(function* (fn, iter) {
  for (const a of iter) {
    yield fn(a);
  }
});
L.filter = curry(function* (fn, iter) {
  for (const a of iter) {
    if (fn(a)) yield a;
  }
});

export const join = curry((sep = ',', iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter),
);

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

export const find = curry((fn, iter) =>
  go(iter, L.filter(fn), take(1), ([a]) => a),
);

// 3
// export const map = curry((fn, iter) => go(
//   iter,
//   L.map(fn),
//   take(Infinity) // take를 통해 모두 가져와준다.
// ))

export const takeAll = take(Infinity);

// map 4
export const map = curry(pipe(L.map, takeAll));

// filter 3
export const filter = curry(pipe(L.filter, takeAll));

const isIterable = (a) => !!a?.[Symbol.iterator];

// L.flatten = function* (iter) {
// 	for (const a of iter) {
// 		if (isIterable(a)) {
// 			// 이터러블이면 추가 작업 해주고 아니면 반환
// 			for (const b of a) {
// 				yield b;
// 			}
// 		} else {
// 			yield a;
// 		}
// 	}
// };

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield* a;
    } else {
      yield a;
    }
  }
};

export const flatten = pipe(L.flatten, takeAll);

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield* f(a);
    } else {
      yield a;
    }
  }
};

L.flatMap = curry(pipe(L.map, L.flatten));

export const flatMap = curry(pipe(L.flatMap, takeAll));
