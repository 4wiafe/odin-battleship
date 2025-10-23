import { Ships } from "../ships/ships";
const ship1 = new Ships(5);

describe('ship properties', () => {
  test('length of ship', () => {
    expect(ship1.length).toEqual(5);
  });

  test('ship damage taken', () => {
    expect(ship1.timesHit).toEqual(0);
  });
});
