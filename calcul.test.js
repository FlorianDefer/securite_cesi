const {add,mul,sub, div} = require('./calcul');

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  test('adds 1 * 2 to equal 2', () => {
    expect(mul(1, 2)).toBe(2);
  });
  test('adds 30 /3 to equal 10', () => {
    expect(div(30, 3)).toBe(10);
  });
  test('adds 333 - 111 to equal 222', () => {
    expect(sub(333, 111)).toBe(222);
  });