import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class DialogModel {
  constructor(public message: string, public isConfirm: boolean = false, public successBtnName?: string) {}
}
@Component({
  selector: 'app-model-dialogue',
  templateUrl: './model-dialogue.component.html',
  styleUrls: ['./model-dialogue.component.scss']
})
export class ModelDialogueComponent implements OnInit {
  public message: string;
  public successBtnName: string;
  public isConfirm: boolean;

  constructor(public dialogRef: MatDialogRef<ModelDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogModel) {
    this.message = data.message;
    this.successBtnName = data.successBtnName || 'Ok';
    this.isConfirm = data.isConfirm ? true : false;
    {
      dialogRef.disableClose = true;
    }
  }

  ngOnInit() {}

  onSubmit(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
