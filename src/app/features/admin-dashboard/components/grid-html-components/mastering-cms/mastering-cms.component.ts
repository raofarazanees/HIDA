import { Component, OnInit } from '@angular/core';
import { ApplicationState, UserProfileState, getUserProfile, getWbDashboardRoles } from '@app-store';
import { Store } from '@ngrx/store';
import { masteringRoles } from '../../dashboard-panel/dashboard-panel.component';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mastering-cms',
  templateUrl: './mastering-cms.component.html',
  styleUrls: ['./mastering-cms.component.scss']
})
export class MasteringCmsComponent implements OnInit {
  allowedMasteringRoles: string[] = [];
  private readonly destroyed$ = new Subject<boolean>();

  constructor(private readonly appStore: Store<ApplicationState>) {
    this.getWbDashboardRoles();
  }

  ngOnInit() {
    this.checkRolesAndAssign();
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
       // this.allowedMasteringRoles = roles;
        roles.forEach((role) => {
            let roleName:string = (role.includes('_Read_Only')) ? role.replace('_Read_Only','') : role;
            if(this.allowedMasteringRoles.indexOf(roleName) === -1 && roleName.includes('Mastering_') && roleName !== 'Mastering_Product' && roleName !== 'Mastering_Attribute') {
              this.allowedMasteringRoles.push(roleName)
            }
        });
        this.allowedMasteringRoles.sort()

      });
  }

  checkRolesAndAssign() {
    if (this.allowedMasteringRoles.includes('Mastering_WFadmin') || this.allowedMasteringRoles.includes('Mastering_Manager')) {
      this.allowedMasteringRoles = masteringRoles.filter((item) => {
        return item !== 'Mastering_WFadmin' && item !== 'Mastering_Manager';
      });
    } else {
      return true;
    }
  }

  checkIsUrlExits(data: string) {
    return masterRoleWithLabels.filter((item) => item.key === data && item.url);
  }

  getTooltipText(role :string) {
    return masterRoleWithLabels.filter((item) => item.key === role)[0]?.tooltipText || '';
  }

  

  masteringRoleLabel(data: string, type): string | boolean {
    const roleIndex = masterRoleWithLabels.findIndex((item) => item.key === data);
    if (roleIndex != -1) {
      return type ? (type == 'label' ? masterRoleWithLabels[roleIndex].label : masterRoleWithLabels[roleIndex].url) : false;
    }
  }

  get getDynamicFlex(): number {
    if (this.allowedMasteringRoles.length > 6) {
      return 33;
    } else if (this.allowedMasteringRoles.length > 3) {
      return 50;
    } else {
      return 100;
    }
  }
}

const masterRoleWithLabels = [
  { key: 'Mastering_Manufacturer', label: 'Manufacturer Mastering',tooltipText:"Manage Master Manufacturer", url: '#/hida/mastering/manufacturer-master' },
  { key: 'Mastering_UNSPSC', label: 'UNSPSC Mastering',tooltipText:"Manage Master UNSPSC", url: '#/hida/mastering/unspsc-master' },
  { key: 'Mastering_FacilityType', label: 'Facility Mastering',tooltipText:"Manage Master Facility", url: '#/hida/mastering/facility-master' },
  { key: 'Mastering_Market', label: 'Market Mastering',tooltipText:"Manage Master Markets", url: '#/hida/mastering/market-master' },
  { key: 'Mastering_Brand', label: 'Brand Mastering',tooltipText:"Manage Master Brand", url: '#/hida/mastering/brand-master' },
//  { key: 'Mastering_Attribute', label: 'Attribute Mastering',tooltipText:"", url: '' },
  { key: 'Mastering_Zip', label: 'Zip Mastering',tooltipText:"", url: '#/hida/mastering/zip-master' }
];

//  #/hida/mastering/unspsc-master
// #/hida/mastering/market-master
// /mastering/market-master
// /mastering/brand-master
