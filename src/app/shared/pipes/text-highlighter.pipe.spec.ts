import { TextHighlighterePipe } from './text-highlighter.pipe';

describe('TextHighlighterePipe', () => {
  const pipe = new TextHighlighterePipe();

  it('Should replced the serach text to <mark>serach text</mark>', () => {
    const text = 'This is the original string';
    const searchText = 'the';
    expect(pipe.transform(text, searchText)).toBe('This is <mark>the</mark> original string');
  });

  it('Original text should return if serach text is empty', () => {
    const text = 'This is the original string';
    const searchText = '';
    expect(pipe.transform(text, searchText)).toBe('This is the original string');
  });
});
