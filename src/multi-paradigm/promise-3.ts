import { delay, fromAsync } from './fx-iterable';

interface IteratorYieldResult<T> {
  done?: false;
  value: T;
}

interface IteratorReturnResult {
  done: true;
  value: undefined;
}

interface AsyncIterator<T> {
  next(): Promise<IteratorYieldResult<T> | IteratorReturnResult>;
}

interface AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
}

interface AsyncIterableIterator<T> extends AsyncIterator<T> {
  [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}

/**
 * AsyncGenerator
 */
// async function* stringsAsyncTest(): AsyncIterableIterator<string> {
//   yield delay(1000, 'a');

//   const b = (await delay(500, 'b')) + 'c';

//   yield b;
// }

// async function test() {
//   const asyncIterator: AsyncIterableIterator<string> = stringsAsyncTest();
//   const result1 = await asyncIterator.next();
//   console.log(result1.value); // a

//   const result2 = await asyncIterator.next();
//   console.log(result2.value); // bc

//   const { done } = await asyncIterator.next();
//   console.log(done); // true
// }

// await test();

/**
 * toAsync with async iterator
 */
// function toAsync<T>(
//   iterable: Iterable<T | Promise<T>>,
// ): AsyncIterable<Awaited<T>> {
//   return {
//     [Symbol.asyncIterator](): AsyncIterator<Awaited<T>> {
//       const iterator = iterable[Symbol.iterator]();
//       return {
//         async next() {
//           const { done, value } = iterator.next();
//           return done ? { done, value } : { done, value: await value };
//         },
//       };
//     },
//   };
// }

// async function test() {
//   const asyncIterable = toAsync([1]);
//   const asyncIterator = asyncIterable[Symbol.asyncIterator]();
//   await asyncIterator.next().then(({ value }) => console.log(value));

//   const asyncIterable2 = toAsync([Promise.resolve(2)]);
//   const asyncIterator2 = asyncIterable2[Symbol.asyncIterator]();
//   await asyncIterator2.next().then(({ value }) => console.log(value));
// }

// await test();

/**
 * toAsync with async genrator
 */
async function* toAsync<T>(
  iterable: Iterable<T | Promise<T>>,
): AsyncIterableIterator<Awaited<T>> {
  for await (const value of iterable) {
    yield value;
  }
}

// // (1)
// for await (const a of toAsync([1, 2])) {
//   console.log(a);
// }

// // (2)
// for await (const a of toAsync([Promise.resolve(1), Promise.resolve(2)])) {
//   console.log(a);
// }

// // (3)
// for await (const a of [1, 2]) {
//   console.log(a);
// }

// // (4)
// for await (const a of [Promise.resolve(1), Promise.resolve(2)]) {
//   console.log(a);
// }

/**
 *
 */
// function mapSync<A, B>(
//   f: (a: A) => B,
//   iterable: Iterable<A>,
// ): IterableIterator<B> {
//   const iterator = iterable[Symbol.iterator]();
//   return {
//     next() {
//       const { done, value } = iterator.next();
//       return done ? { done, value } : { done, value: f(value) }; // [value: B], [const value: A]
//     },
//     [Symbol.iterator]() {
//       return this;
//     },
//   };
// }

// function mapAsync<A, B>(
//   f: (a: A) => B,
//   asyncIterable: AsyncIterable<A>,
// ): AsyncIterableIterator<Awaited<B>> {
//   const asyncIterator = asyncIterable[Symbol.asyncIterator]();
//   return {
//     async next() {
//       const { done, value } = await asyncIterator.next();
//       return done
//         ? { done: true, value: undefined }
//         : { done: false, value: await f(value) };
//     },
//     [Symbol.asyncIterator]() {
//       return this;
//     },
//   };
// }

// async function* strings(): AsyncIterableIterator<string> {
//   yield delay(500, 'a');
//   yield delay(200, 'b');
// }

// const mapped = mapAsync((a) => a.toUpperCase(), strings()); // [a: string]

// for await (const a of mapped) {
//   console.log(a); // [const a: string]
// }

/**
 *
 */
// function mapSync<A, B>(
//   f: (a: A) => B,
//   iterable: Iterable<A>,
// ): IterableIterator<B> {
//   const iterator = iterable[Symbol.iterator]();
//   return {
//     next() {
//       const { done, value } = iterator.next();
//       return done ? { done, value } : { done, value: f(value) }; // [value: B], [const value: A]
//     },
//     [Symbol.iterator]() {
//       return this;
//     },
//   };
// }

// function mapAsync<A, B>(
//   f: (a: A) => B,
//   asyncIterable: AsyncIterable<A>,
// ): AsyncIterableIterator<Awaited<B>> {
//   const asyncIterator = asyncIterable[Symbol.asyncIterator]();
//   return {
//     async next() {
//       const { done, value } = await asyncIterator.next();
//       return done
//         ? { done: true, value }
//         : { done: false, value: await f(value) }; // [value: Awaited<B>] [value: A]
//     },
//     [Symbol.asyncIterator]() {
//       return this;
//     },
//   };
// }

// async function* strings(): AsyncIterableIterator<string> {
//   yield delay(500, 'a');
//   yield delay(200, 'b');
// }

// const mapped = mapAsync((a) => a.toUpperCase(), strings()); // [a: string]

// for await (const a of mapped) {
//   console.log(a); // [const a: string]
// }

/**
 *
 */
function* mapSync<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A>,
): IterableIterator<B> {
  for (const value of iterable) {
    yield f(value);
  }
}

async function* mapAsync<A, B>(
  f: (a: A) => B,
  asyncIterable: AsyncIterable<A>,
): AsyncIterableIterator<Awaited<B>> {
  for await (const value of asyncIterable) {
    yield f(value);
  }
}

async function* numbers(): AsyncIterableIterator<number> {
  yield 1;
  yield 2;
}

for await (const a of mapAsync((a) => a * 2, numbers())) {
  console.log(a);
}

for await (const a of mapAsync((a) => a * 2, toAsync([1, 2]))) {
  console.log(a);
}

for await (const a of mapAsync((a) => delay(100, a * 2), toAsync([1, 2]))) {
  console.log(a);
}

function* filterSync<A>(
  f: (a: A) => boolean,
  iterable: Iterable<A>,
): IterableIterator<A> {
  for (const value of iterable) {
    if (f(value)) {
      yield value;
    }
  }
}

async function* filterAsync<A>(
  f: (a: A) => boolean | Promise<boolean>,
  asyncIterable: AsyncIterable<A>,
): AsyncIterableIterator<A> {
  for await (const value of asyncIterable) {
    if (await f(value)) {
      yield value;
    }
  }
}

for await (const a of filterAsync((a) => a % 2 === 1, toAsync([1, 2, 3]))) {
  console.log(a);
}

for await (const a of filterAsync(
  (a) => delay(100, a % 2 === 1),
  toAsync([1, 2, 3]),
)) {
  console.log(a);
}

function isIterable<T = unknown>(a: Iterable<T> | unknown): a is Iterable<T> {
  return typeof a?.[Symbol.iterator] === 'function';
}

function map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B>;
function map<A, B>(
  f: (a: A) => B,
  asyncIterable: AsyncIterable<A>,
): AsyncIterableIterator<Awaited<B>>;
function map<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A> | AsyncIterable<A>,
): IterableIterator<B> | AsyncIterableIterator<Awaited<B>> {
  return isIterable(iterable)
    ? mapSync(f, iterable) // [iterable: Iterable<A>]
    : mapAsync(f, iterable); // [iterable: AsyncIterable<A>]
}

const iter1: IterableIterator<string> = map((a: number) => a.toFixed(), [1, 2]);

const iter2: IterableIterator<Promise<string>> = map(
  (a: number) => Promise.resolve(a.toFixed()),
  [1, 2],
);

const iter3: AsyncIterableIterator<string> = map(
  (a: number) => a.toFixed(),
  toAsync([1, 2]),
);

const iter4: AsyncIterableIterator<string> = map(
  (a: number) => Promise.resolve(a.toFixed()),
  toAsync([1, 2]),
);

const iter5: AsyncIterableIterator<string> = map(
  (a: number) => a.toFixed(),
  toAsync([Promise.resolve(1), Promise.resolve(2)]),
);

const iter6: AsyncIterableIterator<string> = map(
  (a: number) => Promise.resolve(a.toFixed()),
  toAsync([Promise.resolve(1), Promise.resolve(2)]),
);

console.log({
  iter1,
  iter2,
  iter3,
  iter4,
  iter5,
  iter6,
});

// (1)
console.log([...map((a) => a * 10, [1, 2])]);
// [10, 20]

// (2)
for await (const a of map((a) => delay(100, a * 10), toAsync([1, 2]))) {
  console.log(a);
}

// (3)
console.log(await fromAsync(map((a) => delay(100, a * 10), toAsync([1, 2]))));

// (4)
console.log(await Promise.all(map((a) => delay(100, a * 10), [1, 2])));

function filter<A>(
  f: (a: A) => boolean,
  iterable: Iterable<A>,
): IterableIterator<A>;
function filter<A>(
  f: (a: A) => boolean | Promise<boolean>,
  asyncIterable: AsyncIterable<A>,
): AsyncIterableIterator<A>;
function filter<A>(
  f: (a: A) => boolean | Promise<boolean>,
  iterable: Iterable<A> | AsyncIterable<A>,
): IterableIterator<A> | AsyncIterableIterator<A> {
  return isIterable(iterable)
    ? filterSync(f as (a: A) => boolean, iterable)
    : filterAsync(f, iterable);
}
