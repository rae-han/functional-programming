import { C, go, L, filter, map, reduce, take } from '../fxjs';
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

// go(f3([1, 2, 3, 4, 5, 6, 7, 8]), console.log); // 38

async function f4(list) {
  let temp = [];
  for (const a of list) {
    const b = await delay(a * a);
    if (await delay(b % 2)) {
      const c = await delay(b + 1);
      temp.push(c);
      if (temp.length == 3) break;
    }
  }
  let res = temp[0],
    i = 0;
  while (++i < temp.length) {
    res = await delay(res + temp[i]);
  }
  return res;
}

// go(f4([1, 2, 3, 4, 5, 6, 7, 8]), console.log); // 38

async function f5(list) {
  const r1 = await go(
    list,
    L.map((a) => delay(a * a)),
    L.filter((a) => delay(a % 2)),
    L.map((a) => delay(a + 1)),
    C.take(2),
    reduce((a, b) => delay(a + b)),
  );

  const r2 = await go(
    list,
    L.map((a) => delay(a * a)),
    L.filter((a) => delay(a % 2)),
    reduce((a, b) => delay(a + b)),
  );

  const r3 = await delay(r1 + r2);

  return r3 + 10;
}

// go(f5([1, 2, 3, 4, 5, 6, 7, 8]), (a) => console.log(a, 'f5'));

function f7(list = []) {
  try {
    return list
      .map((a) => JSON.parse(a))
      .filter((a) => a % 2)
      .slice(0, 2);
  } catch (error) {
    return [];
  }
}

// console.log(f7(['1', '2', '3', '4'])); // [1, 3]
// console.log(f7(['1', '2', '3', '%'])); // []

function f8(list = []) {
  try {
    return list
      .map(
        (a) =>
          new Promise((resolve) => {
            resolve(JSON.parse(a));
          }),
      )
      .filter((a) => a % 2)
      .slice(0, 2);
  } catch (error) {
    console.log('error!!', error);
    return [];
  }
}

// console.log(f8(['1', '2', '3', '4']));

// const p = new Promise((resolve) => {
//   resolve(JSON.parse('{'));
// });
// console.log(p); // Promise { <rejected> ReferenceError: asdf is not defined }

// const p = new Promise((resolve) => {
//   resolve(JSON.parse('{'));
// });
// console.log(p); // Promise { <rejected> SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2) }

async function f9(list = []) {
  try {
    return await list
      .map(
        async (a) =>
          await new Promise((resolve) => {
            resolve(JSON.parse(a));
          }),
      )
      .filter((a) => a % 2)
      .slice(0, 2);
  } catch (error) {
    console.log('error!!', error);
    return [];
  }
}

// console.log(f9(['1', '2', '3', '4']).then(console.log).catch(console.log));

async function f10(list) {
  try {
    return go(
      list,
      map((a) => new Promise((resolve) => resolve(JSON.parse(a)))),
      filter((a) => a % 2),
      take(2),
    );
  } catch (error) {
    console.log('error!!', error);
    return [];
  }
}

console.log(
  f10(['1', '2', '3', '?'])
    .then(console.log)
    .catch((error) => console.log('에러 핸들링 하겠다', error)),
);
