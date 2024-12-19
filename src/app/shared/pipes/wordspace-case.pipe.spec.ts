import { WordspaceCasePipe } from './wordspace-case.pipe';

describe('WordspaceCasePipe', () => {
  const pipe = new WordspaceCasePipe();

  it('transforms "userName" to "User Name"', () => {
    expect(pipe.transform('userName')).toBe('User Name');
  });

  it('transforms "empIdXyz" to "Emp Id Xyz"', () => {
    expect(pipe.transform('empIdXyz')).toBe('Emp Id Xyz');
  });
});
