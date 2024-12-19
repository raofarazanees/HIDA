import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-itemtopair-action-comment-dialog',
  templateUrl: './itemtopair-action-comment-dialog.component.html',
  styleUrls: ['./itemtopair-action-comment-dialog.component.scss']
})
export class ItemtopairActionCommentDialogComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ItemtopairActionCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      comment: ['', [Validators.required]]
    });
    const isRequired = this.inputData.actionType === 'Reject' ? true : false;
    this.requiredChange(isRequired)
  }

  requiredChange(required: boolean): void {
    if (!required) {
      this.validateForm.get('comment')!.clearValidators();
      this.validateForm.get('comment')!.markAsPristine();
    } else {
      this.validateForm.get('comment')!.setValidators([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);
      this.validateForm.get('comment')!.markAsDirty();
    }
    this.validateForm.get('comment')!.updateValueAndValidity();
  }


  onSubmit(): void {
    this.dialogRef.close({ comment: this.validateForm.controls.comment.value.trim() });
  }
}
