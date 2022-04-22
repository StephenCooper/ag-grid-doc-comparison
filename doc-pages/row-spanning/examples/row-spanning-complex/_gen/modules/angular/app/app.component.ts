import {
  ColDef,
  GridReadyEvent,
  ICellRendererComp,
  ICellRendererParams,
  RowSpanParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [suppressRowTransform]="true"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'localTime' },
    {
      field: 'show',
      cellRenderer: ShowCellRenderer,
      rowSpan: rowSpan,
      cellClassRules: {
        'show-cell': 'value !== undefined',
      },
      width: 200,
    },
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
  ];
  public defaultColDef: ColDef = {
    resizable: true,
    width: 170,
  };
  public rowData: any[] | null = getData();

  onGridReady(params: GridReadyEvent) {}
}

class ShowCellRenderer implements ICellRendererComp {
  ui: any;

  init(params: ICellRendererParams) {
    const cellBlank = !params.value;
    if (cellBlank) {
      return;
    }

    this.ui = document.createElement('div');
    this.ui.innerHTML =
      '<div class="show-name">' +
      params.value.name +
      '' +
      '</div>' +
      '<div class="show-presenter">' +
      params.value.presenter +
      '</div>';
  }

  getGui() {
    return this.ui;
  }

  refresh() {
    return false;
  }
}

function rowSpan(params: RowSpanParams) {
  if (params.data.show) {
    return 4;
  } else {
    return 1;
  }
}
