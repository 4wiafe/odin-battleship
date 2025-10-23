import { Ships } from "./ships.js";
const ship1 = new Ships(5);

describe('ship properties', () => {
  test('length of ship', () => {
    expect(ship1.length).toEqual(5);
  });
});
