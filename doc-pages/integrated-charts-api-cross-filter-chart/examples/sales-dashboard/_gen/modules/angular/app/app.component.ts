
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgChartThemeOverrides, ColDef, ColGroupDef, ColumnApi, FirstDataRenderedEvent, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div id="wrapper">
    <div id="top">
        <div id="columnChart" class="ag-theme-alpine-dark"></div>
        <div id="pieChart" class="ag-theme-alpine-dark"></div>
    </div>
    <div id="barChart" class="ag-theme-alpine-dark"></div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [enableCharts]="true"
    [chartThemes]="chartThemes"
    [chartThemeOverrides]="chartThemeOverrides"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'salesRep', chartDataType: 'category' },
    { field: 'handset', chartDataType: 'category' },
    {
        headerName: 'Sale Price',
        field: 'sale',
        maxWidth: 160,
        aggFunc: 'sum',
        filter: 'agNumberColumnFilter',
        chartDataType: 'series',
    },
    { field: 'saleDate', chartDataType: 'category' },
    {
        field: 'quarter',
        maxWidth: 160,
        filter: 'agSetColumnFilter',
        chartDataType: 'category',
    },
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
public chartThemes: string[] = ['ag-default-dark'];
public chartThemeOverrides: AgChartThemeOverrides = {
    common: {
        padding: {
            top: 20,
            right: 40,
            bottom: 20,
            left: 30,
        },
    },
    cartesian: {
        axes: {
            category: {
                label: {
                    rotation: 0,
                },
            },
        },
    },
}


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    createQuarterlySalesChart(params.api);
    createSalesByRefChart(params.api);
    createHandsetSalesChart(params.api);
}

onGridReady(params: GridReadyEvent) {
        
    }
}



function createQuarterlySalesChart(gridApi: GridApi) {
    gridApi.createCrossFilterChart({
        chartType: 'column',
        cellRange: {
            columns: ['quarter', 'sale'],
        },
        aggFunc: 'sum',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Quarterly Sales ($)',
                },
                legend: {
                    enabled: false,
                },
                axes: {
                    category: {
                        label: {
                            rotation: 0,
                        },
                    },
                    number: {
                        label: {
                            formatter: function (params: any) {
                                return params.value / 1000 + 'k';
                            },
                        },
                    },
                },
            },
        },
        chartContainer: document.querySelector('#columnChart') as any,
    });
}
function createSalesByRefChart(gridApi: GridApi) {
    gridApi.createCrossFilterChart({
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
function createHandsetSalesChart(gridApi: GridApi) {
    gridApi.createCrossFilterChart({
        chartType: 'bar',
        cellRange: {
            columns: ['handset', 'sale'],
        },
        aggFunc: 'count',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Handsets Sold (Units)',
                },
                legend: {
                    enabled: false,
                },
            },
        },
        chartContainer: document.querySelector('#barChart') as any,
    });
}
