const add10 = (a) => {
	return new Promise((resolve) => setTimeout(() => resolve(a + 10), 1000));
};

add10(1).then((res) => console.log(res));
