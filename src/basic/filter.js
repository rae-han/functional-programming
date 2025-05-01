const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

let result = [];

for (const item of products) {
  if (item.price > 20000) {
    result.push(item);
  }
}

console.log(result);

const filter = (fn, iter) => {
  let result = [];

  for (const item of iter) {
    if (fn(item)) {
      result.push(item);
    }
  }

  return result;
};

console.log(filter((p) => p.price > 20000, products));
