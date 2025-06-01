function forEach(f, iterable) {
  for (const value of iterable) {
    f(value);
  }
}

// function* map(f, iterable) {
//   for (const value of iterable) {
//     yield f(value);
//   }
// }

// function* filter(f, iterable) {
//   for (const value of iterable) {
//     if (f(value)) {
//       yield value;
//     }
//   }
// }

function baseReduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterator: Iterator<A>,
): Acc {
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    acc = f(acc, value);
  }
  return acc;
}

// (1)
function reduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterable: Iterable<A>,
): Acc;
// (2)
function reduce<A, Acc>(f: (a: A, b: A) => Acc, iterable: Iterable<A>): Acc;
function reduce<A, Acc>(
  f: (a: Acc | A, b: A) => Acc,
  accOrIterable: Acc | Iterable<A>,
  iterable?: Iterable<A>,
): Acc {
  if (iterable === undefined) {
    // (3)
    const iterator = (accOrIterable as Iterable<A>)[Symbol.iterator]();
    const { done, value: acc } = iterator.next();
    if (done)
      throw new TypeError("'reduce' of empty iterable with no initial value");
    return baseReduce(f as (acc: Acc, a: A) => Acc, acc as Acc, iterator);
  } else {
    // (4)
    return baseReduce(
      f as (acc: Acc, a: A) => Acc,
      accOrIterable as Acc,
      iterable[Symbol.iterator](),
    );
  }
}

function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
    if (--limit === 0) break;
  }
}

function* chunk<T>(size: number, iterable: Iterable<T>): IterableIterator<T[]> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const arr = [
      ...take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    ];
    if (arr.length) yield arr;
    if (arr.length < size) break;
  }
}

async function fromAsync<T>(
  iterable: Iterable<Promise<T>> | AsyncIterable<T>,
): Promise<T[]> {
  const arr: T[] = [];
  for await (const a of iterable) {
    arr.push(a);
  }
  return arr;
}

async function* toAsync<T>(
  iterable: Iterable<T | Promise<T>>,
): AsyncIterableIterator<Awaited<T>> {
  for await (const value of iterable) {
    yield value;
  }
}

function isIterable<T = unknown>(a: Iterable<T> | unknown): a is Iterable<T> {
  return typeof a?.[Symbol.iterator] === 'function';
}

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

function fx<A>(iterable: Iterable<A>): FxIterable<A> {
  return new FxIterable(iterable);
}

class FxIterable<A> {
  constructor(private iterable: Iterable<A>) {}

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]();
  }

  map<B>(f: (a: A) => B): FxIterable<B> {
    return fx(map(f, this));
  }

  filter(f: (a: A) => boolean) {
    return fx(filter(f, this)); // <-- before: return fx(filter(f, this.iterable));
  }

  forEach(f: (a: A) => void): void {
    return forEach(f, this);
  }

  reduce<Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc): Acc {
    return reduce(f, acc, this);
  }

  toArray() {
    return [...this]; // <-- before: return [...this.iterable];
  }

  to<R>(converter: (iterable: this) => R): R {
    return converter(this); // <-- before: return converter(this.iterable);
  }

  take(limit: number): FxIterable<A> {
    return fx(take(limit, this)); // new FxIterable(take(limit, this));
  }

  chunk(size: number) {
    return fx(chunk(size, this));
  }
}

const [first, sencond] = fx([1, 2, 3, 4])
  .map((x) => x * 2)
  .toArray();

function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

export { map, filter, reduce, take, fx, forEach, delay, chunk, fromAsync };

export default FxIterable;
