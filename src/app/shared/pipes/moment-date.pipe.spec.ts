import { MomentDatePipe } from './moment-date.pipe';

describe('MomentDatePipe', () => {
  const pipe = new MomentDatePipe();

  it(`Should return '-' for null value `, () => {
    expect(pipe.transform(null, 'fromNow')).toBe('-');
  });

  it(`Should return formated string `, () => {
    expect(pipe.transform('2021-12-13T08:36:13.000+0000', 'YYYY-MM-DD')).toBe('2021-12-13');
  });
});
