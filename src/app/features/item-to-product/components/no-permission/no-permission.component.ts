import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-permission',
  templateUrl: './no-permission.component.html',
  styleUrls: ['./no-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoPermissionComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
