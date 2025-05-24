Promise.resolve(Promise.resolve(Promise.resolve(1))).then(console.log);

new Promise((resolve) => resolve(new Promise((resolve) => resolve(1)))).then(
  console.log,
);
