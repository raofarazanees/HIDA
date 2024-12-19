import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, Subject } from 'rxjs';
import { BaseContainer } from 'src/app/features/item-to-product/containers/base.container';
import { GetLoadingState, GetParentChildLoadingState, GetParentLoadingState, GetTopManfLoadingState } from '../../store/selectors';
import { manfMasterState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { parentManfData } from '../../model/manf-master-models/interface/manf-master.interface';
import { ApplicationState, getWbDashboardRoles } from '@app-store';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-manufacture-master-search',
  templateUrl: './manufacture-master-search.component.html',
  styleUrls: ['./manufacture-master-search.component.scss']
})
export class ManufactureMasterSearchComponent extends BaseContainer implements OnInit {
  selectedTab: number = 0;
  loading$: Observable<boolean> = this.store.select(GetLoadingState);
  loadingParent$: Observable<boolean> = this.store.select(GetParentLoadingState);
  loadingParentChild$: Observable<boolean> = this.store.select(GetParentChildLoadingState);
  loadingParentChildRel$: Observable<boolean> = this.store.select(GetTopManfLoadingState);

  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100, 150, 200];
  public readonly destroyed$ = new Subject<boolean>();
  activeParentRecords: parentManfData[];
  dialogRefChild: any;
  isReadOnlyAccess: boolean = false;
  constructor(private readonly store: Store<manfMasterState>,private readonly appStore: Store<ApplicationState>,
    private cd: ChangeDetectorRef
    ) {
    super();
    this.getLoggedInUserRoles();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
  ngAfterContentChecked() {
    this.cd.detectChanges();
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
        //&& roles.indexOf('Mastering_Manufacturer') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1
        if(roles.indexOf('Mastering_Manufacturer_Read_Only') !== -1 &&  roles.indexOf('Mastering_Manufacturer') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1) {
          this.isReadOnlyAccess = true;
        }
       });
  }
}
