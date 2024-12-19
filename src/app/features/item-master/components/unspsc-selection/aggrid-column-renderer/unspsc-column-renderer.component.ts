import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-unspsccode-column-renderer',
  templateUrl: './unspsc-column-renderer.component.html',
  styleUrls: ['./unspsc-column-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnspscColumnRendererComponent {
  params: any;
  tooltip = '';
  score: string = '0';
  scoreColour: string;

  constructor(private cd: ChangeDetectorRef){}

  agInit(params: any): void {
    this.params = params;
    if (params.data) {
      this.tooltip = this.getTooltip(params.details, params.data);
      const score = Math.ceil(params.data[this.params.score] * 100);
      this.score = Math.ceil(params.data[this.params.score] * 100).toString();
      this.scoreColour = '--fg: ' + (score < 33 ? '#dc3545' : score < 66 ? '#ffc107' : '#4caf50');
      this.cd.detectChanges();      
    }
  }

  refresh(): boolean {
    return false;
  }

  onDragStart(event: DragEvent): void {
    this.params.draggable &&
      this.params.data.unspscCode &&
      event.dataTransfer.setData(this.getDataType(), JSON.stringify(this.prepareUNSPSC()));
  }

  onDragOver(event: DragEvent): void {
    if (event.dataTransfer.types.length) {
      event.dataTransfer.dropEffect = 'copy';
      event.dataTransfer.effectAllowed = 'copy';
      event.preventDefault();
    }
  }

  onDrop(event: DragEvent): void {
    var jsonData = event.dataTransfer.getData(this.getDataType());
    if (jsonData !== JSON.stringify(this.prepareUNSPSC())) {
      this.params.node.setData({ ...this.params.node.data, ...JSON.parse(jsonData) });
      this.params.onDropCell(this.params.node);
    }
    event.preventDefault();
  }

  onCellSelection(): void {
    if (
      this.params.selectionValue &&
      this.params.value &&
      this.params.data.unspscSource !== this.params.selectionValue &&
      !this.params.readonly
    ) {
      this.params.data.unspscSource = this.params.selectionValue;
      this.params.data.ambiguityFlag = this.params.data.ambiguityFlag === 'Ambiguity' ? 'Ambiguity' : 'Confirmed';
      this.params.data.unspscCode = '';
      this.params.api.redrawRows({ rowNodes: [this.params.node] });
      this.params.onCellSelection && this.params.onCellSelection(this.params.node);
    }
  }

  private getTooltip(key: string, data: any): string {

    if (key === 'manual') {
      return this.prepareTooltip(data);
    }
    try {
      const rawTitle = JSON.parse(data[key]);
      return this.prepareTooltip(rawTitle);
    } catch (error) {
      return '';
    }
  }

  private prepareTooltip(data: any): string {
    return `${data.segmentTitle ? data.segmentTitle : ''} ${data.familyTitle ? ' | ' + data.familyTitle : ''}
    ${data.classTitle ? ' | ' + data.classTitle : ''} ${data.commodityTitle ? ' | ' + data.commodityTitle : ''}`;
  }

  private getDataType(): string {
    return window.navigator.userAgent.indexOf('Trident/') >= 0 ? 'text' : 'application/json';
  }

  private prepareUNSPSC(): any {
    return {
      unspscCode: this.params?.data.unspscCode,
      segmentCode: this.params?.data.segmentCode,
      segmentTitle: this.params?.data.segmentTitle,
      familyCode: this.params?.data.familyCode,
      familyTitle: this.params?.data.familyTitle,
      classCode: this.params?.data.classCode,
      classTitle: this.params?.data.classTitle,
      commodityCode: this.params?.data.commodityCode,
      commodityTitle: this.params?.data.commodityTitle,
      internalItemKey: this.params?.data.internalItemKey,
      ambiguityFlag: this.params?.data.ambiguityFlag,
      unspscSource: this.params?.selectionValue
    };
  }
}
