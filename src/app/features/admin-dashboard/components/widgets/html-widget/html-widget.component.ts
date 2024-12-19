import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ComponentHostDirective } from '../../../directives/component-host.directive';
import { htmlComponentMapping } from '../../side-nav-components';
import { Store } from '@ngrx/store';
import { DashboardState } from '../../../store/reducers';
import { WidgetSelectionChange } from '../../../store/actions/common.actions';

@Component({
  selector: 'app-html-widget',
  templateUrl: './html-widget.component.html',
  styleUrls: ['./html-widget.component.scss']
})
export class HtmlWidgetComponent implements OnInit, OnDestroy {
  @Input() widget: any;

  @ViewChild(ComponentHostDirective, { static: true }) componentHost: ComponentHostDirective;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver, 
    private readonly store: Store<DashboardState>
  ) {}

  ngOnInit() {
    this.loadDynamicComponent(this.widget, this.widget.key);
  }

  private loadDynamicComponent(widget: any, component: any): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(htmlComponentMapping[component]);
    this.clearComponentRef();
    const componentRef = this.componentHost.viewContainerRef.createComponent<any>(componentFactory);
    componentRef.instance.widget = widget;
  }

  private clearComponentRef(): void {
    this.componentHost.viewContainerRef.clear();
  }

  ngOnDestroy(): void {
    this.clearComponentRef();
  }

  updateWidgetSelection(command?:string) {
    const data = JSON.parse(JSON.stringify(this.widget));
    command && command !== 'adHocUploader' ? (data.alternateSideNav = true) : (data.alternateSideNav = false);
    command && command === 'adHocUploader' ? (data.isAdHocUploader = true) : (data.isAdHocUploader = false) 
    this.store.dispatch(new WidgetSelectionChange(data));
  }
}
