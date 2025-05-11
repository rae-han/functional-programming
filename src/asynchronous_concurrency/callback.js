const add10 = (a, callback) => {
	setTimeout(() => callback(a + 10), 100);
};

add10(1, (res) => console.log(res));
