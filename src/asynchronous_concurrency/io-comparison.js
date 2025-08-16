// 동기 vs 비동기 I/O 비교 예제

// 동기 방식 (블로킹)
function synchronousExample() {
  console.log('=== 동기 방식 ===');
  console.time('동기 처리 시간');

  // 파일 읽기 시뮬레이션 (실제로는 fs.readFileSync 사용)
  console.log('1. 첫 번째 파일 읽기 시작');
  setTimeout(() => {
    console.log('2. 첫 번째 파일 읽기 완료');

    console.log('3. 두 번째 파일 읽기 시작');
    setTimeout(() => {
      console.log('4. 두 번째 파일 읽기 완료');
      console.timeEnd('동기 처리 시간');
    }, 1000);
  }, 1000);
}

// 비동기 방식 (논블로킹)
function asynchronousExample() {
  console.log('=== 비동기 방식 ===');
  console.time('비동기 처리 시간');

  // 두 파일을 동시에 읽기
  console.log('1. 첫 번째 파일 읽기 시작');
  console.log('2. 두 번째 파일 읽기 시작');

  let completedCount = 0;

  setTimeout(() => {
    console.log('3. 첫 번째 파일 읽기 완료');
    completedCount++;
    if (completedCount === 2) {
      console.timeEnd('비동기 처리 시간');
    }
  }, 1000);

  setTimeout(() => {
    console.log('4. 두 번째 파일 읽기 완료');
    completedCount++;
    if (completedCount === 2) {
      console.timeEnd('비동기 처리 시간');
    }
  }, 1000);
}

// 실행
synchronousExample();
setTimeout(() => {
  console.log('\n');
  asynchronousExample();
}, 3000);

// 결과:
// 동기 방식: 총 2초 소요 (1초 + 1초)
// 비동기 방식: 총 1초 소요 (병렬 처리)
