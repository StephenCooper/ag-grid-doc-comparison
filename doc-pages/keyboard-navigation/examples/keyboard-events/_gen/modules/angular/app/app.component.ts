import {
  CellKeyDownEvent,
  CellKeyPressEvent,
  ColDef,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [defaultColDef]="defaultColDef"
    (cellKeyDown)="onCellKeyDown($event)"
    (cellKeyPress)="onCellKeyPress($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 170 },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onCellKeyDown(e: CellKeyDownEvent) {
    console.log('onCellKeyDown', e);
  }

  onCellKeyPress(e: CellKeyPressEvent) {
    console.log('onCellKeyPress', e);
    if (e.event) {
      var keyPressed = (e.event as KeyboardEvent).key;
      console.log('Key Pressed = ' + keyPressed);
      if (keyPressed === 's') {
        var rowNode = e.node;
        var newSelection = !rowNode.isSelected();
        console.log(
          'setting selection on node ' +
            rowNode.data.athlete +
            ' to ' +
            newSelection
        );
        rowNode.setSelected(newSelection);
      }
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
