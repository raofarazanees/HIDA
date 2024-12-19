import { Directive, Input } from "@angular/core";

@Directive({
  selector: "[patchFormGroupValues]"
})
export class PatchFormGroupValuesDirective {
  @Input() formGroup: any;
  @Input()
  set patchFormGroupValues(val: any) {
    console.log(val)
    this.formGroup.patchValue(val, { emitEvent: false });
  }
}
