import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { BaseContainer } from 'src/app/features/item-to-product/containers/base.container';
import { BrandMasterState, manfMasterState, unspscMasterState } from '../../../store/reducers';
import { GetLoadingState } from '../../../store/selectors/brand-master.selector';
import { GetLoadingStateUnspsc as brandLoading } from '../../../store/selectors/unspsc-master.selector';
import { ApplicationState, getWbDashboardRoles } from '@app-store';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { GetUnspscColumns } from '../../../model/manf-master-models/interface/unspsc-master-filter-options';
import { GetParentChildLoadingState, GetTopManfLoadingState } from '../../../store/selectors';

@Component({
  selector: 'app-brand-root',
  templateUrl: './brand-root.component.html',
  styleUrls: ['./brand-root.component.scss']
})
export class BrandRootComponent extends BaseContainer implements OnInit {
  selectedTab: number = 0;
  loading$: Observable<boolean> = this.store.select(GetLoadingState);
  loadingParentChild$: Observable<boolean> = this.store.select(GetParentChildLoadingState);
  loadingParentChildRel$: Observable<boolean> = this.store.select(GetTopManfLoadingState);
  loadingBrand$: Observable<boolean> = this.brandStore.select(brandLoading);

  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100, 150, 200];
  public readonly destroyed$ = new Subject<boolean>();
  isReadOnlyAccess:boolean = false;
  constructor(public readonly store: Store<BrandMasterState>,public readonly manfStore:Store<manfMasterState>,
    public readonly brandStore:Store<unspscMasterState>,
    public readonly appStore:Store<ApplicationState>, private cd: ChangeDetectorRef) {
    super();
    this.getLoggedInUserRoles();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.userProfile = BaseContainer.prototype.userProfile;
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }
  onTabChange(event: MatTabChangeEvent) {
    this.selectedTab = event.index;
  }

  changePaginationSize(value) {
    this.pageSize = value === 0 ? 20 : value;
  }

  private getLoggedInUserRoles() {
    this.appStore
      .select(getWbDashboardRoles)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data)
      )
      .subscribe((roles: string[]) => {
        //&&  roles.indexOf('Mastering_Brand') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1
        if(roles.indexOf('Mastering_Brand_Read_Only') !== -1 &&  roles.indexOf('Mastering_Brand') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1) {
          this.isReadOnlyAccess = true;
        }
       });
  }

}
