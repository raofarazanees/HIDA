import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  ApplicationState,
  getDistributors,
  getTaskDetails,
  getLoadingState,
  getActiveDistributorPguid,
  getUpdatingTaskState,
  getUserProfile
} from './../../../store';
import { ManufacturerState } from '../store/reducers';
import { GetOntologyMappings } from '../store/actions';
import { getOntologyMappings } from '../store/selectors';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseContainer } from '../containers/base.container';
@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent extends BaseContainer implements OnInit {
  selectedTab = 'unmasteredRecords';

  taskDetails: any = null;
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  taskUpdating$: Observable<any> = this.appStore.select(getUpdatingTaskState);
  activeDistributorPguid$: Observable<number> = this.appStore.select(getActiveDistributorPguid);
  distributors$: Observable<any> = this.appStore.select(getDistributors);
  ontologyMappings$: Observable<any> = this.store.select(getOntologyMappings);
  userProfile$: Observable<any> = this.appStore.select(getUserProfile);

  private readonly destroyed$ = new Subject<boolean>();

  constructor(private readonly appStore: Store<ApplicationState>, private readonly store: Store<ManufacturerState>) {
    super();
  }

  ngOnInit() {
    this.appStore
      .select(getTaskDetails)
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data !== null)
      )
      .subscribe((data) => {
        this.taskDetails = JSON.parse(JSON.stringify(data));
        this.store.dispatch(new GetOntologyMappings('Manufacturer'));
      });
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTab = event.index === 1 ? 'masteredRecords' : 'unmasteredRecords';
  }
}
