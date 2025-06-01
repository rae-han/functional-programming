import { delay } from '.';
import { fromAsync, fx } from './fx-iterable';

/**
 *
 */
// type File = {
//   name: string;
//   body: string;
//   size: number;
// };

// function getFile(name: string, size = 1000): Promise<File> {
//   return delay(size, { name, body: '...', size });
// }

// async function test() {
//   const files: File[] = await Promise.all([
//     getFile('img.png'),
//     getFile('book.pdf'),
//     getFile('index.html'),
//     getFile('img.png'),
//     getFile('book.pdf'),
//     getFile('index.html'),
//   ]);

//   console.log(files);
// }

// await test();

/**
 *
 */
// type File = {
//   name: string;
//   body: string;
//   size: number;
// };

// function getFile(name: string, size = 1000): Promise<File> {
//   return delay(size, { name, body: '...', size });
// }

// async function executeWithLimit<T>(
//   promises: Promise<T>[],
//   limit: number,
// ): Promise<T[]> {
//   const result1 = await Promise.all([promises[0], promises[1], promises[2]]);
//   const result2 = await Promise.all([promises[3], promises[4], promises[5]]);
//   return [...result1, ...result2];
// }

// async function test() {
//   const files: File[] = await executeWithLimit(
//     [
//       getFile('img.png'),
//       getFile('book.pdf'),
//       getFile('index.html'),
//       getFile('img.png'),
//       getFile('book.pdf'),
//       getFile('index.html'),
//     ],
//     3,
//   );

//   console.log(files);
// }

// await test();

/**
 *
 */
type File = {
  name: string;
  body: string;
  size: number;
};

function getFile(name: string, size = 1000): Promise<File> {
  console.log(`${name} start`);
  return delay(size, { name, body: '...', size });
}

// async function executeWithLimit<T>(
//   promises: Promise<T>[],
//   limit: number,
// ): Promise<T[]> {
//   const result1 = await Promise.all([promises[0], promises[1], promises[2]]);
//   const result2 = await Promise.all([promises[3], promises[4], promises[5]]);
//   return [...result1, ...result2];
// }

// async function test() {
//   const promises = [
//     getFile('1-img.png'),
//     getFile('2-book.pdf'),
//     getFile('3-index.html'),
//     getFile('4-img2.png'),
//     getFile('5-book.pdf'),
//     getFile('6-index.html'),
//   ];

//   const files: File[] = await executeWithLimit(promises, 3);

//   console.log(files);
// }

// await test();

/**
 *
 */
// async function executeWithLimit<T>(
//   fs: (() => Promise<T>)[],
//   limit: number,
// ): Promise<T[]> {
//   const result1 = await Promise.all([fs[0](), fs[1](), fs[2]()]);
//   const result2 = await Promise.all([fs[3](), fs[4](), fs[5]()]);
//   return [...result1, ...result2];
// }

// async function test() {
//   const files: File[] = await executeWithLimit(
//     [
//       () => getFile('1-img.png'),
//       () => getFile('2-book.pdf'),
//       () => getFile('3-index.html'),
//       () => getFile('4-img2.png'),
//       () => getFile('5-book.pdf'),
//       () => getFile('6-index.html'),
//     ],
//     3,
//   );

//   console.log(files);
// }

// await test();

/**
 *
 */
// async function executeWithLimit<T>(
//   fs: (() => Promise<T>)[],
//   limit: number,
// ): Promise<T[]> {
//   const results: T[] = [];

//   for (let i = 0; i < fs.length; i += limit) {
//     const batchPromises: Promise<T>[] = [];

//     for (let j = 0; j < limit && i + j < fs.length; j++) {
//       batchPromises.push(fs[i + j]());
//     }

//     const batchResults = await Promise.all(batchPromises);
//     results.push(...batchResults);
//   }

//   return results;
// }

// async function test() {
//   const files: File[] = await executeWithLimit(
//     [
//       () => getFile('1-img.png'),
//       () => getFile('2-book.pdf'),
//       () => getFile('3-index.html'),
//       () => getFile('4-img2.png'),
//       () => getFile('5-book.pdf'),
//       () => getFile('6-index.html'),
//       () => getFile('7-img.png'),
//     ],
//     3,
//   );

//   console.log(files);
// }

// await test();

/**
 *
 */
// fx([1, 2, 3, 4, 5])
//   .chunk(2)
//   .map((arr) => arr.map((a) => a * 10)) // [arr: number[]], [a: number]
//   .forEach((arr) => console.log(arr));

const executeWithLimit = <T>(
  fs: (() => Promise<T>)[],
  limit: number,
): Promise<T[]> =>
  fx(fs)
    .chunk(limit)
    .map((fs) => fs.map((f) => f()))
    .map((ps) => Promise.all(ps))
    .to(fromAsync)
    .then((arr) => arr.flat());

async function test() {
  const files: File[] = await executeWithLimit(
    [
      () => getFile('1-img.png'),
      () => getFile('2-book.pdf'),
      () => getFile('3-index.html'),
      () => getFile('4-img2.png'),
      () => getFile('5-book.pdf'),
      () => getFile('6-index.html'),
      () => getFile('7-img.png'),
    ],
    3,
  );

  console.log(files);
}

await test();
