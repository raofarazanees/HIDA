import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  displayValues: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DetailsComponent>) {}

  ngOnInit() {
    this.prepareDisplayValue(this.data.attributeExtensions[1]);
  }

  private prepareDisplayValue(attributeList: any): void {
    this.displayValues = [];
    this.data.unspscAttributes.forEach((id: string) => {
      const item = attributeList[id];
      item &&
        this.displayValues.push({
          attributeGroup: item.attributeGroup,
          attributeValue: item.attributeValue
        });
    });
  }
}
