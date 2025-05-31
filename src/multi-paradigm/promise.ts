function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

delay(100, 1);

delay(100, 2)
  .then((result) => console.log(result))
  .then(() => delay(100, 3))
  .then((result) => console.log(result));

(async () => {
  const result = await delay(100, 4);
  console.log(result);
})();

function getRandomValue<T>(a: T, b: T): T {
  const randomIndex = Math.floor(Math.random() * 2);
  return randomIndex === 0 ? a : b;
}

type User = {
  name: string;
};

function getFriends(): Promise<User[]> {
  return delay(getRandomValue(60, 6_000), [
    { name: 'Marty' },
    { name: 'Michael' },
    { name: 'Sarah' },
  ]);
}

const result = await Promise.race([getFriends(), delay(2_000, 'timeout')]);

if (result === 'timeout') {
  console.log('The current network environment is not stable.');
} else {
  const friends = result as User[];
  console.log(
    'Friend list rendering:',
    friends.map(({ name }) => `<li>${name}</li>`),
  );
}

function toggleLoadingIndicator(show: boolean): void {
  if (show) {
    console.log('append loading...');
  } else {
    console.log('remove loading...');
  }
}

async function renderFriendsPicker(): Promise<void> {
  const friendsPromise = getFriends();

  const result = await Promise.race([friendsPromise, delay(100, 'isSlow')]);

  if (result === 'isSlow') {
    toggleLoadingIndicator(true);
    await friendsPromise;
    toggleLoadingIndicator(false);
  }

  const friends = await friendsPromise;
  console.log(
    'Friend list rendering:',
    friends.map(({ name }) => `<li>${name}</li>`),
  );
}

await renderFriendsPicker();
// If the response is fast (random)
// After 0.06 seconds
// Friend list rendering: <li>Marty</li><li>Michael</li><li>Sarah</li>

await renderFriendsPicker();
// If the response is slow (random)
// append loading...
// After 6 seconds
// remove loading...
// Friend list rendering: <li>Marty</li><li>Michael</li><li>Sarah</li>
