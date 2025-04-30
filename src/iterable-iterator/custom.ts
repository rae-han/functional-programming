const iterable = {
  [Symbol.iterator]() {
    let i = 3;

    return {
      next() {
        return i === 0
          ? { value: undefined, done: true }
          : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
        /**
         * 이터레이터가 자기 자신을 반환하는 [Symbol.iterator] 메서드를 가지고 있을 때,
         * 이를 well-formed iterator 또는 well-formed iterable이라고 부릅니다.
         * 이터레이터 프로토콜을 준수하는 이터러블은 자신을 반복(iterate)하는 것이 가능합니다.
         *
         * 잘 만들어진이터레이터 객체는 Symbol.iterator를 호출하면 자기 자신을 반환합니다.
         * 그래서 이터레이터를 for...of문에 넣거나, 다시 Symbol.iterator를 호출해도 **새로운 이터레이터가 아니라 기존의 이터레이터(즉, 현재 상태를 가진 이터레이터)**가 사용됩니다.
         * 이 덕분에, 이터레이터의 순회가 중간에 멈췄더라도, 다시 순회할 때 이전까지 진행된 상태에서 계속 이어서(next) 순회할 수 있습니다.
         */
      },
    };
  },
};

/**
 * 전개 연산자 역시 이터레이터 프로토콜을 준수하는 이터러블을 받아서 이터레이터를 반환하는 것을 기대합니다.
 */
