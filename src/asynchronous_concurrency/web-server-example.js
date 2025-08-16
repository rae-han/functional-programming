// 웹 서버에서의 비동기 I/O 예제

// 가상의 웹 서버 시뮬레이션
class WebServer {
  constructor() {
    this.requests = [];
  }

  // 동기 방식 서버 (문제가 있는 방식)
  handleRequestSync(requestId) {
    console.log(`요청 ${requestId} 처리 시작`);

    // 데이터베이스 조회 시뮬레이션 (실제로는 DB 쿼리)
    const startTime = Date.now();
    while (Date.now() - startTime < 1000) {
      // 1초 동안 CPU 점유 (동기 I/O 시뮬레이션)
    }

    console.log(`요청 ${requestId} 처리 완료`);
    return `응답 ${requestId}`;
  }

  // 비동기 방식 서버 (올바른 방식)
  handleRequestAsync(requestId) {
    console.log(`요청 ${requestId} 처리 시작`);

    return new Promise((resolve) => {
      // 비동기 I/O 작업 시뮬레이션
      setTimeout(() => {
        console.log(`요청 ${requestId} 처리 완료`);
        resolve(`응답 ${requestId}`);
      }, 1000);
    });
  }
}

// 동기 방식 테스트 (문제 상황)
function testSyncServer() {
  console.log('=== 동기 방식 서버 테스트 ===');
  const server = new WebServer();

  console.time('동기 처리 총 시간');

  // 3개의 요청이 동시에 들어옴
  server.handleRequestSync(1);
  server.handleRequestSync(2);
  server.handleRequestSync(3);

  console.timeEnd('동기 처리 총 시간');
  // 결과: 약 3초 (1초 + 1초 + 1초)
}

// 비동기 방식 테스트 (올바른 상황)
async function testAsyncServer() {
  console.log('=== 비동기 방식 서버 테스트 ===');
  const server = new WebServer();

  console.time('비동기 처리 총 시간');

  // 3개의 요청을 동시에 처리
  const promises = [
    server.handleRequestAsync(1),
    server.handleRequestAsync(2),
    server.handleRequestAsync(3),
  ];

  const results = await Promise.all(promises);
  console.log('모든 응답:', results);

  console.timeEnd('비동기 처리 총 시간');
  // 결과: 약 1초 (병렬 처리)
}

// 실행
testSyncServer();
setTimeout(() => {
  console.log('\n');
  testAsyncServer();
}, 4000);
