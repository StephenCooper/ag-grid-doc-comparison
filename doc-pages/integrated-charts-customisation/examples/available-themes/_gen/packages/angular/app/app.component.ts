
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgChartThemeOverrides, ColDef, ColGroupDef, ColumnApi, CreateRangeChartParams, FirstDataRenderedEvent, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="wrapper">
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [popupParent]="popupParent"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [chartThemes]="chartThemes"
    [chartThemeOverrides]="chartThemeOverrides"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    <div id="myChart" class="my-chart"></div>
</div>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'country', width: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
];
public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
};
public popupParent: HTMLElement = document.body;
public chartThemes: string[] = ['ag-pastel', 'ag-material-dark', 'ag-vivid-dark', 'ag-solar'];
public chartThemeOverrides: AgChartThemeOverrides = {
    cartesian: {
        axes: {
            category: {
                label: {
                    rotation: 335,
                },
            },
        },
    },
};
public rowData: any[] | null = getData()


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    var createRangeChartParams: CreateRangeChartParams = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 79,
            columns: ['country', 'gold', 'silver', 'bronze'],
        },
        chartType: 'groupedColumn',
        chartContainer: document.querySelector('#myChart') as any,
        aggFunc: 'sum',
    };
    params.api.createRangeChart(createRangeChartParams);
}

onGridReady(params: GridReadyEvent) {
        
    }
}




