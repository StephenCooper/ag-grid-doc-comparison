import { Component } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  IsFullWidthRowParams,
  RowHeightParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FullWidthCellRenderer } from './full-width-cell-renderer.component';

@Component({
  selector: 'my-app',
  template: `
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [rowDragManaged]="true"
      [getRowHeight]="getRowHeight"
      [isFullWidthRow]="isFullWidthRow"
      [fullWidthCellRenderer]="fullWidthCellRenderer"
      [animateRows]="true"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'name', cellRenderer: countryCellRenderer },
    { field: 'continent' },
    { field: 'language' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
  };
  public rowData: any[] | null = getData();
  public getRowHeight: (
    params: RowHeightParams
  ) => number | undefined | null = (params: RowHeightParams) => {
    // return 100px height for full width rows
    if (isFullWidth(params.data)) {
      return 100;
    }
  };
  public isFullWidthRow: (params: IsFullWidthRowParams) => boolean = (
    params: IsFullWidthRowParams
  ) => {
    return isFullWidth(params.rowNode.data);
  };
  public fullWidthCellRenderer: any = FullWidthCellRenderer;

  onGridReady(params: GridReadyEvent) {}
}

function countryCellRenderer(params: ICellRendererParams) {
  if (!params.fullWidth) {
    return params.value;
  }
  var flag =
    '<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/' +
    params.data.code +
    '.png">';
  return (
    '<span style="cursor: default;">' + flag + ' ' + params.value + '</span>'
  );
}
function isFullWidth(data: any) {
  // return true when country is Peru, France or Italy
  return ['Peru', 'France', 'Italy'].indexOf(data.name) >= 0;
}
