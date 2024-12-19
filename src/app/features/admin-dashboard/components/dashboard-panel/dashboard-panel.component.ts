import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApplicationState, getWbDashboardRoles } from '@app-store';
import { Store } from '@ngrx/store';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DashboardUtilsService } from '../../services/dashboard-util.service';
import { DashboardState } from '../../store/reducers';
import {  getItemToProductLoadingState, GetProductStagingLoading, GetProductStagingLoadingTrigger, getUOMLoadingState } from '../../store/selectors';
export const  masteringRoles:string[] = ['Mastering_Manufacturer','Mastering_FacilityType','Mastering_UNSPSC','Mastering_Market','Mastering_Brand','Mastering_Manager','Mastering_WFadmin','Mastering_Zip']
export const masteringReadOnlyRoles:string[] = ['Mastering_Manufacturer_Read_Only','Mastering_FacilityType_Read_Only','Mastering_UNSPSC_Read_Only','Mastering_Brand_Read_Only','Mastering_Market_Read_Only','Mastering_Zip_Read_Only'];
@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.scss']
})
export class DashboardPanelComponent implements OnInit, OnDestroy {
  @Input() profile: any = {};

  options: GridsterConfig;
  dashboard: GridsterItem[];
  gridsterEvents: any = {};
  loading$: Observable<any> = this.store.select(getItemToProductLoadingState);
  loading_$: Observable<any> =  this.store.select(GetProductStagingLoadingTrigger);
  uomLoading$: Observable<any> =  this.store.select(getUOMLoadingState);


  private readonly destroyed$ = new Subject<boolean>();

  constructor(private readonly appStore: Store<ApplicationState>, private readonly store: Store<DashboardState>, private readonly dashboardUtilsService: DashboardUtilsService) {}

  ngOnInit() {
    this.getWbDashboardRoles();
    this.options = this.dashboardUtilsService.getDashboardGridsterConfig();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private getWbDashboardRoles(): void {
    this.appStore
      .select(getWbDashboardRoles)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((roles: string[]) => {
        this.updateDashboard(roles);
      });
  }

  private updateDashboard(roles: string[]): void {

    let allowedRolesCount = masteringRoles.filter(allowedRoles => allowedRoles !== 'Mastering_WFadmin' && allowedRoles !== 'Mastering_Manager' &&  roles.includes(allowedRoles)).length;
    let isHaveAdminRole = roles.includes('Mastering_WFadmin') || roles.includes('Mastering_Manager');
    let allowedRolesCountReadOnly = masteringReadOnlyRoles.filter(allowedRoles => allowedRoles !== 'Mastering_WFadmin' && allowedRoles !== 'Mastering_Manager' &&  roles.includes(allowedRoles)).length;

    this.dashboard = this.dashboardUtilsService.getDashboardWidgetConfig(this.profile.email, this.profile.fullName, allowedRolesCount + allowedRolesCountReadOnly, isHaveAdminRole).filter((item: any) => {
      return !item.access || roles.filter((role) => item.access.includes(role)).length;
    });
  }
}
