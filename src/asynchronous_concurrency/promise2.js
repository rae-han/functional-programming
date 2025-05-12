const go1 = (a, f) => f(a);
const add5 = a => a + 5;

console.log(go1(10, add5));

console.log(go1(Promise.resolve(10), add5)); // [object Promise]5

const delay100 = a => new Promise(resolve => setTimeout(() => resolve(a), 100));

console.log(go1(delay100(10), add5)); // [object Promise]15
