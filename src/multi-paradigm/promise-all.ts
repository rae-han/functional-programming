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
 * promise all
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
 * promise allSettled
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
