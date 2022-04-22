import { ColDef, GridApi, GridReadyEvent } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div style="height: 100%; display: flex; flex-direction: column;">
    <div style="margin-bottom: 4px;">
      <button (click)="onUpdateSomeValues()">Update Some Data</button>
      <button (click)="onFlashOneCell()" style="margin-left: 15px;">
        Flash One Cell
      </button>
      <button (click)="onFlashTwoRows()">Flash Two Rows</button>
      <button (click)="onFlashTwoColumns()">Flash Two Columns</button>
    </div>
    <div style="flex-grow: 1;">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
    { field: 'f' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    cellClass: 'align-right',
    enableCellChangeFlash: true,
    resizable: true,
    valueFormatter: (params) => {
      return formatNumber(params.value);
    },
  };
  public rowData: any[] | null = createRowData();

  onUpdateSomeValues() {
    var rowCount = this.gridApi.getDisplayedRowCount();
    // pick 20 cells at random to update
    for (var i = 0; i < 20; i++) {
      var row = Math.floor(Math.random() * rowCount);
      var rowNode = this.gridApi.getDisplayedRowAtIndex(row)!;
      var col = ['a', 'b', 'c', 'd', 'e', 'f'][i % 6];
      rowNode.setDataValue(col, Math.floor(Math.random() * 10000));
    }
  }

  onFlashOneCell() {
    // pick fourth row at random
    var rowNode = this.gridApi.getDisplayedRowAtIndex(4)!;
    // pick 'c' column
    this.gridApi.flashCells({ rowNodes: [rowNode], columns: ['c'] });
  }

  onFlashTwoColumns() {
    // flash whole column, so leave row selection out
    this.gridApi.flashCells({ columns: ['c', 'd'] });
  }

  onFlashTwoRows() {
    // pick fourth and fifth row at random
    var rowNode1 = this.gridApi.getDisplayedRowAtIndex(4)!;
    var rowNode2 = this.gridApi.getDisplayedRowAtIndex(5)!;
    // flash whole row, so leave column selection out
    this.gridApi.flashCells({ rowNodes: [rowNode1, rowNode2] });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

function formatNumber(number: number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function createRowData() {
  var rowData = [];
  for (var i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0,
      f: 0,
    });
  }
  return rowData;
}
