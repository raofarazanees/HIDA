  
  export const rowStyle = (params, scope?,allowStrip = true) =>   {
    if (params.node.data?.isNewAdded) {
      setTimeout(() => {
        scope.markAsNotified(params);
      }, 4000);
      return allowStrip ? { background: '#c2afec' } :  { background: 'inherit' };
    } else if(allowStrip) {
      if (params.node.rowIndex % 2 === 0) {
        return { background: 'rgba(0,0,0,.05)' };
      } else {
        return { background: 'inherit' };
      }
    }     
  }

  export const commonAgGridOption = (rowHeight:number = 30, loggedInEmail = '') => { return {
    rowData: [],
    pagination: true,
    paginationPageSize: 20,
    editType: 'fullRow',
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: false
    },
    rowHeight: rowHeight,
    overlayNoRowsTemplate: 'No records to show',
    rowClassRules: { 'ag-row-modified': 'data.isModified','ag-row-checkout':`data.userRole !== 'ADMIN' && data.checkedStatus === 'OUT' && data.checkedOutUserEmail !== '${loggedInEmail}'`,'ag-row-updated':'data.isNewAdded' },
    suppressCopyRowsToClipboard:false
  }
}