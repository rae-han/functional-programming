const add10 = (a) => {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(a + 10),
      100,
    ),
  );
};

const promise = add10(1).then(
  console.log,
);

add10(1)
  .then(add10)
  .then(add10)
  .then(console.log);

const a = add10(1);
const b = a.then((v) => v + 5);
const c = b.then((v) => v + 5);
const d = c.then((v) => v + 5);
d.then(console.log);
