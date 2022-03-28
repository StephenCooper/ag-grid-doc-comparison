
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { BarSparklineOptions, ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

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
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
        field: 'change',
        cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
            sparklineOptions: {
                type: 'bar',
                fill: '#5470c6',
                stroke: '#91cc75',
                highlightStyle: {
                    fill: '#fac858',
                },
                valueAxisDomain: [0, 1],
                paddingOuter: 0,
                padding: {
                    top: 0,
                    bottom: 0
                },
                axis: {
                    strokeWidth: 0
                },
            } as BarSparklineOptions,
        },
    },
    {
        field: 'volume',
        type: 'numericColumn',
        maxWidth: 140,
    },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
};
public rowData: any[] | null = getData();
public rowHeight = 50


    onGridReady(params: GridReadyEvent) {
        
    }
}




