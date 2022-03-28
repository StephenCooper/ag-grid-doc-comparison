
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ChartCreated, ChartDestroyed, ChartRangeSelectionChanged, ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [popupParent]="popupParent"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [rowData]="rowData"
    (chartCreated)="onChartCreated($event)"
    (chartRangeSelectionChanged)="onChartRangeSelectionChanged($event)"
    (chartDestroyed)="onChartDestroyed($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'Month', width: 150, chartDataType: 'category' },
    { field: 'Sunshine (hours)', chartDataType: 'series' },
    { field: 'Rainfall (mm)', chartDataType: 'series' },
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
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onChartCreated(event: ChartCreated) {
    console.log('Created chart with ID ' + event.chartId);
    const chartRef = this.gridApi.getChartRef(event.chartId)!;
    chart = chartRef.chart;
    updateTitle(this.gridApi!, chart);
}

onChartRangeSelectionChanged(event: ChartRangeSelectionChanged) {
    console.log('Changed range selection of chart with ID ' + event.chartId);
    updateTitle(this.gridApi!, chart);
}

onChartDestroyed(event: ChartDestroyed) {
    console.log('Destroyed chart with ID ' + event.chartId);
    chart = null;
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/weather-se-england.json').subscribe(data => {
    this.rowData = data;
});
    }
}



var chart: any = null;
function updateTitle(api: GridApi, chart: any) {
    var cellRange = api.getCellRanges()![1];
    if (!cellRange)
        return;
    var columnCount = cellRange.columns.length;
    var rowCount = cellRange.endRow!.rowIndex - cellRange.startRow!.rowIndex + 1;
    chart.title.enabled = true;
    chart.title.text = 'Monthly Weather';
    chart.subtitle.enabled = true;
    chart.subtitle.text =
        'Using series data from ' +
            columnCount +
            ' column(s) and ' +
            rowCount +
            ' row(s)';
}
