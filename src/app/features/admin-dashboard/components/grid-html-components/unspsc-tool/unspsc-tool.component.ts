import { GetAllActiveMarketRecords } from './../../../../mastering/store/actions/unspsc-master.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter, startWith, map } from 'rxjs/operators';
import {
  MarketMasterModel,
  unspscMasterState
} from 'src/app/features/mastering/model/manf-master-models/interface/unspsc-master.interface';
import { GetActiveMarketData$ } from 'src/app/features/mastering/store/selectors';
import { DashboardState } from '../../../store/reducers';
import { GenericWidgetModal } from '../../../modal/generic-widget-interface';
import { InitUNSPSCWorkflowWithMarket } from '../../../store/actions';
import { getUnspscWorkFlowStatus } from '../../../store/selectors';
import { FormGroupDirective } from '@angular/forms';

export interface UnspscWorkflowModel {
  initiatedByUserEmail: string;
  initiatedByUserName: string;
  marketID: string;
  marketName: string;
  submarketName: string;
}

@Component({
  selector: 'app-unspsc-tool',
  templateUrl: './unspsc-tool.component.html',
  styleUrls: ['./unspsc-tool.component.scss']
})
export class UnspscToolComponent implements OnInit {

  marketCtrl = new FormControl('', [Validators.required]);
  filteredMarketOption: Observable<MarketMasterModel[]>;
  allActiveMarket!: MarketMasterModel[];
  widget: GenericWidgetModal | any;

  public readonly destroyed$ = new Subject<boolean>();
  constructor(private marketStore: Store<unspscMasterState>, private readonly store: Store<DashboardState>) {}

  ngOnInit() {
    this.marketStore.dispatch(GetAllActiveMarketRecords());
    this.listenActiveMarketChanges();
    this.getTriggerStatus();
  }

  initUnspscWorkflow() {
    const dataToPost: UnspscWorkflowModel = {
      ...this.marketCtrl.value,
      initiatedByUserEmail: this.widget.config.userEmail,
      initiatedByUserName: this.widget.config.userName
    };
    this.store.dispatch(InitUNSPSCWorkflowWithMarket({ payload: dataToPost }));
  }

  displayFn(value: MarketMasterModel) {
    return value ? value.marketName : '';
  }
  private listenActiveMarketChanges() {
    this.marketStore
      .select(GetActiveMarketData$)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((item) => item != null)
      )
      .subscribe((item: MarketMasterModel[]) => {
        this.allActiveMarket = item;

        this.filteredMarketOption = this.marketCtrl.valueChanges.pipe(
          startWith(''),
          map((value) => (value ? this._filterMarket(value) : this.allActiveMarket.slice()))
        );
      });
  }

  private _filterMarket(value: string): MarketMasterModel[] {
    if (value && typeof value === 'string') {
      const filterValue = value?.toLowerCase();
      return this.allActiveMarket.filter((market) => market.marketName.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  private getTriggerStatus() {
    this.store
      .select(getUnspscWorkFlowStatus)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((status) => status != null)
      )
      .subscribe((status: string) => {
        if(status === 'completed') {
          this.marketCtrl.reset();
          this.marketCtrl.markAsUntouched({onlySelf: true});
          this.marketCtrl.updateValueAndValidity();
          this.marketCtrl.setErrors(null)
        }
      });
  }
}
