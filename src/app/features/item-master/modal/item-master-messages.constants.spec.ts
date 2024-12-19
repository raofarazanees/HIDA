import { replaceMessageWithParams } from './item-master-messages.constants';

describe('Item master messages constants', () => {
  it(`replaceMessageWithParams should work as expected`, () => {
    const message = 'All {count} confirmed records will be submitted';
    const result = 'All 10 confirmed records will be submitted';
    expect(replaceMessageWithParams(message, { count: 10 })).toBe(result);
  });

  it(`replaceMessageWithParams should return the same message if correct input param not passed`, () => {
    const message = 'All {count} confirmed records will be submitted';
    expect(replaceMessageWithParams(message, {})).toBe(message);
  });
});
