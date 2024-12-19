import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'wordspaceCase' })
export class WordspaceCasePipe implements PipeTransform {
  transform(key: any): SafeResourceUrl {
    return (
      key.slice(0, 1).toLocaleUpperCase() +
      key
        .slice(1, Infinity)
        .split(/(?=[A-Z])/)
        .join(' ')
    );
  }
}
