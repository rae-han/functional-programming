// 이벤트 루프와 비동기 I/O 예제

console.log('1. 메인 스레드 시작');

// 비동기 I/O 작업 (파일 읽기 시뮬레이션)
setTimeout(() => {
  console.log('4. 비동기 I/O 작업 완료 (파일 읽기)');
}, 1000);

// CPU 집약적 작업
console.log('2. CPU 작업 시작');
let result = 0;
for (let i = 0; i < 1000000; i++) {
  result += i;
}
console.log('3. CPU 작업 완료:', result);

// 또 다른 비동기 작업
setTimeout(() => {
  console.log('5. 또 다른 비동기 작업 완료');
}, 500);

console.log('6. 메인 스레드 종료');

// 실행 순서:
// 1. 메인 스레드 시작
// 2. CPU 작업 시작
// 3. CPU 작업 완료
// 6. 메인 스레드 종료
// 5. 또 다른 비동기 작업 완료 (500ms 후)
// 4. 비동기 I/O 작업 완료 (1000ms 후)
