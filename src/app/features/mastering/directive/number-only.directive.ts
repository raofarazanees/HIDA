import { Directive, Input, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: "[numbersOnly]"
 })
 
 export class NumbersOnlyDirective {
   @Input() numbersOnly:boolean;
 
   navigationKeys: Array<string> = ['Backspace','ArrowLeft','ArrowRight','Delete']; //Add keys as per requirement
   
   constructor(private _el: ElementRef) { }
 
   @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
     if (
       // Allow: Delete, Backspace, Tab, Escape, Enter, etc
       this.navigationKeys.indexOf(e.key) > -1 || 
       (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
       (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
       (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
       (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
       (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
       (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
       (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
       (e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
     ) {
         return;  // let it happen, don't do anything
     }
     // Ensure that it is a number and stop the keypress
     if (this.numbersOnly  && (e.key === ' ' || isNaN(Number(e.key)))) {
       e.preventDefault();
     }
   }
 }