import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { SessionService } from '@cdx/authentication';
import { Store } from '@ngrx/store';
import { UserProfileService } from '@sgty/services/userprofile';
import { environment } from './../../environments/environment';
import { ApplicationState, ChangeRouteState, ChangeUserProfileState } from './../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  CONFIG: any = environment;
  constructor(
    private router: Router,
    private session: SessionService,
    private readonly appStore: Store<ApplicationState>,
    private userProfileService: UserProfileService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userProfile = this.userProfileService.getUserProfile();
    if (!userProfile) {
      return this.sessionUnauthorized();
    }
    this.updateUserProfile(userProfile);
    if (route?.routeConfig?.path !== 'admin-dashboard') {
      this.appStore.dispatch(new ChangeRouteState(route.queryParams || {}));
    }
    if (this.CONFIG.production && (!this.session.hasSession() || this.session.isExpired())) {
      return this.sessionUnauthorized();
    } else {
      return true;
    }
  }

  updateUserProfile(userProfile: any): void {
    const workbenchRoles = this.userProfileService.getBusinessRolesByWorkFlowDefID('hida.workbenchdashboard') || [];
    const masteringRoles = this.userProfileService.getBusinessRolesByWorkFlowDefID('hida.mastering') || [];

    const dashboardRoles:string[] = [...workbenchRoles,...masteringRoles]
    this.appStore.dispatch(
      new ChangeUserProfileState({
        userInfo: userProfile,
        faciliyTypeRoles: this.userProfileService.getBusinessRolesByWorkFlowDefID('hida.mastering.facilitytype'),
        itemMasterRoles: this.userProfileService.getBusinessRolesByWorkFlowDefID('hida.mastering.itemmaster'),
        manufacturerRoles: this.userProfileService.getBusinessRolesByWorkFlowDefID('hida.mastering.manufacturer'),
        restatingSalesRoles: this.userProfileService.getBusinessRolesByWorkFlowDefID('hida.restating.sales'),
        wbDashboardRoles: dashboardRoles,
        itemToProductRoles: this.userProfileService.getBusinessRolesByWorkFlowDefID('hida.mastering.itemtoproduct')
      })
    );
  }

  private sessionUnauthorized(): boolean {
    this.router.navigate(['unauthorized']);
    return false;
  }
}
