
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ISetFilter, KeyCreatorParams, ValueFormatterParams } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div class="example-header">
        <div>
            Athlete:
            <button (click)="selectNothing()">API: Filter empty set</button>
            <button (click)="selectJohnAndKenny()">API: Filter only John Joe Nevin and Kenny Egan</button>
            <button (click)="selectEverything()">API: Remove filter</button>
        </div>
        <div style="padding-top: 10px;">
            Country - available filter values
            <button (click)="setCountriesToFranceAustralia()">Filter values restricted to France and Australia</button>
            <button (click)="setCountriesToAll()">Make all countries available</button>
        </div>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    {
        field: 'athlete',
        filter: 'agSetColumnFilter',
        filterParams: {
            cellHeight: 20,
        },
    },
    { field: 'age', maxWidth: 120, filter: 'agNumberColumnFilter' },
    {
        field: 'country',
        valueFormatter: function (params: ValueFormatterParams) {
            return `${params.value.name} (${params.value.code})`;
        },
        keyCreator: countryKeyCreator,
    },
    { field: 'year', maxWidth: 120 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
    { field: 'total', filter: 'agNumberColumnFilter' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 160,
    filter: true,
    resizable: true,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    selectJohnAndKenny() {
    const instance = this.gridApi.getFilterInstance('athlete')!;
    instance.setModel({ values: ['John Joe Nevin', 'Kenny Egan'] });
    this.gridApi.onFilterChanged();
}

selectEverything() {
    const instance = this.gridApi.getFilterInstance('athlete')!;
    instance.setModel(null);
    this.gridApi.onFilterChanged();
}

selectNothing() {
    const instance = this.gridApi.getFilterInstance('athlete')!;
    instance.setModel({ values: [] });
    this.gridApi.onFilterChanged();
}

setCountriesToFranceAustralia() {
    const instance = this.gridApi.getFilterInstance('country') as ISetFilter;
    instance.setFilterValues(['France', 'Australia']);
    instance.applyModel();
    this.gridApi.onFilterChanged();
}

setCountriesToAll() {
    const instance = this.gridApi.getFilterInstance('country') as ISetFilter;
    instance.resetFilterValues();
    instance.applyModel();
    this.gridApi.onFilterChanged();
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    patchData(data);
    this.rowData = data;
});
    }
}



function countryKeyCreator(params: KeyCreatorParams) {
    return params.value.name;
}
function patchData(data: any[]) {
    // hack the data, replace each country with an object of country name and code
    data.forEach(function (row) {
        const countryName = row.country;
        const countryCode = countryName.substring(0, 2).toUpperCase();
        row.country = {
            name: countryName,
            code: countryCode,
        };
    });
}
