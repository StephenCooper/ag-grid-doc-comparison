
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="container">
    <div>
        <button (click)="onBtExport()" style="margin-bottom: 5px; font-weight: bold;">Export to Excel</button>
    </div>
    <div class="grid-wrapper">
        <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    </div>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
];
public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onBtExport() {
    var sports: Record<string, boolean> = {};
    this.gridApi.forEachNode(function (node) {
        if (!sports[node.data.sport]) {
            sports[node.data.sport] = true;
        }
    });
    var spreadsheets = [];
    var sportFilterInstance = this.gridApi.getFilterInstance('sport')!;
    for (var sport in sports) {
        sportFilterInstance.setModel({ values: [sport] });
        this.gridApi.onFilterChanged();
        if (sportFilterInstance.getModel() == null) {
            throw new Error('Example error: Filter not applied');
        }
        const sheet = this.gridApi.getSheetDataForExcel({
            sheetName: sport,
        });
        if (sheet) {
            spreadsheets.push(sheet);
        }
    }
    sportFilterInstance.setModel(null);
    this.gridApi.onFilterChanged();
    this.gridApi.exportMultipleSheetsAsExcel({
        data: spreadsheets,
        fileName: 'ag-grid.xlsx',
    });
    spreadsheets = [];
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




