import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safeSrc' })
export class SafeSrc implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}
