
import { Component } from '@angular/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="container">
    <div id="left">left</div>
    <div id="center">
        <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    </div>
    <div id="right">right</div>
</div>`
})

export class AppComponent {

    
    public rowData: any[] | null = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
];
public columnDefs: ColDef[] = [{ field: 'make' }, { field: 'model' }, { field: 'price' }]


    onGridReady(params: GridReadyEvent) {
        

        
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
        setTimeout(function () {
            params.api.sizeColumnsToFit();
        });
    });

        params.api.sizeColumnsToFit();
    }
}




