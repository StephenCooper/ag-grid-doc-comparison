import {
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: ` <ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [columnTypes]="columnTypes"
    [rowData]="rowData"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [suppressAggFuncInHeader]="true"
    [animateRows]="true"
    (cellValueChanged)="onCellValueChanged($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // do NOT hide this column, it's needed for editing
    { field: 'group', rowGroup: true, editable: true },
    { field: 'a', type: 'valueColumn' },
    { field: 'b', type: 'valueColumn' },
    { field: 'c', type: 'valueColumn' },
    { field: 'd', type: 'valueColumn' },
    {
      headerName: 'Total',
      type: 'totalColumn',
      // we use getValue() instead of data.a so that it gets the aggregated values at the group level
      valueGetter:
        'getValue("a") + getValue("b") + getValue("c") + getValue("d")',
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 100,
  };
  public columnTypes: {
    [key: string]: ColDef;
  } = {
    valueColumn: {
      editable: true,
      aggFunc: 'sum',
      valueParser: 'Number(newValue)',
      cellClass: 'number-cell',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    totalColumn: {
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      cellClass: 'number-cell',
    },
  };
  public rowData: any[] | null = getRowData();
  public groupDefaultExpanded = 1;

  onCellValueChanged(params: CellValueChangedEvent) {
    var changedData = [params.data];
    params.api.applyTransaction({ update: changedData });
  }

  onGridReady(params: GridReadyEvent) {}
}

function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 10; i++) {
    rowData.push({
      group: i < 5 ? 'A' : 'B',
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
    });
  }
  return rowData;
}
