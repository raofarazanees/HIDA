import { unMasteredDialogs } from '../../dialogs/unmastered.dialogs';
import { TaskType, UNSPSCSource } from '../../modal/ag-grid.constants';

export class UnmasteredGridColumns {
  constructor() {}

  public editableColumns(scope: any): any {
    return {
      commentWithUnspscSource: {
        field: 'comments',
        headerName: 'Comment',
        tooltipField: 'comments',
        width: 100,
        maxWidth: 100,
        info: true,
        pinned: 'right',
        lockPosition: true,
        valueFormatter: (params: any): any => (params.value ? params.value : '-'),
        editable: (node: any = { data: {} }) => {
          return node.data.unspscSource || node.data.clientCorrectionAction;
        },
        resizable: true,
        cellClass: (params) => {
          return !params.value && (params?.data.clientCorrectionAction === 'Reject' || params?.data.clientCorrectionAction === 'Override')
            ? 'required-cell'
            : 'editable-cell-comment';
        },
        onCellValueChanged: (rowNode: any): void => {
          scope.onCommentChanged(rowNode.node);
          setTimeout(() => rowNode.api.redrawRows(), 0);
        }
      },
      commentWithunspscCode: {
        field: 'comments',
        headerName: 'Comments',
        tooltipField: 'comments',
        width: 100,
        maxWidth: 100,
        pinned: 'right',
        lockPosition: true,
        valueFormatter: (params: any): any => (params.value ? params.value : '-'),
        editable: (node: any = { data: {} }) => {
          return node.data.unspscCode;
        },
        resizable: true,
        cellClass: 'editable-cell-comment',
        onCellValueChanged: (rowNode: any): void => {
          scope.addToUpdatedRecords(rowNode.node);
        }
      },
      ambiguity: {
        field: 'ambiguityFlag',
        headerName: 'AF',
        headerTooltip: 'Ambiguity Flag',
        tooltipField: 'ambiguityFlag',
        editable: true,
        width: 80,
        maxWidth: 80,
        pinned: 'right',
        lockPosition: true,
        valueFormatter: (params: any): any => (params.value ? params.value : '-'),
        cellClass: 'editable-cell',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: scope.isExceptionLead
            ? ['Confirmed']
            : scope.taskType === TaskType.CC
            ? ['Confirmed', 'Ambiguity']
            : ['Confirmed', 'Ambiguity', 'No UNSPSC found']
        },
        onCellValueChanged: (rowNode: any): void => {
          scope.ambiguityFlagChangeHandler(rowNode);
        },
        onCellDoubleClicked: (event: any): void => {
          scope.previousAmbiguityFlag = event.data.ambiguityFlag;
        }
      },
      manualUNSPSC: {
        headerName: scope.taskType === TaskType.UM ? 'UNSPSC Code' : 'Manual',
        headerTooltip: scope.taskType === TaskType.UM ? 'UNSPSC Code' : 'Manual UNSPSC Code',
        field: 'unspscCode',
        info: false,
        width: 130,
        maxWidth: 130,
        pinned: 'right',
        lockPosition: true,
        cellRenderer: 'unspscCodeRendererComponent',
        cellRendererParams: {
          onDropCell: (rowNode: any) => {
            scope.addToUpdatedRecords(rowNode);
          },
          details: 'manual',
          draggable: true,
          selectionValue: scope.taskType === TaskType.UM ? '' : UNSPSCSource.M
        },
        onCellDoubleClicked: (event: any): void => {
          scope.onCellDoubleClicked(event);
        }
      },
      dsUNSPSC: {
        headerName: 'DS',
        headerTooltip: 'Data Science UNSPSC Code',
        field: 'dsUnspscId',
        info: false,
        width: 130,
        maxWidth: 130,
        pinned: 'right',
        lockPosition: true,
        cellRenderer: 'unspscCodeRendererComponent',
        cellRendererParams: {
          draggable: false,
          details: 'dsUnspscHierarchy',
          score: 'dsConfidenceScore',
          selectionValue: UNSPSCSource.DS,
          onCellSelection: (rowNode: any) => {
            scope.addToUpdatedRecords(rowNode);
          }
        }
      },
      reUNSPSC: {
        headerName: 'RE',
        headerTooltip: 'Rules Engine UNSPSC Code',
        field: 'reUnspscId',
        info: false,
        width: 110,
        maxWidth: 110,
        pinned: 'right',
        lockPosition: true,
        cellRenderer: 'unspscCodeRendererComponent',
        cellRendererParams: {
          draggable: false,
          details: 'reUnspscHierarchy',
          selectionValue: UNSPSCSource.RE,
          onCellSelection: (rowNode: any) => {
            scope.addToUpdatedRecords(rowNode);
          }
        }
      },
      reclassifyUNSPSC: {
        headerName: 'Reclassify',
        headerTooltip: 'Reclassify Suggested UNSPSC Code',
        field: 'reclassifySuggestedUNSPSC',
        info: false,
        width: 130,
        maxWidth: 130,
        pinned: 'right',
        lockPosition: true,
        cellRenderer: 'unspscCodeRendererComponent',
        cellRendererParams: {
          draggable: false,
          details: 'reclassifySuggestedUNSPSCHierarchy',
          selectionValue: UNSPSCSource.RC,
          onCellSelection: (rowNode: any) => {
            scope.addToUpdatedRecords(rowNode);
          }
        }
      },
      ccUNSPSC: {
        headerName: 'Client Correction',
        headerTooltip: 'Client Correction Suggested UNSPSC Code',
        field: 'unspscForCC',
        info: false,
        width: 140,
        maxWidth: 140,
        pinned: 'right',
        lockPosition: true,
        cellRenderer: 'unspscCodeRendererComponent',
        cellRendererParams: {
          draggable: false,
          details: 'unspscHierarchyForCC',
          selectionValue: UNSPSCSource.CC,
          onCellSelection: (rowNode: any) => {
            rowNode.data.clientCorrectionAction = 'Approve';
            scope.addToUpdatedRecords(rowNode);
          }
        }
      },
      clientComment: {
        headerName: 'CC',
        headerTooltip: scope.taskType === TaskType.CC ? 'Client Correction Customer Comments' : 'Reclassify Customer Comments',
        field: scope.taskType === TaskType.CC ? 'customerCommentsForCC' : 'reclassifyCustomerComments',
        cellRenderer: 'commentRendererComponent',
        cellRendererParams: {
          commentField: scope.taskType === TaskType.CC ? 'customerCommentsForCC' : 'reclassifyCustomerComments'
        },
        sortable: false,
        filter: false,
        width: 70,
        maxWidth: 70,
        pinned: 'right',
        lockPosition: true
      },
      rejectClientCorrection: {
        headerName: 'Reject',
        headerTooltip: 'Reject Client Correction',
        cellRenderer: 'rejectColumnRenderer',
        cellRendererParams: (params) => {
          return {
            onRejectChanged: (isRejected) => {
              scope.rejectClientCorrectedRecord(params.node, isRejected);
            },
            onRejectedInfoClick: () => {
              unMasteredDialogs.rejectLog(params.node.data, scope.matDialog);
            }
          };
        },
        width: 75,
        maxWidth: 75,
        pinned: 'right',
        lockPosition: true,
        sortable: false,
        filter: false,
        resizable: false
      },
      attributeExtension: {
        headerName: 'Item Attributes',
        headerTooltip: 'Item Attributes',
        field: 'unspscAttributes',
        cellRenderer: 'attributeColumnRendererComponent',
        cellRendererParams: (params: any) => {
          return {
            isExceptionLead: scope.isExceptionLead,
            attributeExtensions: scope._attributeExtensions,
            onAttributeChange: (unspscAttributes: any) => {
              params.node.setData({ ...params.node.data, ...{ unspscAttributes: unspscAttributes } });
              scope.addToUpdatedRecords(params.node);
            }
          };
        },
        width: 130,
        maxWidth: 200,
        pinned: 'right',
        lockPosition: true,
        sortable: true,
        filter: true,
        resizable: true
      }
    };
  }
}
