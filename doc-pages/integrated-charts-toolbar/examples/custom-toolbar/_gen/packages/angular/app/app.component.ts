
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgChartThemeOverrides, ChartMenuOptions, ColDef, ColGroupDef, ColumnApi, CreateRangeChartParams, FirstDataRenderedEvent, GetChartToolbarItems, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [popupParent]="popupParent"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [chartThemeOverrides]="chartThemeOverrides"
    [getChartToolbarItems]="getChartToolbarItems"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
    {
        headerName: 'A',
        valueGetter: 'Math.floor(Math.random()*1000)',
        chartDataType: 'series',
    },
    {
        headerName: 'B',
        valueGetter: 'Math.floor(Math.random()*1000)',
        chartDataType: 'series',
    },
    {
        headerName: 'C',
        valueGetter: 'Math.floor(Math.random()*1000)',
        chartDataType: 'series',
    },
    {
        headerName: 'D',
        valueGetter: 'Math.floor(Math.random()*1000)',
        chartDataType: 'series',
    },
];
public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
};
public rowData: any[] | null = getData();
public popupParent: HTMLElement = document.body;
public chartThemeOverrides: AgChartThemeOverrides = {
    pie: {
        title: {
            enabled: true,
            text: 'Precious Metals Production',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'rgb(100, 100, 100)',
        },
        subtitle: {
            enabled: true,
            text: 'by country',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 14,
            color: 'rgb(100, 100, 100)',
        },
        padding: {
            top: 25,
            right: 20,
            bottom: 55,
            left: 20,
        },
        legend: {
            enabled: false,
        },
        series: {
            label: {
                enabled: true,
            },
            callout: {
                length: 20,
            },
        },
    },
}


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    var createRangeChartParams: CreateRangeChartParams = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 5,
            columns: ['country', 'gold'],
        },
        chartType: 'pie',
    };
    params.api.createRangeChart(createRangeChartParams);
}

onGridReady(params: GridReadyEvent) {
        
    }

getChartToolbarItems(): ChartMenuOptions[] {
    return ['chartDownload', 'chartData', 'chartSettings'];
}
}




