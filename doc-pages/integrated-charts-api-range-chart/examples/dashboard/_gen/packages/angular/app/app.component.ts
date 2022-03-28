
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, CreateRangeChartParams, FirstDataRenderedEvent, GetChartToolbarItems, GetChartToolbarItemsParams, Grid, GridApi, GridOptions, GridReadyEvent, ValueParserParams } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow: hidden;">
    <ag-grid-angular
    style="width: 100%; height: 30%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [popupParent]="popupParent"
    [getChartToolbarItems]="getChartToolbarItems"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    <div id="chart1" style="flex: 1 1 auto; overflow: hidden; height: 30%;"></div>
    <div style="display: flex; flex: 1 1 auto; overflow: hidden; height: 30%;">
        <div id="chart2" style="flex: 1 1 auto; overflow: hidden; width: 50%;"></div>
        <div id="chart3" style="flex: 1 1 auto; overflow: hidden; width: 50%;"></div>
    </div>
</div>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'group', chartDataType: 'category' },
    {
        field: 'gold',
        chartDataType: 'series',
        editable: true,
        valueParser: numberValueParser,
    },
    {
        field: 'silver',
        chartDataType: 'series',
        editable: true,
        valueParser: numberValueParser,
    },
    {
        field: 'bronze',
        chartDataType: 'series',
        editable: true,
        valueParser: numberValueParser,
    },
    {
        field: 'a',
        chartDataType: 'series',
        editable: true,
        valueParser: numberValueParser,
    },
    {
        field: 'b',
        chartDataType: 'series',
        editable: true,
        valueParser: numberValueParser,
    },
    {
        field: 'c',
        chartDataType: 'series',
        editable: true,
        valueParser: numberValueParser,
    },
    {
        field: 'd',
        chartDataType: 'series',
        editable: true,
        valueParser: numberValueParser,
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
public popupParent: HTMLElement = document.body


    onFirstDataRendered(event: FirstDataRenderedEvent) {
    var eContainer1 = document.querySelector('#chart1') as any;
    var params1: CreateRangeChartParams = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 4,
            columns: ['country', 'gold', 'silver'],
        },
        chartType: 'groupedBar',
        chartContainer: eContainer1,
    };
    event.api.createRangeChart(params1);
    var eContainer2 = document.querySelector('#chart2') as any;
    var params2: CreateRangeChartParams = {
        cellRange: {
            columns: ['group', 'gold'],
        },
        chartType: 'pie',
        chartContainer: eContainer2,
        aggFunc: 'sum',
        chartThemeOverrides: {
            common: {
                padding: {
                    top: 20,
                    left: 10,
                    bottom: 30,
                    right: 10,
                },
                legend: {
                    enabled: true,
                    position: 'bottom',
                },
            },
        },
    };
    event.api.createRangeChart(params2);
    var eContainer3 = document.querySelector('#chart3') as any;
    var params3: CreateRangeChartParams = {
        cellRange: {
            columns: ['group', 'silver'],
        },
        chartType: 'pie',
        chartContainer: eContainer3,
        aggFunc: 'sum',
        chartThemeOverrides: {
            common: {
                padding: {
                    top: 20,
                    left: 10,
                    bottom: 30,
                    right: 10,
                },
                legend: {
                    enabled: true,
                    position: 'bottom',
                },
            },
        },
    };
    event.api.createRangeChart(params3);
}

onGridReady(params: GridReadyEvent) {
        
    }

getChartToolbarItems(params: GetChartToolbarItemsParams) {
    return [];
}
}



function numberValueParser(params: ValueParserParams) {
    var res = Number.parseInt(params.newValue);
    if (isNaN(res)) {
        return undefined;
    }
    return res;
}
