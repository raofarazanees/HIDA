import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'textHighlighter' })
export class TextHighlighterePipe implements PipeTransform {
  transform(text: string, searchText: string): SafeHtml {
    return searchText ? text.replace(new RegExp(searchText, 'gi'), (match) => `<mark>${match}</mark>`) : text;
  }
}
