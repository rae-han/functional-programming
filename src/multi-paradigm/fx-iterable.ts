function forEach(f, iterable) {
  for (const value of iterable) {
    f(value);
  }
}

function* map(f, iterable) {
  for (const value of iterable) {
    console.log(1111, { value });
    yield f(value);
  }
}

function* filter(f, iterable) {
  for (const value of iterable) {
    if (f(value)) {
      yield value;
    }
  }
}

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
}

const [first, sencond] = fx([1, 2, 3, 4])
  .map((x) => x * 2)
  .toArray();
console.log(first, sencond);
