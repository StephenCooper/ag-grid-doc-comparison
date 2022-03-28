
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, ExcelExportParams, ExcelStyle, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

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
    [defaultExcelExportParams]="defaultExcelExportParams"
    [excelStyles]="excelStyles"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    </div>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [{ field: 'company' }, { field: 'url', cellClass: 'hyperlinks' }];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
};
public defaultExcelExportParams: ExcelExportParams = {
    autoConvertFormulas: true,
    processCellCallback: params => {
        const field = params.column.getColDef().field;
        return field === 'url' ? `=HYPERLINK("${params.value}")` : params.value;
    },
};
public excelStyles: ExcelStyle[] = [
    {
        id: 'hyperlinks',
        font: {
            underline: 'Single',
            color: '#358ccb',
        },
    },
];
public rowData: any[] | null = [
    { company: 'Google', url: 'https://www.google.com' },
    { company: 'Adobe', url: 'https://www.adobe.com' },
    { company: 'The New York Times', url: 'https://www.nytimes.com' },
    { company: 'Twitter', url: 'https://www.twitter.com' },
    { company: 'StackOverflow', url: 'https://stackoverflow.com/' },
    { company: 'Reddit', url: 'https://www.reddit.com' },
    { company: 'Github', url: 'https://www.github.com' },
    { company: 'Microsoft', url: 'https://www.microsoft.com' },
    { company: 'Gizmodo', url: 'https://www.gizmodo.com' },
    { company: 'LinkedIN', url: 'https://www.linkedin.com' },
]


    onBtExport() {
    this.gridApi.exportDataAsExcel();
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}




