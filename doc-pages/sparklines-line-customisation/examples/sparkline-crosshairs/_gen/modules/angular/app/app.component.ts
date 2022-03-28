
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, LineSparklineOptions, TooltipRendererParams } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

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
                line: {
                    stroke: 'rgb(52, 168, 83)',
                },
                highlightStyle: {
                    size: 4,
                    stroke: 'rgb(52, 168, 83)',
                    fill: 'rgb(52, 168, 83)',
                },
                tooltip: {
                    renderer: renderer,
                },
                crosshairs: {
                    xLine: {
                        enabled: true,
                        lineDash: 'dash',
                        stroke: 'rgba(0, 0, 0, 0.5)',
                    },
                    yLine: {
                        enabled: true,
                        lineDash: 'dash',
                        stroke: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            } as LineSparklineOptions,
        },
    },
    {
        field: 'rateOfChange',
        cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
            sparklineOptions: {
                line: {
                    stroke: 'rgb(168,52,137)',
                },
                highlightStyle: {
                    size: 4,
                    stroke: 'rgb(168,52,137)',
                    fill: 'rgb(168,52,137)',
                },
                tooltip: {
                    renderer: renderer,
                },
                crosshairs: {
                    xLine: {
                        enabled: false,
                    },
                },
            } as LineSparklineOptions,
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



function renderer(params: TooltipRendererParams) {
    return {
        backgroundColor: 'black',
        opacity: 0.5,
        color: 'white',
    };
}
