import { Component } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  ValueParserParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: ` <ag-grid-angular
    style="width: 100%; height: 98%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [columnTypes]="columnTypes"
    [rowData]="rowData"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [rowGroupPanelShow]="rowGroupPanelShow"
    [animateRows]="true"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'city', type: 'dimension', cellRenderer: cityCellRenderer },
    {
      field: 'country',
      type: 'dimension',
      cellRenderer: countryCellRenderer,
      minWidth: 200,
    },
    {
      field: 'state',
      type: 'dimension',
      cellRenderer: stateCellRenderer,
      rowGroup: true,
    },
    { field: 'val1', type: 'numberValue' },
    { field: 'val2', type: 'numberValue' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    field: 'city',
    minWidth: 200,
  };
  public columnTypes: {
    [key: string]: ColDef;
  } = {
    numberValue: {
      enableValue: true,
      aggFunc: 'sum',
      editable: true,
      valueParser: numberParser,
    },
    dimension: {
      enableRowGroup: true,
      enablePivot: true,
    },
  };
  public rowData: any[] | null = getData();
  public groupDefaultExpanded = -1;
  public rowGroupPanelShow = 'always';

  onGridReady(params: GridReadyEvent) {}
}

const COUNTRY_CODES: Record<string, string> = {
  Ireland: 'ie',
  'United Kingdom': 'gb',
  USA: 'us',
};
function numberParser(params: ValueParserParams) {
  return parseInt(params.newValue);
}
function countryCellRenderer(params: ICellRendererParams) {
  if (params.value === undefined || params.value === null) {
    return '';
  } else {
    const flag =
      '<img border="0" width="15" height="10" src="https://flagcdn.com/h20/' +
      COUNTRY_CODES[params.value] +
      '.png">';
    return flag + ' ' + params.value;
  }
}
function stateCellRenderer(params: ICellRendererParams) {
  if (params.value === undefined || params.value === null) {
    return '';
  } else {
    const flag =
      '<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/gold-star.png">';
    return flag + ' ' + params.value;
  }
}
function cityCellRenderer(params: ICellRendererParams) {
  if (params.value === undefined || params.value === null) {
    return '';
  } else {
    const flag =
      '<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/weather/sun.png">';
    return flag + ' ' + params.value;
  }
}
