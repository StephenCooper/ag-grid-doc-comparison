
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AreaSparklineOptions, ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts
declare function getStockData(): any[];

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [rowHeight]="rowHeight"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'symbol', maxWidth: 110 },
    { field: 'name', minWidth: 250 },
    {
        field: 'rateOfChange',
        headerName: 'Rate of Change',
        cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
            sparklineOptions: {
                type: 'area',
                axis: {
                    type: 'time',
                },
                marker: {
                    size: 3,
                },
            } as AreaSparklineOptions,
        },
    },
    { field: 'volume', type: 'numericColumn', maxWidth: 140 },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
};
public rowData: any[] | null = getStockData();
public rowHeight = 50


    onGridReady(params: GridReadyEvent) {
        
    }
}




