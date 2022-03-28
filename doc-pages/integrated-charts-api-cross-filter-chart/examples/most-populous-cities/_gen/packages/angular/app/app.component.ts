
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, FirstDataRenderedEvent, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div id="wrapper">
    <div id="barChart" class="ag-theme-alpine-dark"></div>
    <div id="bubbleChart" class="ag-theme-alpine-dark"></div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [enableCharts]="true"
    [chartThemes]="chartThemes"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'city', chartDataType: 'category' },
    { field: 'country', chartDataType: 'category' },
    { field: 'longitude', chartDataType: 'series' },
    { field: 'latitude', chartDataType: 'series' },
    { field: 'population', chartDataType: 'series' },
];
public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    sortable: true,
    filter: 'agMultiColumnFilter',
    floatingFilter: true,
    resizable: true,
};
public rowData: any[] | null = getData();
public chartThemes: string[] = ['ag-default-dark']


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    createColumnChart(params.api);
    createBubbleChart(params.api);
}

onGridReady(params: GridReadyEvent) {
        
    }
}



function createColumnChart(gridApi: GridApi) {
    gridApi.createCrossFilterChart({
        chartType: 'column',
        cellRange: {
            columns: ['country', 'population'],
        },
        aggFunc: 'count',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Number of Most Populous Cities by Country',
                },
                legend: {
                    enabled: false,
                },
            },
            cartesian: {
                axes: {
                    category: {
                        label: {
                            rotation: 325,
                        },
                    },
                },
            },
        },
        chartContainer: document.querySelector('#barChart') as any,
    });
}
function createBubbleChart(gridApi: GridApi) {
    gridApi.createCrossFilterChart({
        chartType: 'bubble',
        cellRange: {
            columns: ['longitude', 'latitude', 'population'],
        },
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Latitude vs Longitude of Most Populous Cities',
                },
                legend: {
                    enabled: false,
                },
            },
        },
        chartContainer: document.querySelector('#bubbleChart') as any,
    });
}
