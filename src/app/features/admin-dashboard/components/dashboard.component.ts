import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDrawer } from '@angular/material/sidenav';
import { ApplicationState, SetAppEnvStatus, getUserProfile } from '@app-store';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ComponentHostDirective } from '../directives/component-host.directive';
import { WidgetSelectionChange } from '../store/actions';
import { DashboardState } from '../store/reducers';
import { closeDrawerAt, getSelectedWidget } from '../store/selectors/common.selector';
import { bottomSheetComponentMapping } from './bottom-sheet-components';
import { sideNavComponentMapping } from './side-nav-components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild(ComponentHostDirective, { static: true }) componentHost: ComponentHostDirective;
  activeWidget: any = undefined;
  profile$: Observable<any> = this.appStore.select(getUserProfile);
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    private readonly store: Store<DashboardState>,
    private readonly appStore: Store<ApplicationState>,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private matBottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.listenWidgetSelectionChange();

    const base_url = window.location.href;
    if (base_url.includes('-dev.dev')) {
      this.appStore.dispatch(new SetAppEnvStatus({ appEnv: 'dev' }));
    } else if (base_url.includes('-int.int')) {
      this.appStore.dispatch(new SetAppEnvStatus({ appEnv: 'int' }));
    } else if (base_url.includes('-uat.uat')) {
      this.appStore.dispatch(new SetAppEnvStatus({ appEnv: 'uat' }));
    } else if (base_url.includes('-prod.prod')) {
      this.appStore.dispatch(new SetAppEnvStatus({ appEnv: 'prod' }));
    }

  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.clearComponentRef();
  }

  listenWidgetSelectionChange() {
    this.store
      .select(closeDrawerAt)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((time: any) => time)
      )
      .subscribe(() => {
        this.drawer.close();
        this.onSideNavClosed();
      });
    this.store
      .select(getSelectedWidget)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((widget: any) => widget)
      )
      .subscribe((widget: any) => {
        widget.bottom ? this.prepareBottomSheet(widget) : this.prepareSideNav(widget);
      });
  }

  prepareSideNav(widget: any) {
    this.activeWidget = widget;
    this.loadDynamicComponent(widget);
    this.drawer.open();
  }

  prepareBottomSheet(widget: any): void {
    let componentKey = widget.bottomKey;
    if (widget.bottomKey === 'unspsc_client_correction_history' || widget.bottomKey === 'unspsc_reclassification_history') {
      componentKey = 'file_upload_history';
    }
    this.matBottomSheet.open(bottomSheetComponentMapping[componentKey], {
      panelClass: 'admin-dashboard-bottom-sheet-panel',
      closeOnNavigation: true,
      data: { key: widget.bottomKey }
    } as MatBottomSheetConfig);
  }

  getTitle() {
    if (this.activeWidget)
      if (this.activeWidget?.alternateSideNav) {
        return this.activeWidget.config?.sideBarTitleAlternetUploader || this.activeWidget.title;
      } else if (this.activeWidget?.isAdHocUploader) {
        return this.activeWidget.config?.sideBarTitleAdHocUploader || this.activeWidget.title;
      } else if(this.activeWidget?.isSkuDataForClusteringUploader){
        return this.activeWidget?.config?.sideBarTitleSKUUploader || this.activeWidget.title;
      } else {
        return this.activeWidget?.config?.sideBarTitleUploader || this.activeWidget.title;
      }
  }

  private loadDynamicComponent(widget: any): void {
    const widgetKey = widget.key + (widget.genericBtnAction ? '_generic' : '');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(sideNavComponentMapping[widgetKey]);
    this.clearComponentRef();
    const componentRef = this.componentHost.viewContainerRef.createComponent<any>(componentFactory);
    componentRef.instance.widget = widget;
    console.log(widget)
  }

  private clearComponentRef(): void {
    this.componentHost.viewContainerRef.clear();
  }

  onSideNavClosed() {
    this.store.dispatch(new WidgetSelectionChange(null));
    this.activeWidget = undefined;
  }
}
