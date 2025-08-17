import { go, L, map, reduce, take } from '../fxjs';
/**
 * Array.prototype.map을 안쓰고 FxJS의 map 함수가 필요한 이유
 */

export const delay = (a, time = 100) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(a);
    }, time),
  );

async function fn1() {
  const list = [1, 2, 3, 4];
  const response = list.map(async (a) => await delay(a * a)); // 1
  console.log(response); // [Promise { <pending> }, Promise { <pending> }, Promise { <pending> }, Promise { <pending> }]
  const result = await response;
  console.log(result);
}
// fn1();

async function fn2() {
  const list = [1, 2, 3, 4];
  const response = map((a) => delay(a * a), list); // 2
  console.log(response); // Promise { <pending> }
  const result = await response;
  console.log(result);
}
// fn2();

/**
 * async/await로 비동기 제어가 가능한데 왜 파이프라인이 필요한가?
 */
function f3(list) {
  return go(
    list,
    L.map((a) => delay(a * a)),
    L.filter((a) => a % 2),
    L.map((a) => delay(a + 1)),
    take(3),
    reduce((a, b) => delay(a + b)),
  );
}

go(f3([1, 2, 3, 4, 5, 6, 7, 8]), console.log); // 38
