
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px">
        <label>Axis: </label>
        <button class="ag-fill-direction xy" (click)="fillHandleAxis('xy')">xy</button>
        <button class="ag-fill-direction x selected" (click)="fillHandleAxis('x')">x only</button>
        <button class="ag-fill-direction y" (click)="fillHandleAxis('y')">y only</button>
    </div>

    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [enableFillHandle]="true"
    [fillHandleDirection]="fillHandleDirection"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
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
    editable: true,
};
public fillHandleDirection = 'x';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    fillHandleAxis(direction: 'x' | 'y' | 'xy') {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.ag-fill-direction'));
    var button = document.querySelector('.ag-fill-direction.' + direction)!;
    buttons.forEach(function (btn) {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    this.gridApi.setFillHandleDirection(direction);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




