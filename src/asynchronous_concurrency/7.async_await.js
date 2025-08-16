const delay500 = (a, time = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(a), time));

async function f1() {
  const a = await delay500(10);
  const b = await delay500(20);

  return a + b;
}
console.log(f1());
// f1().then(console.log);
