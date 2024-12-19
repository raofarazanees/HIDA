import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FirstDataRenderedEvent, GridReadyEvent } from 'ag-grid-community';
import { GridApi, GridOptions } from 'ag-grid-enterprise';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getLoadingState, ApplicationState, getTaskDetails, UpdateTaskDetails } from '@app-store';
import { DialogModel, ModelDialogueComponent } from '@app-shared-components';

import { BaseContainer } from '../../containers/base.container';
import { forPairingListGridOptions } from './ag-grid.constants';
import { GetPairsForResolution } from '../../store/actions';
import { getPairs } from '../../store/selectors';
import { itemToProductMessages } from './../../modal/item-to-product-messages.constants';
import { PairingState } from './../../store/reducers/pairing.reducer';
import { ToggleButtonRendererComponent } from '../column-renderers/toggle-btn-renderer/toggle-btn-renderer.component';

@Component({
  selector: 'app-i2p-for-pairing',
  templateUrl: './for-pairing-i2p.component.html',
  styleUrls: ['./for-pairing-i2p.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForPairingI2PComponent extends BaseContainer implements OnInit, OnDestroy {
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  taskDetails: any = undefined;
  gridApi: GridApi;
  userProfile: any = {};
  frameworkComponents = {
    toggleButtonRendererComponent: ToggleButtonRendererComponent
  };
  updatedNodes: any = {};
  gridOptions: GridOptions = forPairingListGridOptions(this.gridRowHeight, this.onChangeCallback.bind(this));
  pairsOverlayLoadingTemplate: string = '<span class="ag-overlay-loading-center">Fetching Pairs...</span>';
  objectValues: any = Object.values;
  dataMasterCopy: any = [];

  constructor(
    private readonly appStore: Store<ApplicationState>,
    private readonly pairingSore: Store<PairingState>,
    private readonly matDialog: MatDialog,
    private readonly cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.userProfile = BaseContainer.prototype.userProfile;
    this.getTaskDetails();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    if (this.isInvalidTask()) {
      this.gridApi.showNoRowsOverlay();
    } else {
      this.getPairs();
    }
  }

  discardPairChanges(): void {
    this.updatedNodes = {};
    this.gridApi.setRowData(this.dataMasterCopy);
  }

  onSavePairChangesForLater(): void {}

  onEscalatePairChanges(): void {}

  onSubmitPairChanges(): void {}

  completeTaskOnManual(): void {
    this.matDialog
      .open(ModelDialogueComponent, {
        width: '600px',
        data: new DialogModel(itemToProductMessages.completeTask, true)
      })
      .afterClosed()
      .subscribe(
        (data: any) => data && this.appStore.dispatch(new UpdateTaskDetails({ ...this.taskDetails, status: 'COMPLETED', action: 'UPDATE' }))
      );
  }

  resetFilters(): void {
    this.gridApi.setFilterModel(null);
    this.gridApi.closeToolPanel();
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {}

  onChangeCallback(node: any, data: any): void {
    node.setData(data);
    this.updateYetToSaveRecords(data);
  }

  onRowGroupOpened({ node: cNode }: any) {
    cNode.expanded &&
      this.gridApi.forEachNode(
        (node) => node.expanded && node.id !== cNode.id && node.uiLevel === cNode.uiLevel && node.setExpanded(false)
      );
  }

  ngOnDestroy(): void {}

  private isInvalidTask() {
    return this.taskDetails && this.taskDetails.error;
  }

  private getTaskDetails(): void {
    this.appStore
      .select(getTaskDetails)
      .pipe(filter((data) => data !== null))
      .subscribe((taskDetails: any) => {
        this.taskDetails = taskDetails;
      });
  }

  private getPairs(): void {
    this.gridApi.showLoadingOverlay();
    this.pairingSore.dispatch(new GetPairsForResolution({ groupName: this.userProfile.routeState?.groupName }));
    this.pairingSore
      .select(getPairs)
      .pipe(filter((data) => data.records !== null))
      .subscribe((pairs: any) => {
        if (pairs.records.length) {
          this.dataMasterCopy = pairs.records;
          this.gridApi.setRowData(pairs.records);
          this.gridApi.hideOverlay();
        } else {
          this.gridApi.setRowData([]);
          this.gridApi.showNoRowsOverlay();
        }
      });
  }

  private updateYetToSaveRecords(data: any): void {
    if (this.updatedNodes[data.pairID]) {
      data.isModified ? (this.updatedNodes[data.pairID] = data) : delete this.updatedNodes[data.pairID];
    } else {
      this.updatedNodes[data.pairID] = data;
    }
    this.cd.detectChanges();
  }
}
