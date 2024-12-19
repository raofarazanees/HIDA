import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BaseContainer } from '../../containers/base.container';

@Component({
  selector: 'app-i2p-for-labelling',
  templateUrl: './for-labelling-i2p.component.html',
  styleUrls: ['./for-labelling-i2p.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForLabellingI2PComponent extends BaseContainer implements OnInit, OnDestroy {
  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
