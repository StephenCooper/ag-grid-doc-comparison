import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  CellPosition,
  ColDef,
  GridReadyEvent,
  NavigateToNextCellParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowSelection]="rowSelection"
    [rowData]="rowData"
    [navigateToNextCell]="navigateToNextCell"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  public rowSelection = 'single';
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }

  navigateToNextCell(params: NavigateToNextCellParams): CellPosition | null {
    var suggestedNextCell = params.nextCellPosition;
    var KEY_UP = 'ArrowUp';
    var KEY_DOWN = 'ArrowDown';
    var noUpOrDownKeyPressed = params.key !== KEY_DOWN && params.key !== KEY_UP;
    if (noUpOrDownKeyPressed || !suggestedNextCell) {
      return suggestedNextCell;
    }
    params.api.forEachNode(function (node) {
      if (node.rowIndex === suggestedNextCell!.rowIndex) {
        node.setSelected(true);
      }
    });
    return suggestedNextCell;
  }
}
