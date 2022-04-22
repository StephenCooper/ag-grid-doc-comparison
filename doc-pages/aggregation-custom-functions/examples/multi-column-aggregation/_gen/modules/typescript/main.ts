import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  IAggFuncParams,
  ModuleRegistry,
  ValueFormatterParams,
  ValueGetterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    {
      field: 'country',
      rowGroup: true,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      field: 'sport',
      rowGroup: true,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      field: 'year',
      pivot: true,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    { field: 'gold', aggFunc: 'sum', valueFormatter: numberFormatter },
    { field: 'silver', aggFunc: 'sum', valueFormatter: numberFormatter },
    {
      headerName: 'Ratio',
      colId: 'goldSilverRatio',
      aggFunc: ratioAggFunc,
      valueGetter: ratioValueGetter,
      valueFormatter: ratioFormatter,
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
  },
  autoGroupColumnDef: {
    minWidth: 220,
  },
  suppressAggFuncInHeader: true,
};

function numberFormatter(params: ValueFormatterParams): string {
  if (!params.value || params.value === 0) return '0';
  return '' + Math.round(params.value * 100) / 100;
}

function ratioValueGetter(params: ValueGetterParams) {
  if (!(params.node && params.node.group)) {
    // no need to handle group levels - calculated in the 'ratioAggFunc'
    return createValueObject(params.data.gold, params.data.silver);
  }
}

function ratioAggFunc(params: IAggFuncParams) {
  let goldSum = 0;
  let silverSum = 0;
  params.values.forEach((value) => {
    if (value && value.gold) {
      goldSum += value.gold;
    }
    if (value && value.silver) {
      silverSum += value.silver;
    }
  });
  return createValueObject(goldSum, silverSum);
}

function createValueObject(gold: number, silver: number) {
  return {
    gold: gold,
    silver: silver,
    toString: () => `${gold && silver ? gold / silver : 0}`,
  };
}

function ratioFormatter(params: ValueFormatterParams) {
  if (!params.value || params.value === 0) return '';
  return '' + Math.round(params.value * 100) / 100;
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
