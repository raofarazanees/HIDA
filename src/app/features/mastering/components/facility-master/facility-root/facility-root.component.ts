import { BaseContainer } from 'src/app/features/item-to-product/containers/base.container';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { GetLoadingFacilityState } from '../../../store/selectors';
import { facilityMasterState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { ApplicationState, getWbDashboardRoles } from '@app-store';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-facility-root',
  templateUrl: './facility-root.component.html',
  styleUrls: ['./facility-root.component.scss']
})
export class FacilityRootComponent extends BaseContainer implements OnInit  {

  selectedTab: number = 0;
  loading$: Observable<boolean> = this.store.select(GetLoadingFacilityState);
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100, 150, 200];
  public readonly destroyed$ = new Subject<boolean>();
  dialogRefChild: any;
  isReadOnlyAccess: boolean = false;

  constructor(public readonly store: Store<facilityMasterState>,private readonly appStore: Store<ApplicationState>) {
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
        //&&  roles.indexOf('Mastering_FacilityType') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1
        if(roles.indexOf('Mastering_FacilityType_Read_Only') !== -1 &&  roles.indexOf('Mastering_FacilityType') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1) {
          this.isReadOnlyAccess = true;
        }
       });
  }
}
