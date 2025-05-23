const g = a => a + 1;
const f = a => a * a;

console.log([1].map(g).map(f));

Array.of(1).map(g).map(f).forEach(r => console.log(r)); 
Promise.resolve(1).then(g).then(f).then(r => console.log(r))

Array.of().map(g).map(f).forEach(r => console.log(r)); // 출력 없음
Promise.resolve().then(g).then(f).then(r => console.log(r)) // NaN

new Promise(resolve => setTimeout(() => resolve(1), 100)).then(g).then(f).then(r => console.log(r)); // 4