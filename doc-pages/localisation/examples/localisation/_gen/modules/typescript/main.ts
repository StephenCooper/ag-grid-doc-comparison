import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, ICellRendererComp, ICellRendererParams, SideBarDef, StatusPanelDef } from '@ag-grid-community/core';
import { doc } from 'prettier';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, CsvExportModule, ExcelExportModule, GridChartsModule, ClipboardModule, RangeSelectionModule, RowGroupingModule, MultiFilterModule, SideBarModule, StatusBarModule])

declare var AG_GRID_LOCALE_ZZZ: {
  [key: string]: string;
};

class NodeIdRenderer implements ICellRendererComp {
  eGui!: HTMLElement;

  init(params: ICellRendererParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = params.node!.id! + 1;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}

const columnDefs: ColDef[] = [
  // this row just shows the row index, doesn't use any data from the row
  {
    headerName: '#',
    cellRenderer: NodeIdRenderer,
    checkboxSelection: true,
    headerCheckboxSelection: true,
  },
  { field: 'athlete', filterParams: { buttons: ['clear', 'reset', 'apply'] } },
  {
    field: 'age',
    filterParams: { buttons: ['apply', 'cancel'] },
    enablePivot: true,
  },
  { field: 'country', enableRowGroup: true },
  { field: 'year', filter: 'agNumberColumnFilter' },
  { field: 'date' },
  {
    field: 'sport',
    filter: 'agMultiColumnFilter',
    filterParams: {
      filters: [
        {
          filter: 'agTextColumnFilter',
          display: 'accordion',
        },
        {
          filter: 'agSetColumnFilter',
          display: 'accordion',
        },
      ],
    },
  },
  { field: 'gold', enableValue: true },
  { field: 'silver', enableValue: true },
  { field: 'bronze', enableValue: true },
  { field: 'total', enableValue: true },
]

var localeText = AG_GRID_LOCALE_ZZZ

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  sideBar: true,
  statusBar: {
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
      { statusPanel: 'agAggregationComponent' },
    ],
  },
  rowGroupPanelShow: 'always',
  pagination: true,
  paginationPageSize: 500,
  enableRangeSelection: true,
  enableCharts: true,
  localeText: localeText,
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 