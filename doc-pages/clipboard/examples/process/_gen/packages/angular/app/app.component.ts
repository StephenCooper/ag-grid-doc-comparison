import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
  ProcessCellForExportParams,
  ProcessGroupHeaderForExportParams,
  ProcessHeaderForExportParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [rowSelection]="rowSelection"
    [processCellForClipboard]="processCellForClipboard"
    [processHeaderForClipboard]="processHeaderForClipboard"
    [processGroupHeaderForClipboard]="processGroupHeaderForClipboard"
    [processCellFromClipboard]="processCellFromClipboard"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Participants',
      children: [
        { field: 'athlete', headerName: 'Athlete Name', minWidth: 200 },
        { field: 'age' },
        { field: 'country', minWidth: 150 },
      ],
    },
    {
      headerName: 'Olympic Games',
      children: [
        { field: 'year' },
        { field: 'date', minWidth: 150 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver', suppressPaste: true },
        { field: 'bronze' },
        { field: 'total' },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  public rowSelection = 'multiple';
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }

  processCellForClipboard(params: ProcessCellForExportParams) {
    return 'C-' + params.value;
  }

  processHeaderForClipboard(params: ProcessHeaderForExportParams) {
    const colDef = params.column.getColDef();
    let headerName = colDef.headerName || colDef.field || '';
    if (colDef.headerName !== '') {
      headerName = headerName.charAt(0).toUpperCase() + headerName.slice(1);
    }
    return 'H-' + headerName;
  }

  processGroupHeaderForClipboard(params: ProcessGroupHeaderForExportParams) {
    const colGroupDef = params.columnGroup.getColGroupDef() || ({} as any);
    const headerName = colGroupDef.headerName || '';
    if (headerName === '') {
      return '';
    }
    return 'GH-' + headerName;
  }

  processCellFromClipboard(params: ProcessCellForExportParams) {
    return 'Z-' + params.value;
  }
}
