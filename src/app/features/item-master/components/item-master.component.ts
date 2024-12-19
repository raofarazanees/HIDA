import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ApplicationState, getLoadingState, getRouteState, getTaskDetails, getUpdatingTaskState, getUserProfile } from './../../../store';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { ItemMasterState } from '../store/reducers';
import { GetUnmasteredData, GetUNSPSCForTreeView, GetUNSPSCAttributeExtensions } from '../store/actions';
import { TaskType } from '../modal/ag-grid.constants';
import { BaseContainer } from '../containers/base.container';
import { itemMasterMessages } from '../modal/item-master-messages.constants';
import { getAttributeExtensions } from '../store/selectors';

@Component({
  selector: 'app-items',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemMasterComponent extends BaseContainer implements OnInit, OnDestroy {
  selectedTab = 'unmasteredRecords';
  taskDetails: any = null;
  TASK_TYPE: any = TaskType;
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  taskUpdating$: Observable<any> = this.appStore.select(getUpdatingTaskState);
  userProfile$: Observable<any> = this.appStore.select(getUserProfile);
  attributeExtensions$: Observable<any> = this.store.select(getAttributeExtensions);
  unmasteredLabel: string = 'Unmastered Records';
  headerProperties: any = { taskTypeHeader: '', taskTypeInfo: '' };
  productInfo: any = {};

  apiPayload: any = {
    groupName: ''
  };

  private readonly destroyed$ = new Subject<boolean>();

  constructor(private readonly appStore: Store<ApplicationState>, private readonly store: Store<ItemMasterState>) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(new GetUNSPSCForTreeView({ limit: 500, offset: 0, parentCode: '', targetLevel: 'segment' }, true));
   // this.store.dispatch(new GetUNSPSCAttributeExtensions());
    combineLatest([this.appStore.select(getTaskDetails), this.appStore.select(getRouteState)])
      .pipe(
        takeUntil(this.destroyed$),
        filter(([taskDetails, routeState]: any) => !!(taskDetails !== null && routeState !== null))
      )
      .subscribe(([taskDetails, routeState]: any) => {
        this.taskDetails = JSON.parse(JSON.stringify(taskDetails));
        this.apiPayload.groupName = routeState.groupName;
        BaseContainer.prototype.taskType = this.updateTaskType(routeState.groupName);
        this.setUnmmasteredTabLabel();
        this.setTaskHeaderProperties();
        this.store.dispatch(new GetUnmasteredData(this.apiPayload));
      });
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTab = event.index === 1 ? 'masteredRecords' : 'unmasteredRecords';
  }

  setProductPGUID(id: any): void {
    this.productInfo.productPGUID = id;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private setUnmmasteredTabLabel(): void {
    if (this.taskType === 'reclassification') {
      this.unmasteredLabel = 'For Reclassification';
    } else if (this.taskType === 'clientcorrection') {
      this.unmasteredLabel = 'For Client Correction';
    } else {
      this.unmasteredLabel = 'Unmastered Records';
    }
  }
  private setTaskHeaderProperties(): void {
    if (this.taskType === TaskType.P) {
      this.headerProperties.taskTypeHeader = 'Predicted';
      this.headerProperties.taskTypeInfo = itemMasterMessages.predictedToolTipInfo;
    } else if (this.taskType === TaskType.CC) {
      this.headerProperties.taskTypeHeader = 'Client Correction';
      this.headerProperties.taskTypeInfo = itemMasterMessages.clientCorrectionToolTipInfo;
    } else if (this.taskType === TaskType.UM) {
      this.headerProperties.taskTypeHeader = 'Unpredicted';
      this.headerProperties.taskTypeInfo = itemMasterMessages.unpredictedToolTipInfo;
    } else if (this.taskType === TaskType.RC) {
      this.headerProperties.taskTypeHeader = 'Reclassification';
      this.headerProperties.taskTypeInfo = itemMasterMessages.reclassificationToolTipInfo;
    } else {
      this.headerProperties.taskTypeHeader = '';
      this.headerProperties.taskTypeInfo = '';
    }
  }
}
