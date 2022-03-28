
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, FirstDataRenderedEvent, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div id="wrapper">
    <div id="pieChart" class="ag-theme-alpine-dark"></div>
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
    { field: 'salesRep', chartDataType: 'category' },
    { field: 'handset', chartDataType: 'category' },
    { field: 'sale', chartDataType: 'series' },
    { field: 'saleDate', chartDataType: 'category' },
];
public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: 'agSetColumnFilter',
    floatingFilter: true,
    resizable: true,
};
public rowData: any[] | null = getData();
public chartThemes: string[] = ['ag-default-dark']


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.createCrossFilterChart({
        chartType: 'pie',
        cellRange: {
            columns: ['salesRep', 'sale'],
        },
        aggFunc: 'sum',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Sales by Representative ($)',
                },
            },
            pie: {
                series: {
                    title: {
                        enabled: false,
                    },
                    label: {
                        enabled: false,
                    },
                },
            },
        },
        chartContainer: document.querySelector('#pieChart') as any,
    });
}

onGridReady(params: GridReadyEvent) {
        
    }
}




