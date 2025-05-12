const add10 = (a, callback) => {
	setTimeout(() => callback(a + 10), 100);
};

add10(1, console.log);

add10(1, (res) => {
	add10(res, (res) => {
		add10(res, console.log);
	});
});
