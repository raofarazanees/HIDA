import { genericHtmlGridComponents } from './side-nav-components/index';
import { DashboardPanelComponent } from './dashboard-panel/dashboard-panel.component';
import { DashboardComponent } from './dashboard.component';
import { sideNavComponents } from './side-nav-components';
import { bottomSheetComponents } from './bottom-sheet-components';
import { HtmlWidgetComponent } from './widgets/html-widget/html-widget.component';
import { GenericWidgetComponent } from './widgets/generic-widget/generic-widget.component';

export const components = [
  DashboardComponent,
  DashboardPanelComponent,
  HtmlWidgetComponent,
  GenericWidgetComponent,
  ...sideNavComponents,
  ...bottomSheetComponents,
  ...genericHtmlGridComponents
];
