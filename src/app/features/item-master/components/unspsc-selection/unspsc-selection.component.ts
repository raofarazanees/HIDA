import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unspsc-selection',
  templateUrl: './unspsc-selection.component.html',
  styleUrls: ['./unspsc-selection.component.scss']
})
export class UnspscSelectionComponent {
  view: string = 'TREE';
  level: number = 0;

  constructor(public dialogRef: MatDialogRef<UnspscSelectionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.unspscCode) {
      data.unspscCode.match(/.{1,2}/g).find((code: string, index: number) => {
        if (code === '00') {
          return;
        }
        this.level = index;
      });
    }
  }

  closeDialogRef(data: any = undefined): void {
    this.dialogRef.close(data);
  }

  changeView(type: string): void {
    this.view = type;
  }
}
