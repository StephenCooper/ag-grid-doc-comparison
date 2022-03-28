
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, FillOperationParams, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [enableFillHandle]="true"
    [fillOperation]="fillOperation"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150 },
    { headerName: 'Day of the Week', field: 'dayOfTheWeek', minWidth: 180 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    editable: true,
};
public fillOperation: (params: FillOperationParams) => any = function (params) {
    var hasNonDayValues = params.initialValues.some(function (val) {
        return daysList.indexOf(val) === -1;
    });
    if (hasNonDayValues) {
        return false;
    }
    var lastValue = params.values[params.values.length - 1];
    var idxOfLast = daysList.indexOf(lastValue);
    return daysList[(idxOfLast + 1) % daysList.length];
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    params.api!.setRowData(createRowData(data));
});
    }
}



var daysList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
function createRowData(data: any[]) {
    var rowData = data.slice(0, 100);
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    for (var i = 0; i < 100; i++) {
        var dt = new Date(getRandom(currentYear - 10, currentYear + 10), getRandom(0, 12), getRandom(1, 25));
        rowData[i].dayOfTheWeek = daysList[dt.getDay()];
    }
    return rowData;
}
var getRandom = function (start: number, finish: number) {
    return Math.floor(Math.random() * (finish - start) + start);
};
