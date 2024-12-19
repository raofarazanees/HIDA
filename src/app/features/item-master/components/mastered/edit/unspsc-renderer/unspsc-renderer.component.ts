import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unspsc-renderer',
  templateUrl: './unspsc-renderer.component.html',
  styleUrls: ['./unspsc-renderer.component.scss']
})
export class UnspscRendererComponent implements OnInit {
  _params: any;
  tooltip = '';
  score: any = 0;

  @Input('params')
  set params(value: any) {
    this._params = value;
  }

  constructor() {}

  ngOnInit() {
    this.tooltip = this.getTooltip(this._params.details, this._params.data);
    this.score = Math.ceil(this._params.score * 100).toString();
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

  onSelection(): void {
    if (this._params.value && this._params.data.unspscSource !== this._params.selectionValue && !this._params.readonly) {
      this._params.data.unspscSource = this._params.selectionValue;
      this._params.onSelection && this._params.onSelection(this._params.data);
    }
  }

  onDoubleClicked(): void {
    this._params.onDoubleClicked && !this._params.readonly && this._params.onDoubleClicked();
  }
}
