import { delay } from './fx-iterable';

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

// (1)
for await (const a of toAsync([1, 2])) {
  console.log(a);
}

// (2)
for await (const a of toAsync([Promise.resolve(1), Promise.resolve(2)])) {
  console.log(a);
}

// (3)
for await (const a of [1, 2]) {
  console.log(a);
}

// (4)
for await (const a of [Promise.resolve(1), Promise.resolve(2)]) {
  console.log(a);
}
