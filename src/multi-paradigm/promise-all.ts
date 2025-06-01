import { delay } from '.';

type File = {
  name: string;
  body: string;
  size: number;
};

function getFile(name: string, size = 1000): Promise<File> {
  return delay(size, { name, body: '...', size });
}

/**
 * Promise.all
 */
// const files = await Promise.all([
//   getFile('img.png', 500),
//   getFile('book.pdf', 1000),
//   getFile('index.html', 1500),
// ]);

// console.log(files);

// try {
//   const files = await Promise.all([
//     getFile('img.png', 500),
//     getFile('book.pdf', 1000),
//     getFile('index.html', 1500),
//     delay(500, Promise.reject('파일 다운로드 실패!')),
//   ]);

//   console.log(files); // 실행되지 않음
// } catch (error) {
//   console.error(error); // 약 500ms 뒤 파일 다운로드 실패!
// }

/**
 * Promise.allSettled
 */
// const files = await Promise.allSettled([
//   getFile('img.png'),
//   getFile('book.pdf'),
//   getFile('index.html'),
//   Promise.reject('File download failed'),
// ]);

// console.log(files);
// // After about 1,000ms:
// // [
// //   { status: 'fulfilled', value: { name: 'img.png', body: '...', size: 1000 } },
// //   { status: 'fulfilled', value: { name: 'book.pdf', body: '...', size: 1000 } },
// //   { status: 'fulfilled', value: { name: 'index.html', body: '...', size: 1000 } },
// //   { status: 'rejected', reason: 'File download failed' }
// // ]

/**
 * Promise.allSettled before ES11
 */
// const settlePromise = <T>(promise: Promise<T>) =>
//   promise
//     .then((value) => ({ status: 'fulfilled', value }))
//     .catch((reason) => ({ status: 'rejected', reason }));

// const files = await Promise.all(
//   [
//     getFile('img.png'),
//     getFile('book.pdf'),
//     getFile('index.html'),
//     Promise.reject('File download failed'),
//   ].map(settlePromise),
// );

// console.log(files);

/**
 * Promise.any
 */
const files = await Promise.any([
  getFile('img.png', 1500),
  getFile('book.pdf', 700),
  getFile('index.html', 900),
  new Promise((_, reject) =>
    setTimeout(() => reject('File download failed'), 100),
  ),
]);

console.log(files);
// After about 700ms
// { name: 'book.pdf', body: '...', size: 700 }

const allRejectedFiles = await Promise.any([
  delay(200, Promise.reject('File download failed')),
  delay(100, Promise.reject('File download failed')),
]);

console.log(allRejectedFiles);
// After about 200ms
// Uncaught (in promise) AggregateError: All promises were rejected
