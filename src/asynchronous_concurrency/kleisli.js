import { find } from '../fxjs.js';

const users = [
  { id: 1, name: 'AA' },
  { id: 2, name: 'BB' },
  { id: 3, name: 'CC' },
];

const getUserById = (id) =>
  find((user) => user.id === id, users);
const getName = ({ name }) => name;

const f = getName;
const g = getUserById;

// const fg = (id) => f(g(id));

// console.log(fg(2) === fg(2)); // true

// const before = fg(2);

// users.pop();
// users.pop();

// const after = fg(2);

// console.log(before == after);

const fg = (id) =>
  Promise.resolve(id).then(g).then(f);

fg(2).then(console.log);

users.pop();
users.pop();

fg(2).then(console.log);
