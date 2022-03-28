
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgChartThemeOverrides, ChartCreated, ColDef, ColGroupDef, ColumnApi, CreateRangeChartParams, FirstDataRenderedEvent, GetChartImageDataUrlParams, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="wrapper">
    <div id="buttons">
        <button (click)="downloadChartImage('image/png')">Download chart PNG</button>
        <button (click)="downloadChartImage('image/jpeg')">Download chart JPEG</button>
        <button (click)="openChartImage('image/png')">Open PNG</button>
        <button (click)="openChartImage('image/jpeg')">Open JPEG</button>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [enableRangeSelection]="true"
    [popupParent]="popupParent"
    [enableCharts]="true"
    [chartThemeOverrides]="chartThemeOverrides"
    (firstDataRendered)="onFirstDataRendered($event)"
    (chartCreated)="onChartCreated($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    <div id="myChart" class="ag-theme-alpine my-chart">
</div></div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'country', chartDataType: 'category' },
    { field: 'sugar', chartDataType: 'series' },
    { field: 'fat', chartDataType: 'series' },
    { field: 'weight', chartDataType: 'series' },
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
    cartesian: {
        axes: {
            category: {
                label: {
                    rotation: 335,
                },
            },
        },
    },
}


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    const createRangeChartParams: CreateRangeChartParams = {
        cellRange: {
            columns: ['country', 'sugar', 'fat', 'weight'],
        },
        chartType: 'groupedColumn',
        chartContainer: document.querySelector('#myChart') as any,
    };
    params.api.createRangeChart(createRangeChartParams);
}

onChartCreated(event: ChartCreated) {
    chartId = event.chartId;
}

downloadChartImage(fileFormat: string) {
    if (!chartId) {
        return;
    }
    const params: GetChartImageDataUrlParams = { fileFormat, chartId };
    const imageDataURL = this.gridApi.getChartImageDataURL(params);
    if (imageDataURL) {
        const a = document.createElement('a');
        a.href = imageDataURL;
        a.download = 'image';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

openChartImage(fileFormat: string) {
    if (!chartId) {
        return;
    }
    const params: GetChartImageDataUrlParams = { fileFormat, chartId };
    const imageDataURL = this.gridApi.getChartImageDataURL(params);
    if (imageDataURL) {
        const image = new Image();
        image.src = imageDataURL;
        const w = window.open('')!;
        w.document.write(image.outerHTML);
        w.document.close();
    }
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



var chartId: string | undefined;
