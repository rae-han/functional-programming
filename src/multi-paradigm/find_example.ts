import { filter } from './fx-iterable';

// 1
// function find<A>(f: (a: A) => boolean, iterable: Iterable<A>): A | undefined {
//   return filter(f, iterable).next().value;
//   // 아래와 같이 구현할 수도 있습니다.
//   // const [head] = filter(f, iterable);
//   // return head;
// }

// 2
const head = <A>(iterable: Iterable<A>): A | undefined =>
  iterable[Symbol.iterator]().next().value;
// 아래와 같이 구현할 수도 있습니다.
// const head = <A>([a]: Iterable<A>): A | undefined => a;

const find = <A>(f: (a: A) => boolean, iterable: Iterable<A>): A | undefined =>
  head(filter(f, iterable));

// [const result: number | undefined]
const result = find((a) => a > 2, [1, 2, 3, 4]);
console.log(result);
// 3

const isOdd = (a: number) => a % 2 === 1;

const result2 = find(isOdd, [2, 4, 6]); // [const result2: number | undefined]
console.log(result2);
// undefined
