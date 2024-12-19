import { MomentDatePipe } from './moment-date.pipe';
import { SafeSrc } from './safe-src.pipe';
import { TextHighlighterePipe } from './text-highlighter.pipe';
import { WordspaceCasePipe } from './wordspace-case.pipe';
import { SortPipe } from './sort.pipe';

export const pipes = [SafeSrc, TextHighlighterePipe, WordspaceCasePipe, MomentDatePipe, SortPipe];
