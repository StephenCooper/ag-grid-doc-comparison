import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, FirstDataRenderedEvent, GetRowIdFunc, Grid, GridOptions, IDetailCellRendererParams } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule, MenuModule, ColumnsToolPanelModule, ClipboardModule, ExcelExportModule])

const gridOptions: GridOptions = {
  columnDefs: [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
  ],
  defaultColDef: {
    flex: 1,
  },
  getRowId: function (params) {
    return params.data.name
  },
  groupDefaultExpanded: 1,
  rowBuffer: 100,
  masterDetail: true,
  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: [
        { field: 'callId' },
        { field: 'direction' },
        { field: 'number', minWidth: 150 },
        { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
        { field: 'switchCode', minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: function (params) {
      params.successCallback(params.data.callRecords)
    },
  } as IDetailCellRendererParams,
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.forEachNode(function (node) {
    node.setExpanded(true)
  })
}

function onBtExport() {
  var spreadsheets = []

  const mainSheet = gridOptions.api!.getSheetDataForExcel();
  if (mainSheet) {
    spreadsheets.push(mainSheet);
  }

  gridOptions.api!.forEachDetailGridInfo(function (node) {
    const sheet = node.api!.getSheetDataForExcel({
      sheetName: node.id.replace('detail_', ''),
    });
    if (sheet) {
      spreadsheets.push(sheet)
    }
  })

  gridOptions.api!.exportMultipleSheetsAsExcel({
    data: spreadsheets,
    fileName: 'ag-grid.xlsx',
  })
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
    .then(response => response.json())
    .then(function (data) {
      gridOptions.api!.setRowData(data)
    })
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onBtExport = onBtExport;
}