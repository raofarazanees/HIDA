import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UNSPSCSource } from '../../modal/ag-grid.constants';

@Component({
  selector: 'app-attribute-extension-renderer',
  templateUrl: './attribute-extension-renderer.component.html',
  styleUrls: ['./attribute-extension-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeExtensionColumnRendererComponent implements ICellRendererAngularComp {
  params: any;
  isValidItem: boolean = false;
  displayValues: any = [];

  agInit(params: any): void {
    this.params = params;
    this.prepareDisplayValue(params.attributeExtensions[1]);
    if (params.data && this.isMappingExists(params.data) && this.isAmbiguityFlagExists(params.data)) {
      this.isValidItem = true;
    }
  }

  prepareDisplayValue(attributeList: any): void {
    this.displayValues = [];
    this.params.data
      ? this.params.value.forEach((id: string) => {
          const item = attributeList[id];
          item &&
            this.displayValues.push({
              attributeGroup: item.attributeGroup,
              attributeValue: item.attributeValue
            });
        })
      : [];
  }

  refresh(): boolean {
    return false;
  }

  onAttributeSelection(id: string): void {
    let unspscAttributes = this.params.value;
    if (this.params?.value?.includes(id)) {
      unspscAttributes = unspscAttributes.filter((item: any) => item !== id);
    } else {
      unspscAttributes.unshift(id);
    }
    this.params.onAttributeChange(unspscAttributes);
  }

  isActiveGroup(ids: any): boolean {
    return this.params?.value?.some((id: any) => Object.keys(ids).includes(id));
  }

  private isMappingExists(item: any): boolean {
    if (item.clientCorrectionAction === 'Reject' || item.clientCorrectionAction === 'Override') {
      return !item.comments ? false : item.clientCorrectionAction === 'Reject' ? true : this.isUnspscCodeExists(item);
    }
    return this.isUnspscCodeExists(item);
  }

  private isAmbiguityFlagExists(item: any): boolean {
    return this.params.isExceptionLead
      ? item.ambiguityFlag === 'Confirmed'
      : item.ambiguityFlag === 'Confirmed' || item.ambiguityFlag === 'Ambiguity';
  }

  private isUnspscCodeExists(item: any): boolean {
    return (
      item.unspscCode ||
      item.unspscSource === UNSPSCSource.DS ||
      item.unspscSource === UNSPSCSource.RE ||
      item.unspscSource === UNSPSCSource.RC ||
      item.unspscSource === UNSPSCSource.CC
    );
  }
}
