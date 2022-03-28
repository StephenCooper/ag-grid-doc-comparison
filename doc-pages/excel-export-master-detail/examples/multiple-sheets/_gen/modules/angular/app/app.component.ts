
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, FirstDataRenderedEvent, GetRowIdFunc, Grid, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

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
    [getRowId]="getRowId"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [rowBuffer]="rowBuffer"
    [masterDetail]="true"
    [detailCellRendererParams]="detailCellRendererParams"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    </div>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
];
public defaultColDef: ColDef = {
    flex: 1,
};
public getRowId: GetRowIdFunc = function (params) {
    return params.data.name;
};
public groupDefaultExpanded = 1;
public rowBuffer = 100;
public detailCellRendererParams: any = {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number', minWidth: 150 },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
    },
} as IDetailCellRendererParams;
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.forEachNode(function (node) {
        node.setExpanded(true);
    });
}

onBtExport() {
    var spreadsheets = [];
    const mainSheet = this.gridApi.getSheetDataForExcel();
    if (mainSheet) {
        spreadsheets.push(mainSheet);
    }
    this.gridApi.forEachDetailGridInfo(function (node) {
        const sheet = node.api!.getSheetDataForExcel({
            sheetName: node.id.replace('detail_', ''),
        });
        if (sheet) {
            spreadsheets.push(sheet);
        }
    });
    this.gridApi.exportMultipleSheetsAsExcel({
        data: spreadsheets,
        fileName: 'ag-grid.xlsx',
    });
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/master-detail-data.json').subscribe(data => {
    this.rowData = data;
});
    }
}




