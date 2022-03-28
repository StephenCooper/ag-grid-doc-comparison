
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'athlete' },
    {
        field: 'country',
        filterParams: {
            filterOptions: ['contains', 'startsWith', 'endsWith'],
            defaultOption: 'startsWith',
        },
    },
    {
        field: 'age',
        filter: 'agNumberColumnFilter',
        filterParams: {
            alwaysShowBothConditions: true,
            defaultJoinOperator: 'OR',
        },
        maxWidth: 100,
    },
    {
        field: 'date',
        filter: 'agDateColumnFilter',
        filterParams: filterParams,
    },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



var filterParams = {
    suppressAndOrCondition: true,
    comparator: function (filterLocalDateAtMidnight: Date, cellValue: string) {
        var dateAsString = cellValue;
        if (dateAsString == null)
            return -1;
        var dateParts = dateAsString.split('/');
        var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
            return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
            return 1;
        }
    },
    browserDatePicker: true,
};
