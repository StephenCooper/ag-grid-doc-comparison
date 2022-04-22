import { Component } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  ICellRenderer,
  ICellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<div><label class="infoLabel">Try Scrolling!</label></div>
    <ag-grid-angular
      style="width: 100%; height: 95%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [rowSelection]="rowSelection"
      [rowBuffer]="rowBuffer"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: '1' },
    { field: '2' },
    { field: '3' },
    { field: '4' },
    { field: '5' },
    { field: '6' },
    { field: '7' },
    { field: '8' },
    { field: '9' },
    { field: '10' },
    { field: '11' },
    { field: '12' },
    { field: '13' },
    { field: '14' },
    { field: '15' },
    { field: '16' },
    { field: '17' },
    { field: '18' },
    { field: '19' },
    { field: '20' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 80,
    cellRenderer: SlowCellRenderer,
  };
  public rowData: any[] | null = getRowData();
  public rowSelection = 'single';
  public rowBuffer = 0;

  onGridReady(params: GridReadyEvent) {}
}

class SlowCellRenderer implements ICellRenderer {
  private eGui!: HTMLElement;

  init(p: ICellRendererParams) {
    const start = new Date().valueOf();
    while (new Date().valueOf() - start < 15) {
      this.eGui = document.createElement('span');
    }
    this.eGui = document.createElement('span');
    this.eGui.innerHTML = `${++count}`;
  }

  getGui(): HTMLElement {
    return this.eGui;
  }

  refresh(): boolean {
    return false;
  }
}

let count = 0;
function getRowData() {
  // 1000 blank rows for the grid
  return Array.apply(null, Array(1000));
}
